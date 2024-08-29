'use client';

import { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useRouter, useParams } from 'next/navigation';
import { FieldArray, Form, Formik, FormikErrors, FormikValues } from 'formik';

import { onUpdateOrganization } from '@/api';
import { getOrganizationByIdAction } from '@/actions';
import { OrganizationEditValues, RequestOrganizationStatus } from '@/types';
import { oneOrganizationNormalizer, serializeOrganizationsUpdate } from '@/utils';
import {
  Button,
  SmallBtn,
  DateField,
  Accordion,
  FileField,
  InputField,
  ButtonIcon,
  ModalAdmin,
  LoaderPage,
  showMessage,
  ModalContent,
  organizationValidation,
} from '@/components';

import { getInitialData } from './config';

const RequestsId = () => {
  const router = useRouter();
  const { id } = useParams();
  const btn = useTranslations('button');
  const text = useTranslations('inputs');
  const modal = useTranslations('modal');
  const error = useTranslations('validation');

  const [isLoading, setIsLoading] = useState(false);
  const [isOpenSave, setIsOpenSave] = useState(false);
  const [isOpenAccept, setIsOpenAccept] = useState(false);
  const [isOpenDecline, setIsOpenDecline] = useState(false);
  const [isLoadingRequest, setIsLoadingRequest] = useState(false);
  const [data, setData] = useState<OrganizationEditValues | null>(null);

  const wrapperClass = clsx('relative w-full h-full bg-boardHeader scroll-blue', {
    'overflow-y-auto': !isLoading,
  });

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const organizationData = await getOrganizationByIdAction(id as string);
      const parsedOrganization = JSON.parse(organizationData);

      setData(oneOrganizationNormalizer(parsedOrganization));
    } catch (error) {
      // TODO Connect error message
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  const onSave = async (values: OrganizationEditValues, request?: RequestOrganizationStatus) => {
    const formData = new FormData();

    const { file, data } = serializeOrganizationsUpdate(values);

    if (request) data.request = request;

    formData.append(`certificate`, file);
    formData.append(`data`, JSON.stringify(data));

    const response = await onUpdateOrganization(id as string, formData);

    setData(response);
  };

  const handleSave = async (values: OrganizationEditValues, request?: RequestOrganizationStatus) => {
    try {
      setIsLoadingRequest(true);
      await onSave(values, request);
      showMessage.success('Save');
    } catch (error) {
      // TODO Connect error message
      console.log(error);
      showMessage.error('Some error in form');
    } finally {
      setIsLoadingRequest(false);
      setIsOpenSave(false);
    }
  };

  const onSubmit = async (values: FormikValues) => {
    try {
      setIsLoadingRequest(true);

      await onSave(values as OrganizationEditValues, RequestOrganizationStatus.APPROVED);
    } catch (error) {
      // TODO Connect error message
      console.log(error);
    } finally {
      setIsOpenAccept(false);
      setIsLoadingRequest(false);
    }
  };

  const submitHandle = async (validateForm: () => Promise<FormikErrors<FormikValues>>, handleSubmit: () => void) => {
    const errors = await validateForm();

    if (Object.keys(errors).length > 0) {
      showMessage.error('Error');
    } else {
      handleSubmit();
    }
  };

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <Formik
      validateOnBlur
      validateOnChange
      enableReinitialize
      onSubmit={onSubmit}
      initialValues={getInitialData(data)}
      validationSchema={organizationValidation((key, params) => error(key, params)).omit(['agree'])}
    >
      {({ values, errors, setFieldValue, validateForm, handleSubmit }) => (
        <div className={wrapperClass}>
          <ModalAdmin
            isOpen={isOpenSave}
            classNameBtn="w-[82px]"
            btnCancelText={btn('no')}
            title={modal('save.title')}
            btnConfirmText={btn('yes')}
            isLoading={isLoadingRequest}
            content={modal('save.text')}
            onClose={() => setIsOpenSave(false)}
            onConfirm={async () => await handleSave(values as OrganizationEditValues)}
          />

          <ModalAdmin
            isOpen={isOpenAccept}
            classNameBtn="w-[82px]"
            btnCancelText={btn('no')}
            btnConfirmText={btn('yes')}
            isLoading={isLoadingRequest}
            title={modal('register.title')}
            onClose={() => setIsOpenAccept(false)}
            onConfirm={async () => await submitHandle(validateForm, handleSubmit)}
            content={
              <div className="flex flex-col text-center text-mobster lending-6">
                <span>{data?.organizationName}</span>
                <span>
                  {modal('register.text')} {'adshfg@mail.com'}
                </span>
              </div>
            }
          />

          <ModalAdmin
            isOpen={isOpenDecline}
            classNameBtn="w-[82px]"
            btnCancelText={btn('no')}
            btnConfirmText={btn('yes')}
            title={modal('decline.title')}
            onConfirm={() => onSubmit(values)}
            onClose={() => setIsOpenDecline(false)}
            content={<ModalContent setFieldValue={setFieldValue} name="declineReason" organizationName={'ГО Живи'} />}
          />

          <div className="flex justify-start mb-20 px-8 pb-12 bg-white rounded-lg shadow-dashboard">
            <div className="w-full desktop:mr-32">
              <div className="flex items-center justify-between mb-4 py-6 pr-2 border-b-2 border-lightBlue">
                <div className="flex items-center gap-4">
                  <ButtonIcon icon="back" iconType="primary" onClick={() => router.back()} />

                  <ButtonIcon
                    icon="save"
                    iconType="primary"
                    onClick={() => setIsOpenSave(true)}
                    disabled={Object.keys(errors).length > 0}
                  />
                </div>

                <div className="text-[18px] text-lightBlue leading-6 capitalize">№2223</div>
              </div>

              <LoaderPage isLoading={isLoading} />

              <Form className="flex flex-col gap-12">
                <Accordion
                  initialState
                  classNameTitle="text-[20px]"
                  title={text('title.basicInformation')}
                  classNameChildren="flex flex-col gap-6"
                  changedLength={Object.keys(errors).length}
                >
                  <div className="flex items-start gap-6">
                    <InputField
                      isCopy
                      required
                      type="number"
                      name="edrpou"
                      wrapperClass="max-w-[140px]"
                      label={text('organizationTaxNumber.labelErdpou')}
                    />

                    <InputField isCopy required name="organizationName" label={text('organizationName.label')} />
                  </div>

                  <div className="flex items-start gap-16">
                    <FileField
                      required
                      placeholderItalic
                      name="certificate"
                      accept=".pdf, .jpg, .jpeg, .png"
                      label={text('certificateOfRegister.label')}
                      placeholder={text('certificateOfRegister.downloadDoc')}
                    />

                    <DateField
                      required
                      placeholderItalic
                      name="dateOfRegistration"
                      label={text('dateOfRegisterOrganization.label')}
                      placeholder={text('dateOfRegisterOrganization.chooseDate')}
                    />
                  </div>
                </Accordion>

                <Accordion
                  initialState
                  classNameTitle="text-[20px]"
                  classNameChildren="flex flex-col gap-6"
                  title={text('title.contactInformation')}
                  changedLength={Object.keys(errors).length}
                >
                  <div className="flex items-start gap-16">
                    <InputField required name="position" label={text('positionOrganization.label')} />

                    <InputField required name="lastName" label={text('lastName.label')} />
                  </div>

                  <div className="flex items-start gap-16">
                    <InputField required name="firstName" label={text('name.label')} />

                    <InputField name="middleName" label={text('middleName.label')} />
                  </div>

                  <div className="flex items-start gap-16">
                    <InputField
                      required
                      isMasked
                      name="phone"
                      placeholderItalic
                      label={text('phone.label')}
                      placeholder="+38(0__)___-__-__"
                    />

                    <InputField isCopy required name="email" label={text('email.label')} />
                  </div>
                </Accordion>

                <Accordion
                  initialState
                  classNameWrapper="gap-0"
                  title={text('title.media')}
                  classNameTitle="text-[20px]"
                  changedLength={values?.social?.length}
                  classNameChildren="flex flex-col gap-6"
                >
                  <InputField cross name="site" wrapperClass="max-w-[465px]" label={text('site.label')} />

                  <FieldArray
                    name="social"
                    render={({ push, remove }) => (
                      <>
                        {values.social.map((_, index: number) => {
                          const isRightLength = values.social.length < 5;
                          const isLastIndex = index === values.social.length - 1;
                          const isMoreThanOne = values.social.length > 1;

                          return (
                            <div key={index}>
                              <InputField
                                cross
                                name={`social.${index}`}
                                wrapperClass="max-w-[465px]"
                                key={`media-signUp-${index}`}
                                label={text('socialNetworks.label')}
                              />
                              <div className="flex items-center justify-between max-w-[465px]">
                                {isRightLength && isLastIndex && (
                                  <SmallBtn
                                    type="add"
                                    text={btn('addField')}
                                    onClick={() => push('')}
                                    className="flex justify-start mt-3 w-full !leading-4"
                                  />
                                )}

                                {isMoreThanOne && (
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

                <div className="flex justify-end w-full gap-6">
                  <Button
                    type="button"
                    styleType="green"
                    text={btn('accept')}
                    className="uppercase"
                    onClick={() => setIsOpenAccept(true)}
                  />

                  <Button
                    type="button"
                    styleType="red"
                    text={btn('decline')}
                    className="uppercase"
                    onClick={() => setIsOpenDecline(true)}
                  />
                </div>
              </Form>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export { RequestsId };
