'use client';

import { MouseEvent, useState } from 'react';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import logger from '@/utils/logger/logger';

import { Copy, Doc } from '@/assets/icons';
import { dateFormat, routes } from '@/constants';
import { RequestOrganizationStatus, RowItemProps } from '@/types';
import { Button, EllipsisText, ModalAdmin, ModalDecline, showMessage } from '@/components';
import { onCopy, openNewWindowForCertificate, showErrorMessageOfOrganizationExist } from '@/utils/helpers';
import {
  declineOrganizationAction,
  deleteOrganizationAction,
  getImageAction,
  updateOrganizationAction,
} from '@/actions';
import { useUserInfo } from '@/context';

export const RowItem = ({ item, path, isLaptop, getData }: RowItemProps) => {
  const router = useRouter();

  const btn = useTranslations('button');
  const modal = useTranslations('modal');
  const table = useTranslations('table');
  const messagesCopy = useTranslations('copy');
  const globalError = useTranslations('errors');
  const success = useTranslations('success.admin-pages');
  const { _id } = useUserInfo();

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

      const sendData = {
        formData,
        userId: String(_id),
        organizationId: String(item.id),
      };

      const response = await updateOrganizationAction(sendData);

      if (!response.success && response.message) {
        const messageArray = Array.isArray(response.message) ? response.message : [response.message];

        return showErrorMessageOfOrganizationExist(globalError, messageArray);
      }

      showMessage.success(success('sentEmail', { email: item.email }));
    } catch (error) {
      logger.error(error);
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
      logger.error(error);
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
      logger.error(error);
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
        logger.error('Failed to upload file: no body');

        return;
      }

      openNewWindowForCertificate(downloadedFile.image as string);
    } catch (error) {
      logger.error('Error when loading a certificate', error);
    }
  }

  return (
    <>
      <div
        onClick={handleRowClick}
        className="hover:bg-super-blue laptop:grid-cols-table-requests laptop:items-center laptop:gap-5 laptop:rounded-none laptop:border-x-0 laptop:border-b laptop:border-t-0 laptop:py-[12px] laptop:pl-3 laptop:pr-0 grid cursor-pointer grid-cols-2 rounded-2xl border border-[#A3A3A359] p-3 transition-all duration-300"
      >
        <EllipsisText
          className="laptop:max-w-[380px] desktop:max-w-[500px] max-w-[300px]"
          content={item.organizationName}
        >
          <div className="font-roboto-condensed text-mid-gray laptop:col-auto laptop:text-lg laptop:leading-[22px] col-span-2 truncate overflow-hidden text-xl leading-6 whitespace-nowrap">
            {item.organizationName}
          </div>
        </EllipsisText>

        <span className="font-roboto-condensed text-dim-gray laptop:mt-0 laptop:hidden mt-6 text-lg leading-[22px]">
          {table('EDRPOU')}
        </span>

        <div className="laptop:mt-0 laptop:justify-center mt-6 flex items-center justify-end gap-1 text-sm">
          <span className="font-roboto-condensed truncate overflow-hidden text-lg leading-[22px] whitespace-nowrap">
            {item.EDRPOU}
          </span>

          <Copy
            className="text-light-blue hover:text-dark-blue active:text-green-active h-[22px] w-[22px] shrink-0 cursor-pointer transition duration-300 active:transition-none"
            onClick={(e: MouseEvent<SVGSVGElement>) => onCopy(e, item.EDRPOU, messagesCopy('messages'))}
          />
        </div>

        <div className="font-roboto-condensed text-dim-gray laptop:mt-0 laptop:hidden laptop:text-center mt-8 text-lg leading-[22px]">
          {table('document')}
        </div>

        <div className="laptop:mt-0 laptop:justify-center mt-8 flex items-center justify-end">
          <button onClick={getCertificate} className="flex items-center justify-center">
            <Doc width={22} height={22} />
          </button>
        </div>

        <div className="font-roboto-condensed laptop:mt-0 laptop:text-center mt-6 text-lg leading-[22px]">
          {item.requestDate && format(new Date(item.requestDate), dateFormat)}
        </div>

        <div
          className="laptop:col-auto laptop:mt-0 laptop:flex-row laptop:gap-4 col-span-2 mt-12 flex flex-col gap-3"
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            text="Accept"
            styleType="green"
            isNarrow={isLaptop}
            onClick={() => setIsOpenRegister(true)}
            className="laptop:normal-case uppercase"
          />

          <Button
            styleType="red"
            isNarrow={isLaptop}
            text={declined ? 'Decline' : 'Delete'}
            className="laptop:normal-case uppercase"
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
          <div className="lending-6 text-mobster flex flex-col gap-1 text-center">
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
            <div className="lending-6 text-mobster flex flex-col gap-1 text-center">
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
