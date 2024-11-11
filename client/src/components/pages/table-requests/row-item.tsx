'use client';

import { MouseEvent, useState } from 'react';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { Copy, Doc } from '@/assets/icons';
import { dateFormat, routes } from '@/constants';
import { onCopy, openNewWindowForCertificate } from '@/utils';
import { RequestOrganizationStatus, RowItemProps } from '@/types';
import { Button, ModalAdmin, showMessage, ModalDecline, EllipsisText } from '@/components';
import {
  getImageAction,
  deleteOrganizationAction,
  updateOrganizationAction,
  declineOrganizationAction,
} from '@/actions';

export const RowItem = ({ item, path, isLaptop, getData }: RowItemProps) => {
  const router = useRouter();

  const btn = useTranslations('button');
  const modal = useTranslations('modal');
  const table = useTranslations('table');
  const messagesCopy = useTranslations('copy');
  const success = useTranslations('success.admin-pages');

  const [isLoading, setIsLoading] = useState(false);
  const [isOpenReject, setIsOpenReject] = useState(false);
  const [isOpenRemove, setIsOpenRemove] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);

  const remove = path === routes.declined;
  const declined = path === routes.requests;

  const onSubmitRegister = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();

      formData.append('data', JSON.stringify({ request: RequestOrganizationStatus.APPROVED }));

      const response = await updateOrganizationAction(item.id, formData);

      if (!response.success && !Array.isArray(response.message)) {
        return showMessage.error(response.message);
      }

      showMessage.success(success('sentEmail', { email: item.email }));
    } catch (error) {
      console.log(error);
    } finally {
      setIsOpenRegister(false);
      setIsLoading(false);
      getData();
    }
  };

  const onSubmitDecline = async (reason: string) => {
    try {
      setIsLoading(true);

      const response = await declineOrganizationAction(item.id, reason);

      if (!response.success && response.message) {
        return showMessage.error(response.message);
      }

      showMessage.success(success('sentEmail', { email: item.email }));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsOpenReject(false);
      getData();
    }
  };

  const onSubmitRemove = async () => {
    try {
      setIsLoading(true);
      const response = await deleteOrganizationAction(item.id);

      if (!response.success && response.message) {
        return showMessage.error(response.message);
      }

      showMessage.success(success('deleteOrganization'));
    } catch (error) {
      console.log(error);
    } finally {
      setIsOpenRemove(false);
      setIsLoading(false);
      getData();
    }
  };

  const handleRowClick = () => {
    const selection = document.getSelection();

    if (!selection || !selection.toString()) {
      router.push(`${path}/${item.id}`);
    }
  };

  async function getCertificate(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();

    try {
      const downloadedFile = await getImageAction(item.certificate);

      if (!downloadedFile) {
        console.error('Failed to upload file: no body');

        return;
      }

      openNewWindowForCertificate(downloadedFile.image as string);
    } catch (error) {
      console.error('Error when loading a certificate:', error);
    }
  }

  return (
    <>
      <div
        onClick={handleRowClick}
        className="grid cursor-pointer grid-cols-2 rounded-2xl border border-[#A3A3A359] p-3 transition-all duration-300 hover:bg-superBlue laptop:grid-cols-tableRequests laptop:items-center laptop:gap-5 laptop:rounded-none laptop:border-x-0 laptop:border-b laptop:border-t-0 laptop:py-[13px] laptop:pl-3 laptop:pr-0"
      >
        <EllipsisText
          className="max-w-[300px] laptop:max-w-[380px] desktop:max-w-[500px]"
          content={item.organizationName}
        >
          <div className="col-span-2 overflow-hidden truncate whitespace-nowrap font-robotoCondensed text-xl leading-6 text-midGray laptop:col-auto laptop:text-lg laptop:leading-[22px]">
            {item.organizationName}
          </div>
        </EllipsisText>

        <span className="mt-6 font-robotoCondensed text-lg leading-[22px] text-dimGray laptop:mt-0 laptop:hidden">
          {table('EDRPOU')}
        </span>

        <div className="mt-6 flex items-center justify-end gap-1 text-sm laptop:mt-0 laptop:justify-center">
          <span className="overflow-hidden truncate whitespace-nowrap font-robotoCondensed text-lg leading-[22px]">
            {item.EDRPOU}
          </span>

          <Copy
            className="h-6 w-6 flex-shrink-0 cursor-pointer text-lightBlue transition duration-300 hover:text-dark-blue active:text-greenActive"
            onClick={(e: MouseEvent<SVGSVGElement>) => onCopy(e, item.EDRPOU, messagesCopy('messages'))}
          />
        </div>

        <div className="mt-8 font-robotoCondensed text-lg leading-[22px] text-dimGray laptop:mt-0 laptop:hidden laptop:text-center">
          {table('document')}
        </div>

        <div className="mt-8 flex items-center justify-end laptop:mt-0 laptop:justify-center">
          <button onClick={getCertificate} className="flex items-center justify-center">
            <Doc width={24} height={24} />
          </button>
        </div>

        <div className="mt-6 font-robotoCondensed text-lg leading-[22px] laptop:mt-0 laptop:text-center">
          {item.requestDate && format(new Date(item.requestDate), dateFormat)}
        </div>

        <div
          className="col-span-2 mt-12 flex flex-col gap-3 laptop:col-auto laptop:mt-0 laptop:flex-row laptop:gap-4"
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            text="Accept"
            styleType="green"
            isNarrow={isLaptop}
            onClick={() => setIsOpenRegister(true)}
            className="uppercase laptop:normal-case"
          />
          <Button
            styleType="red"
            isNarrow={isLaptop}
            text={declined ? 'Decline' : 'Delete'}
            className="uppercase laptop:normal-case"
            onClick={() => (declined ? setIsOpenReject(true) : setIsOpenRemove(true))}
          />
        </div>
      </div>

      <ModalAdmin
        isLoading={isLoading}
        isOpen={isOpenRegister}
        classNameBtn="w-[82px]"
        btnCancelText={btn('no')}
        btnConfirmText={btn('yes')}
        onConfirm={onSubmitRegister}
        title={modal('register.title')}
        onClose={() => setIsOpenRegister(false)}
        content={
          <div className="lending-6 flex flex-col gap-1 text-center text-mobster">
            <span>{item.organizationName}</span>
            <span>
              {modal('register.text')} {item.email}
            </span>
          </div>
        }
      />

      {declined && (
        <ModalDecline
          isOpen={isOpenReject}
          isLoading={isLoading}
          onClose={setIsOpenReject}
          onSubmitDecline={onSubmitDecline}
          organizationName={item.organizationName}
        />
      )}

      {remove && (
        <ModalAdmin
          isLoading={isLoading}
          isOpen={isOpenRemove}
          classNameBtn="w-[82px]"
          btnCancelText={btn('no')}
          onConfirm={onSubmitRemove}
          btnConfirmText={btn('yes')}
          title={modal('remove.title')}
          onClose={() => setIsOpenRemove(false)}
          content={
            <div className="lending-6 flex flex-col gap-1 text-center text-mobster">
              <span>
                {modal('remove.text')} {item.organizationName}
              </span>
            </div>
          }
        />
      )}
    </>
  );
};
