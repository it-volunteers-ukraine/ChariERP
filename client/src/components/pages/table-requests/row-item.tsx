'use client';
import { MouseEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Form, Formik, FormikValues } from 'formik';

import { routes } from '@/constants';
import { Copy, Doc } from '@/assets/icons';
import {
  Button,
  ModalAdmin,
  showMessage,
  ModalContent,
  organizationValidation,
  organizationInitialValues,
} from '@/components';

interface RowItemProps {
  item: {
    id: string;
    doc: string;
    date: string;
    email: string;
    EDRPOU: number;
    organizationName: string;
  };
}

const RowItem = ({ item }: RowItemProps) => {
  const router = useRouter();
  const btn = useTranslations('button');
  const modal = useTranslations('modal');
  const error = useTranslations('validation');

  const [isOpenReject, setIsOpenReject] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);

  const onSubmitRegister = () => {
    console.log('data', item.email);
    setIsOpenRegister(false);
  };

  const onSubmitDecline = (values: FormikValues) => {
    console.log('data', values);
  };

  const handleRowClick = () => {
    const selection = document.getSelection();

    if (!selection || !selection.toString()) {
      router.push(`${routes.dashboard}/${item.id}`);
    }
  };

  const handleCopyClick = (e: MouseEvent<SVGElement>, text: number) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text.toString());
    showMessage.success('Copied to clipboard', { autoClose: 500 });
  };

  return (
    <>
      <div
        onClick={handleRowClick}
        className="grid grid-cols-tableRequests items-center gap-5 py-[13px] pl-3 hover:bg-superBlue transition-all duration-300 border-b border-[#A3A3A359] cursor-pointer"
      >
        <div className="text-lg leading-[22px] font-robotoCondensed truncate overflow-hidden whitespace-nowrap">
          {item.organizationName}
        </div>

        <div className="text-sm flex items-center justify-center space-x-2">
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

        <div className="flex items-center justify-center">
          <a
            download
            href={item.doc}
            target="_blank"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center"
          >
            <Doc width={24} height={24} />
          </a>
        </div>

        <div className="text-lg leading-[22px] font-robotoCondensed text-center">{item.date}</div>

        <div className="flex gap-4" onClick={(e) => e.stopPropagation()}>
          <Button isNarrow styleType="green" text="Accept" onClick={() => setIsOpenRegister(true)} />
          <Button isNarrow styleType="red" text="Decline" onClick={() => setIsOpenReject(true)} />
        </div>
      </div>

      <ModalAdmin
        isOpen={isOpenRegister}
        onConfirm={onSubmitRegister}
        classNameBtn="w-[82px]"
        btnCancelText={btn('no')}
        btnConfirmText={btn('yes')}
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

      <Formik
        onSubmit={onSubmitDecline}
        initialValues={organizationInitialValues()}
        validationSchema={organizationValidation((key, params) => error(key, params))}
      >
        {({ values }) => (
          <Form>
            <ModalAdmin
              isOpen={isOpenReject}
              classNameBtn="w-[82px]"
              btnCancelText={btn('no')}
              btnConfirmText={btn('yes')}
              title={modal('decline.title')}
              onClose={() => setIsOpenReject(false)}
              onConfirm={() => onSubmitDecline(values)}
              content={<ModalContent name="declineReason" organizationName={item.organizationName} />}
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

export { RowItem };
