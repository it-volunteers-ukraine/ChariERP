'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { FieldArray, Form, Formik, FormikErrors, FormikValues } from 'formik';

import { Info } from '@/assets/icons';
import { OrganizationEditValues } from '@/types';
import { getOrganizationByIdAction } from '@/actions';
import { useLoaderAdminPage, useUserInfo } from '@/context';
import {
  cn,
  oneOrganizationNormalizer,
  serializeOrganizationsUpdate,
  showErrorMessageOfOrganizationExist,
} from '@/utils';
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
  ModalEnterEmail,
  organizationValidation,
  getInitialDataOrganization,
} from '@/components';

import { adapterUpdateAction } from './adapter';

const OrganizationPage = () => {
  const { setIsLoading } = useLoaderAdminPage();
  const { organizationId, isManager, _id, isUser } = useUserInfo();

  const btn = useTranslations('button');
  const text = useTranslations('inputs');
  const error = useTranslations('validation');
  const modal = useTranslations('modal.save');
  const globalError = useTranslations('errors');

  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [isOpenSave, setIsOpenSave] = useState<boolean>(false);
  const [data, setData] = useState<OrganizationEditValues | null>(null);
  const [isOpenModalResetPassword, setIsOpenModalResetPassword] = useState(false);

  const onSubmit = async (values: FormikValues) => {
    try {
      setIsLoadingModal(true);

      const formData = new FormData();

      const { file, data } = serializeOrganizationsUpdate(values as OrganizationEditValues);

      formData.append(`certificate`, file);
      formData.append(`data`, JSON.stringify(data));

      if (!organizationId || !_id) return;

      const sendData = {
        formData,
        userId: String(_id),
        organizationId: String(organizationId),
      };

      const updateOrganization = adapterUpdateAction(isManager);

      const response = await updateOrganization(sendData);

      if (!response.success && response.message) {
        const messageArray = Array.isArray(response.message) ? response.message : [response.message];

        showErrorMessageOfOrganizationExist(globalError, messageArray);
        throw new Error('Organization already exist');
      }

      if (response.success && response.organization) {
        showMessage.success(response.message);

        const parsedOrganization = JSON.parse(response.organization);

        setData(oneOrganizationNormalizer(parsedOrganization));
      }
    } catch (error) {
      // TODO Connect error message
      console.log(error);
    } finally {
      setIsLoadingModal(false);
      setIsOpenSave(false);
    }
  };

  const submitHandle = async (validateForm: () => Promise<FormikErrors<FormikValues>>, handleSubmit: () => void) => {
    const errors = await validateForm();

    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((error) => {
        showMessage.error(error as string);
        setIsOpenSave(false);
      });
    } else {
      handleSubmit();
    }
  };

  const loadData = async () => {
    setIsLoading(true);
    try {
      if (!organizationId) {
        return new Error('Organization not found');
      }

      const organizationData = await getOrganizationByIdAction(organizationId as unknown as string);
      const parsedOrganization = JSON.parse(organizationData);

      setData(oneOrganizationNormalizer(parsedOrganization));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [organizationId]);

  return (
    <Formik
      validateOnBlur
      validateOnChange
      enableReinitialize
      onSubmit={onSubmit}
      initialValues={getInitialDataOrganization(data)}
      validationSchema={organizationValidation((key, params) => error(key, params)).omit(['agree', 'password'])}
    >
      {({ values, validateForm, handleSubmit, setValues }) => (
        <div className="flex w-full grow justify-center bg-white">
          <div className="w-full p-[0_16px_48px] tablet:p-[0_32px_48px] desktopXl:max-w-[1100px]">
            <ModalAdmin
              isOpen={isOpenSave}
              title={modal('title')}
              content={modal('text')}
              classNameBtn="w-[82px]"
              btnCancelText={btn('no')}
              isLoading={isLoadingModal}
              btnConfirmText={btn('yes')}
              onClose={() => setIsOpenSave(false)}
              onConfirm={() => submitHandle(validateForm, handleSubmit)}
            />

            <Form className="w-full">
              {!isUser && (
                <div className="flex items-center justify-start gap-6 py-6">
                  <ButtonIcon
                    icon="save"
                    type="button"
                    iconType="primary"
                    className="min-w-[36px]"
                    onClick={() => setIsOpenSave(true)}
                  />
                </div>
              )}

              <div className="flex flex-col gap-9 desktop:gap-12">
                {!isUser && (
                  <div className="flex items-start gap-x-3 border-t-[2px] border-lightBlue pt-[24px]">
                    <>
                      <Info width="24px" height="24px" className="text-lightBlue" />
                      <span className="text-[14px] text-input-info">{text('mainInformation')}</span>
                    </>
                  </div>
                )}

                <Accordion
                  initialState
                  classNameTitle="text-[20px] uppercase"
                  title={text('title.basicInformation')}
                  classNameWrapper={cn('!gap-3', { 'mt-6': isUser })}
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4 laptop:flex-row laptop:gap-12">
                      <InputField
                        required
                        disabled={isUser}
                        name="organizationName"
                        label={text('organizationName.label')}
                      />

                      <InputField
                        required
                        type="number"
                        name="edrpou"
                        disabled={isUser}
                        label={text('organizationTaxNumber.labelErdpouOfOrganization')}
                      />
                    </div>

                    <FileField
                      required
                      disabled={isUser}
                      placeholderItalic
                      name="certificate"
                      accept={'.pdf, .jpg, .jpeg, .png'}
                      label={text('certificateOfRegister.label')}
                      placeholder={text('certificateOfRegister.downloadDoc')}
                      wrapperClass={cn('laptop:!gap-12', {
                        'laptop:max-w-[calc(50%-24px)] pointer-events-none': isUser,
                      })}
                      info={
                        !isUser && (
                          <div>
                            {text('certificateOfRegister.information')}
                            <Link href="#" className="font-medium italic text-input-link underline">
                              {text('certificateOfRegister.howDownloadFile')}
                            </Link>
                          </div>
                        )
                      }
                    />

                    <DateField
                      required
                      disabled={isUser}
                      placeholderItalic
                      name="dateOfRegistration"
                      label={text('dateOfRegisterOrganization.label')}
                      placeholder={text('dateOfRegisterOrganization.chooseDate')}
                      wrapperClass={cn('laptop:max-w-[calc(50%-24px)]', { 'pointer-events-none': isUser })}
                    />
                  </div>
                </Accordion>

                <Accordion
                  initialState
                  classNameWrapper="!gap-3"
                  classNameTitle="text-[20px] uppercase"
                  title={text('title.contactInformation')}
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4 laptop:flex-row laptop:gap-12">
                      <InputField
                        required
                        name="position"
                        disabled={isUser}
                        label={text('positionOrganization.label')}
                      />

                      <InputField required disabled={isUser} name="lastName" label={text('lastName.label')} />
                    </div>

                    <div className="flex flex-col gap-4 laptop:flex-row laptop:gap-12">
                      <InputField required disabled={isUser} name="firstName" label={text('name.label')} />

                      <InputField disabled={isUser} name="middleName" label={text('middleName.label')} />
                    </div>

                    <InputField
                      required
                      isMasked
                      name="phone"
                      disabled={isUser}
                      placeholderItalic
                      label={text('phone.label')}
                      placeholder="+38(0__)___-__-__"
                      wrapperClass="laptop:max-w-[calc(50%-24px)]"
                    />
                  </div>
                </Accordion>

                <Accordion
                  initialState
                  classNameWrapper="!gap-3"
                  classNameTitle="text-[20px] uppercase"
                  title={text('title.loginInformation')}
                >
                  <div>
                    <InputField
                      required
                      name="email"
                      disabled={isUser}
                      label={text('email.label')}
                      wrapperClass="laptop:max-w-[calc(50%-24px)]"
                    />
                    {isManager && (
                      <>
                        <SmallBtn
                          type="changePass"
                          text={btn('forgotPass')}
                          className="mt-1 py-[14.5px]"
                          onClick={() => setIsOpenModalResetPassword(true)}
                        />
                        <ModalEnterEmail
                          isOpen={isOpenModalResetPassword}
                          onClose={() => setIsOpenModalResetPassword(false)}
                        />
                      </>
                    )}
                  </div>
                </Accordion>

                <Accordion
                  initialState
                  classNameWrapper="!gap-3"
                  title={text('title.media')}
                  classNameTitle="text-[20px] uppercase"
                >
                  <div className="flex flex-col gap-4">
                    <InputField
                      cross
                      name="site"
                      disabled={isUser}
                      label={text('site.label')}
                      wrapperClass="laptop:max-w-[calc(50%-24px)]"
                    />

                    <FieldArray
                      name="social"
                      render={({ push, remove }) => (
                        <>
                          {values.social.map((_, index) => {
                            const isRightLength = values.social.length < 5;
                            const isLastIndex = index === values.social.length - 1;

                            return (
                              <div key={index}>
                                <InputField
                                  cross
                                  disabled={isUser}
                                  name={`social.${index}`}
                                  key={`media-signUp-${index}`}
                                  label={text('socialNetworks.label')}
                                  wrapperClass="laptop:max-w-[calc(50%-24px)]"
                                />
                                {isManager && (
                                  <div className="flex items-center justify-between laptop:max-w-[calc(50%-24px)]">
                                    {isRightLength && isLastIndex && (
                                      <SmallBtn
                                        type="add"
                                        text={btn('addField')}
                                        onClick={() => push('')}
                                        className="mt-2"
                                      />
                                    )}

                                    {index !== 0 && (
                                      <SmallBtn
                                        type="delete"
                                        text={btn('deleteField')}
                                        onClick={() => remove(index)}
                                        className="ml-auto mt-2"
                                      />
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </>
                      )}
                    />
                  </div>
                </Accordion>

                {isManager && (
                  <div className="flex flex-col items-center justify-center gap-3 tablet:flex-row tablet:gap-6">
                    <Button
                      type="button"
                      styleType="green"
                      text={btn('saveChanges')}
                      onClick={() => setIsOpenSave(true)}
                      className="w-full uppercase tablet:w-fit"
                    />

                    <Button
                      type="button"
                      styleType="red"
                      text={btn('cancelChanges')}
                      className="w-full uppercase tablet:w-fit"
                      onClick={() => setValues(getInitialDataOrganization(data))}
                    />
                  </div>
                )}
              </div>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export { OrganizationPage };
