'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { FieldArray, Form, Formik, FormikErrors, FormikValues } from 'formik';

import { Info } from '@/assets/icons';
import {
  Button,
  SmallBtn,
  Accordion,
  DateField,
  FileField,
  ButtonIcon,
  InputField,
  ModalAdmin,
  showMessage,
  organizationValidation,
  organizationInitialValues,
} from '@/components';

const Organization = () => {
  const btn = useTranslations('button');
  const text = useTranslations('inputs');
  const error = useTranslations('validation');
  const modal = useTranslations('modal.save');

  const [isOpenSave, setIsOpenSave] = useState<boolean>(false);

  const onSubmit = async (values: FormikValues) => console.log('data', values);

  const submitHandle = async (validateForm: () => Promise<FormikErrors<FormikValues>>, handleSubmit: () => void) => {
    const errors = await validateForm();

    if (Object.keys(errors).length > 0) {
      showMessage.error('Error');
      setIsOpenSave(false);
    } else {
      handleSubmit();
      showMessage.success('Save');
      setIsOpenSave(false);
    }
  };

  return (
    <Formik
      validateOnBlur
      validateOnChange
      onSubmit={onSubmit}
      initialValues={organizationInitialValues()}
      validationSchema={organizationValidation((key, params) => error(key, params))}
    >
      {({ values, validateForm, handleSubmit }) => (
        <div className="p-[0_32px_32px] w-full bg-white rounded-lg shadow-bg overflow-y-auto scroll-blue">
          <ModalAdmin
            isOpen={isOpenSave}
            title={modal('title')}
            content={modal('text')}
            classNameBtn="w-[82px]"
            btnCancelText={btn('no')}
            btnConfirmText={btn('yes')}
            onClose={() => setIsOpenSave(false)}
            onConfirm={() => submitHandle(validateForm, handleSubmit)}
          />

          <div className="flex justify-start items-center gap-6 py-6">
            <ButtonIcon icon="save" iconType="primary" onClick={() => setIsOpenSave(true)} />

            <InputField type="search" name="search" wrapperClass="max-w-[373px]" placeholder="search" label={''} />
          </div>

          <Form className="flex flex-col rounded-3xl gap-9 p-8 shadow-innerBg">
            <div className="flex items-start gap-3">
              <Info width={24} height={24} className="text-lightBlue" />

              <span className="text-input-info text-[14px]">{text('mainInformation')}</span>
            </div>

            <Accordion
              initialState
              classNameTitle="text-[20px] uppercase"
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
                wrapperClass="laptop:max-w-[calc(50%-12px)]"
                label={text('organizationTaxNumber.labelErdpouOfOrganization')}
              />

              <FileField
                required
                maxSize={5}
                placeholderItalic
                name="certificateOfRegister"
                accept={'pdf, jpg, jpeg, png'}
                label={text('certificateOfRegister.label')}
                placeholder={text('certificateOfRegister.downloadDoc')}
                info={
                  <div>
                    {text('certificateOfRegister.information')}
                    <Link href="#" className="italic font-medium text-input-link underline">
                      {text('certificateOfRegister.howDownloadFile')}
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
                placeholder={text('dateOfRegisterOrganization.chooseDate')}
              />
            </Accordion>

            <Accordion
              initialState
              classNameTitle="text-[20px] uppercase"
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

            <Accordion initialState classNameTitle="text-[20px] uppercase" title={text('title.loginInformation')}>
              <div className="flex flex-col gap-8">
                <InputField
                  required
                  name="email"
                  label={text('email.label')}
                  wrapperClass="laptop:max-w-[calc(50%-12px)]"
                />
              </div>

              <SmallBtn className="mt-2" text={btn('changePass')} type="changePass" onClick={() => {}} />
            </Accordion>

            <Accordion
              initialState
              classNameWrapper="gap-0"
              title={text('title.media')}
              classNameTitle="text-[20px] uppercase"
              classNameChildren="flex flex-col gap-6"
            >
              <InputField cross name="site" wrapperClass="laptop:max-w-[calc(50%-12px)]" label={text('site.label')} />

              <FieldArray
                name="socialNetworks"
                render={({ push, remove }) => (
                  <>
                    {values.socialNetworks.map((_, index) => {
                      const isRightLength = values.socialNetworks.length < 5;
                      const isLastIndex = index === values.socialNetworks.length - 1;

                      return (
                        <div key={index}>
                          <InputField
                            cross
                            wrapperClass="laptop:max-w-[calc(50%-12px)]"
                            key={`media-signUp-${index}`}
                            name={`socialNetworks.${index}`}
                            label={text('socialNetworks.label')}
                          />
                          <div className="flex items-center justify-between laptop:max-w-[calc(50%-12px)]">
                            {isRightLength && isLastIndex && (
                              <SmallBtn
                                type="add"
                                text={btn('addField')}
                                onClick={() => push('')}
                                className="flex justify-start mt-3 w-full !leading-4"
                              />
                            )}

                            {index !== 0 && (
                              <SmallBtn
                                type="delete"
                                text={btn('deleteField')}
                                onClick={() => remove(index)}
                                className="flex justify-end mt-3 w-full !leading-4"
                              />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              />
            </Accordion>

            <div className="flex items-center justify-center gap-6">
              <Button
                type="submit"
                styleType="green"
                className="uppercase"
                text={btn('saveChanges')}
                onClick={() => {
                  setIsOpenSave(true);
                }}
              />

              <Button className="uppercase" onClick={() => {}} styleType="red" text={btn('cancelChanges')} />
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default Organization;
