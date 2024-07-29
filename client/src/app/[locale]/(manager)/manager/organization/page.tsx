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
      {({ values, errors, validateForm, handleSubmit }) => (
        <div className="w-full bg-white overflow-y-auto scroll-blue">
          <div className="p-[0_16px_48px] tablet:p-[0_32px_48px] m-auto w-full desktopXl:max-w-[1100px]">
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
              <ButtonIcon className="min-w-[36px]" icon="save" iconType="primary" onClick={() => setIsOpenSave(true)} />

              <InputField
                label={''}
                type="search"
                name="search"
                placeholder="search"
                wrapperClass="w-full laptop:max-w-[373px]"
              />
            </div>

            <Form className="flex flex-col gap-9 desktop:gap-12">
              <div className="flex items-start gap-x-3 pt-[24px] border-t-[2px] border-lightBlue">
                <div>
                  <Info width="24px" height="24px" className="text-lightBlue" />
                </div>

                <span className="text-input-info text-[14px]">{text('mainInformation')}</span>
              </div>

              <Accordion
                initialState
                classNameWrapper="!gap-3"
                classNameTitle="text-[20px] uppercase"
                title={text('title.basicInformation')}
                classNameChildren="flex flex-col gap-4"
                changedLength={Object.keys(errors).length}
              >
                <div className="flex flex-col laptop:flex-row gap-4 laptop:gap-12">
                  <InputField required name="organizationName" label={text('organizationName.label')} />

                  <InputField
                    required
                    type="number"
                    name="organizationTaxNumber"
                    label={text('organizationTaxNumber.labelErdpouOfOrganization')}
                  />
                </div>

                <FileField
                  required
                  maxSize={5}
                  placeholderItalic
                  name="certificateOfRegister"
                  accept={'pdf, jpg, jpeg, png'}
                  wrapperClass="laptop:gap-12"
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
                  wrapperClass="laptop:max-w-[calc(50%-24px)]"
                  label={text('dateOfRegisterOrganization.label')}
                  placeholder={text('dateOfRegisterOrganization.chooseDate')}
                />
              </Accordion>

              <Accordion
                initialState
                classNameWrapper="!gap-3"
                classNameTitle="text-[20px] uppercase"
                classNameChildren="flex flex-col gap-4"
                title={text('title.contactInformation')}
                changedLength={Object.keys(errors).length}
              >
                <div className="flex flex-col laptop:flex-row gap-4 laptop:gap-12">
                  <InputField required name="positionOrganization" label={text('positionOrganization.label')} />

                  <InputField required name="lastName" label={text('lastName.label')} />
                </div>

                <div className="flex flex-col laptop:flex-row gap-4 laptop:gap-12">
                  <InputField required name="name" label={text('name.label')} />

                  <InputField required name="middleName" label={text('middleName.label')} />
                </div>

                <InputField
                  required
                  isMasked
                  name="phone"
                  placeholderItalic
                  label={text('phone.label')}
                  placeholder="+38(0__)___-__-__"
                  wrapperClass="laptop:max-w-[calc(50%-24px)]"
                />
              </Accordion>

              <Accordion
                initialState
                classNameWrapper="!gap-3"
                classNameTitle="text-[20px] uppercase"
                title={text('title.loginInformation')}
              >
                <InputField
                  required
                  name="email"
                  label={text('email.label')}
                  wrapperClass="laptop:max-w-[calc(50%-24px)]"
                />
              </Accordion>

              <Accordion
                initialState
                classNameWrapper="!gap-3"
                title={text('title.media')}
                classNameTitle="text-[20px] uppercase"
                classNameChildren="flex flex-col gap-4 laptop:gap-4"
                changedLength={Object.keys(errors).length}
              >
                <InputField cross name="site" wrapperClass="laptop:max-w-[calc(50%-24px)]" label={text('site.label')} />

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
                              key={`media-signUp-${index}`}
                              name={`socialNetworks.${index}`}
                              label={text('socialNetworks.label')}
                              wrapperClass="laptop:max-w-[calc(50%-24px)]"
                            />
                            <div className="flex items-center justify-between laptop:max-w-[calc(50%-24px)]">
                              {isRightLength && isLastIndex && (
                                <SmallBtn
                                  type="add"
                                  text={btn('addField')}
                                  onClick={() => push('')}
                                  className="flex justify-start mt-2 w-full"
                                />
                              )}

                              {index !== 0 && (
                                <SmallBtn
                                  type="delete"
                                  text={btn('deleteField')}
                                  onClick={() => remove(index)}
                                  className="flex justify-end mt-2 w-full"
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

              <div className="flex flex-col tablet:flex-row items-center justify-center gap-3 tablet:gap-6">
                <Button
                  type="submit"
                  styleType="green"
                  className="uppercase w-full tablet:w-fit"
                  text={btn('saveChanges')}
                  onClick={() => {
                    setIsOpenSave(true);
                  }}
                />

                <Button
                  className="uppercase w-full tablet:w-fit"
                  onClick={() => {}}
                  styleType="red"
                  text={btn('cancelChanges')}
                />
              </div>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Organization;
