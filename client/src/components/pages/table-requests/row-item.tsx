'use client';

import { MouseEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { format, parseISO } from 'date-fns';
import { Formik, FormikValues } from 'formik';
import { useLocale, useTranslations } from 'next-intl';

import { routes } from '@/constants';
import { RowItemProps } from '@/types';
import { Copy, Doc } from '@/assets/icons';
import { downloadFileFromBucket } from '@/services';
import { dateFormat, getUrlWithExtension } from '@/utils';
import { Button, ModalAdmin, showMessage, ModalContent } from '@/components';
import { deleteOrganization, onDeclineOrganization, onRegisterOrganization } from '@/api';

import { initialValues, validationSchema } from './config';

export const RowItem = ({ item, path, isLaptop, getData }: RowItemProps) => {
  const locale = useLocale();
  const router = useRouter();

  const btn = useTranslations('button');
  const modal = useTranslations('modal');
  const table = useTranslations('table');
  const error = useTranslations('validation');

  const [isOpenReject, setIsOpenReject] = useState(false);
  const [isOpenRemove, setIsOpenRemove] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const [isLoadingDecline, setIsLoadingDecline] = useState(false);
  const [isLoadingRegister, setIsLoadingRegister] = useState(false);

  const remove = path === routes.declined;
  const declined = path === routes.requests;

  const updateData = () => {
    getData();
  };

  const onSubmitRegister = async () => {
    try {
      setIsLoadingRegister(true);
      await onRegisterOrganization(item.id);

      setIsOpenRegister(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingRegister(false);
      updateData();
    }
  };

  const onSubmitDecline = async (values: FormikValues) => {
    try {
      setIsLoadingDecline(true);
      const value =
        modal('decline.radioBtn.other') === values.declineReason ? values.otherReason : values.declineReason;

      if (value !== '') {
        await onDeclineOrganization(item.id, value);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingDecline(false);
      updateData();
    }
  };

  const onSubmitRemove = async () => {
    const data = await deleteOrganization(item.id);

    console.log(data);
    setIsOpenRemove(false);
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

      window.open(fileUrl, '_blank');
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
            text="Decline"
            styleType="red"
            isNarrow={isLaptop}
            onClick={() => (declined ? setIsOpenReject(true) : setIsOpenRemove(true))}
          />
        </div>
      </div>

      <ModalAdmin
        isOpen={isOpenRegister}
        classNameBtn="w-[82px]"
        btnCancelText={btn('no')}
        btnConfirmText={btn('yes')}
        onConfirm={onSubmitRegister}
        isLoading={isLoadingRegister}
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
        <Formik onSubmit={onSubmitDecline} initialValues={initialValues} validationSchema={validationSchema(error)}>
          {({ values, setFieldValue }) => {
            return (
              <ModalAdmin
                isOpen={isOpenReject}
                classNameBtn="w-[82px]"
                btnCancelText={btn('no')}
                btnConfirmText={btn('yes')}
                isLoading={isLoadingDecline}
                title={modal('decline.title')}
                onClose={() => setIsOpenReject(false)}
                onConfirm={() => onSubmitDecline(values)}
                content={
                  <ModalContent
                    values={values}
                    name="declineReason"
                    setFieldValue={setFieldValue}
                    organizationName={item.organizationName}
                  />
                }
              />
            );
          }}
        </Formik>
      )}

      {remove && (
        <ModalAdmin
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
