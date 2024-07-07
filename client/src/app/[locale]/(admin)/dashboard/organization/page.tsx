'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Form, Formik, FormikValues } from 'formik';

import { Accordion, ButtonIcon, DateField, FileField, InputField, ModalAdmin } from '@/components';
import { organizationInitialValues, organizationValidation } from '@/formik-config';
import { Info } from '@/assets/icons';
import Link from 'next/link';

const Organization = () => {
  const [isOpenSave, setIsOpenSave] = useState<boolean>(false);
  // const [isOpenDecline, setIsOpenDecline] = useState<boolean>(false);
  const onSubmit = (values: FormikValues) => {
    console.log('data', values);
  };

  const error = useTranslations('validation');
  const login = useTranslations('auth-page.login');
  const text = useTranslations('auth-page.organization');
  const modal = useTranslations('auth-page.dashboard');

  return (
    <Formik
      validateOnBlur
      validateOnChange
      onSubmit={onSubmit}
      initialValues={organizationInitialValues()}
      validationSchema={organizationValidation((key, params) => error(key, params))}
    >
      {() => (
        <Form className="p-[0_32px_32px] w-full bg-white rounded-lg shadow-bg">
          <ModalAdmin
            isOpen={isOpenSave}
            onConfirm={() => {}}
            title={modal('title.save')}
            content={modal('text.save')}
            btnCancelText={modal('btn.no')}
            btnConfirmText={modal('btn.yes')}
            onClose={() => setIsOpenSave(false)}
          />

          <div className="flex justify-start items-center gap-6 py-6">
            <ButtonIcon icon="save" iconType="primary" onClick={() => setIsOpenSave(true)} />

            <InputField type="search" name="search" wrapperClass="max-w-[373px]" placeholder="search" label={''} />
          </div>

          <div className="flex flex-col rounded-3xl gap-9 p-8 shadow-innerBg">
            <div className="flex items-start gap-3">
              <Info width={24} height={24} className="text-lightBlue" />

              <span className="text-input-info">
                На даній сторінці Ви можете відредагувати данні, що були вказані при реєстрації. Назву організації,
                додати або змінити данні медіа лінки, телефон організації і т.д.
              </span>
            </div>

            <Accordion
              classNameTitle="text-[20px]"
              title={text('title.basicInformation')}
              classNameChildren="flex flex-col gap-[42px]"
            >
              <InputField
                required
                name="organizationName"
                label={text('organizationName.label')}
                wrapperClass="laptop:max-w-[calc(50%-12px)]"
              />

              <InputField
                required
                type="number"
                name="organizationTaxNumber"
                label={text('organizationTaxNumber.label')}
                wrapperClass="laptop:max-w-[calc(50%-12px)]"
              />

              <FileField
                required
                maxSize={5}
                placeholderItalic
                name="certificateOfRegister"
                accept={'pdf, jpg, jpeg, png'}
                label={text('certificateOfRegister.label')}
                placeholder={text('certificateOfRegister.placeholder')}
                info={
                  <div>
                    {text('certificateOfRegister.info')}
                    <Link href="#" className="italic font-medium text-input-link underline">
                      {text('certificateOfRegister.link')}
                    </Link>
                  </div>
                }
              />

              <DateField
                required
                placeholderItalic
                name="dateOfRegisterOrganization"
                wrapperClass="laptop:max-w-[calc(50%-12px)]"
                label={text('dateOfRegisterOrganization.label')}
                placeholder={text('dateOfRegisterOrganization.placeholder')}
              />
            </Accordion>

            <Accordion
              classNameTitle="text-[20px]"
              title={text('title.contactInformation')}
              classNameChildren="flex flex-col gap-[42px]"
            >
              <div className="flex gap-6">
                <InputField required name="positionOrganization" label={text('positionOrganization.label')} />

                <InputField
                  required
                  name="lastName"
                  label={text('lastName.label')}
                  wrapperClass="laptop:max-w-[calc(50%-12px)]"
                />
              </div>

              <div className="flex gap-6">
                <InputField
                  required
                  name="name"
                  label={text('name.label')}
                  wrapperClass="laptop:max-w-[calc(50%-12px)]"
                />

                <InputField
                  required
                  name="middleName"
                  label={text('middleName.label')}
                  wrapperClass="laptop:max-w-[calc(50%-12px)]"
                />
              </div>

              <InputField
                required
                isMasked
                name="phone"
                placeholderItalic
                label={text('phone.label')}
                placeholder="+38(0__)___-__-__"
                wrapperClass="laptop:max-w-[calc(50%-12px)]"
              />
            </Accordion>

            <Accordion
              classNameTitle="text-[20px]"
              title={text('title.loginInfo')}
              classNameChildren="flex flex-col gap-8"
            >
              <InputField
                required
                name="email"
                label={text('email.label')}
                wrapperClass="laptop:max-w-[calc(50%-12px)]"
              />

              <InputField
                required
                name="password"
                type="password"
                label={login('password')}
                wrapperClass="laptop:max-w-[calc(50%-12px)]"
              />
            </Accordion>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Organization;
