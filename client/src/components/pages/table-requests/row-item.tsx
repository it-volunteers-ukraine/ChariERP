'use client';

import { MouseEvent, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

import { routes } from '@/constants';
import { RequestOrganizationStatus, RowItemProps } from '@/types';
import { Copy, Doc } from '@/assets/icons';
import { downloadFileFromBucket } from '@/services';
import { dateFormat, getUrlWithExtension } from '@/utils';
import { Button, ModalAdmin, showMessage, ModalDecline } from '@/components';
import { declineOrganizationAction, deleteOrganizationAction, updateOrganizationAction } from '@/actions';

export const RowItem = ({ item, path, isLaptop, getData }: RowItemProps) => {
  const locale = useLocale();
  const router = useRouter();

  const btn = useTranslations('button');
  const modal = useTranslations('modal');
  const table = useTranslations('table');
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

  const handleCopyClick = (e: MouseEvent<SVGElement>, text: number) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text.toString());
    showMessage.success('Copied to clipboard', { autoClose: 500 });
  };

  async function getCertificate(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();

    try {
      const downloadedFile = await downloadFileFromBucket(item.certificate);

      if (!downloadedFile) {
        console.error('Failed to upload file: no body');

        return;
      }

      const fileUrl = await getUrlWithExtension({ url: item.certificate, file: downloadedFile });

      window.open(fileUrl as string, '_blank');
    } catch (error) {
      console.error('Error when loading a certificate:', error);
    }
  }

  return (
    <>
      <div
        onClick={handleRowClick}
        className="grid grid-cols-2 laptop:grid-cols-tableRequests laptop:items-center laptop:gap-5 p-3 laptop:py-[13px] laptop:pl-3 laptop:pr-0 hover:bg-superBlue border laptop:border-t-0 laptop:border-x-0 laptop:border-b rounded-2xl laptop:rounded-none border-[#A3A3A359] cursor-pointer transition-all duration-300"
      >
        <div className="col-span-2 laptop:col-auto text-lg leading-[22px] font-robotoCondensed truncate overflow-hidden whitespace-nowrap">
          {item.organizationName}
        </div>

        <span className="mt-6 laptop:mt-0 laptop:hidden text-lg leading-[22px] font-robotoCondensed">
          {table('EDRPOU')}
        </span>

        <div className="mt-6 laptop:mt-0 flex items-center justify-end laptop:justify-center gap-1 text-sm">
          <span className="text-lg leading-[22px] font-robotoCondensed truncate overflow-hidden whitespace-nowrap">
            {item.EDRPOU}
          </span>
          <Copy
            width={24}
            height={24}
            className="cursor-pointer flex-shrink-0 text-lightBlue"
            onClick={(e: MouseEvent<SVGSVGElement>) => handleCopyClick(e, item.EDRPOU)}
          />
        </div>

        <div className="mt-8 laptop:mt-0 laptop:hidden text-lg leading-[22px] laptop:text-center font-robotoCondensed">
          {table('document')}
        </div>

        <div className="flex items-center justify-end laptop:justify-center mt-8 laptop:mt-0">
          <button onClick={getCertificate} className="flex items-center justify-center">
            <Doc width={24} height={24} />
          </button>
        </div>

        <div className="mt-6 laptop:mt-0 text-lg leading-[22px] font-robotoCondensed laptop:text-center">
          {format(parseISO(item.dateOfRegistration.toString()), dateFormat[locale])}
        </div>

        <div
          className="col-span-2 laptop:col-auto flex flex-col laptop:flex-row mt-12 laptop:mt-0 gap-3 laptop:gap-4"
          onClick={(e) => e.stopPropagation()}
        >
          <Button text="Accept" styleType="green" isNarrow={isLaptop} onClick={() => setIsOpenRegister(true)} />
          <Button
            styleType="red"
            isNarrow={isLaptop}
            text={declined ? 'Decline' : 'Delete'}
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
          <div className="flex flex-col gap-1 text-center text-mobster lending-6">
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
            <div className="flex flex-col gap-1 text-center text-mobster lending-6">
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
