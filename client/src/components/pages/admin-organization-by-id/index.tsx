'use client';

import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, useParams, usePathname } from 'next/navigation';
import { FieldArray, Form, Formik, FormikErrors, FormikValues } from 'formik';

import { routes } from '@/constants';
import { useLoaderAdminPage } from '@/context';
import { OrganizationEditValues, RequestOrganizationStatus } from '@/types';
import { oneOrganizationNormalizer, serializeOrganizationsUpdate, showErrorMessageOfOrganizationExist } from '@/utils';
import {
  deleteOrganizationAction,
  updateOrganizationAction,
  declineOrganizationAction,
  getOrganizationByIdAction,
} from '@/actions';
import {
  Button,
  SmallBtn,
  DateField,
  Accordion,
  FileField,
  InputField,
  ButtonIcon,
  ModalAdmin,
  showMessage,
  ModalDecline,
  organizationValidation,
  getInitialDataOrganization,
} from '@/components';

const AdminOrganizationById = () => {
  const router = useRouter();
  const { id } = useParams();
  const path = usePathname();

  const btn = useTranslations('button');
  const text = useTranslations('inputs');
  const modal = useTranslations('modal');
  const error = useTranslations('validation');
  const errorText = useTranslations('errors.login');
  const success = useTranslations('success.admin-pages');

  const isRequests = path?.includes(routes.requests);
  const isDeclined = path?.includes(routes.declined);
  const isOrganization = path?.includes(routes.organizations);

  const backPath = path.split('/').slice(0, -1).join('/');

  const { setIsLoading } = useLoaderAdminPage();
  const [isOpenSave, setIsOpenSave] = useState(false);
  const [isOpenAccept, setIsOpenAccept] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenDecline, setIsOpenDecline] = useState(false);
  const [isLoadingRequest, setIsLoadingRequest] = useState(false);
  const [data, setData] = useState<OrganizationEditValues | null>(null);

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

    const response = await updateOrganizationAction(id as string, formData);

    if (!response.success && Array.isArray(response.message)) {
      return showErrorMessageOfOrganizationExist(errorText, response.message);
    }

    if (response.success && response.organization) {
      showMessage.success(response.message);

      const parsedOrganization = JSON.parse(response.organization);

      setData(oneOrganizationNormalizer(parsedOrganization));
    }
  };

  const handleSave = async (values: OrganizationEditValues) => {
    try {
      setIsLoadingRequest(true);
      await onSave(values);
    } catch (error) {
      // TODO Connect error message
      console.log(error);
      showMessage.error('Some error in form');
    } finally {
      setIsLoadingRequest(false);
      setIsOpenSave(false);
    }
  };

  const onSubmitRemove = async () => {
    try {
      setIsLoadingRequest(true);
      const response = await deleteOrganizationAction(id as string);

      if (!response.success && response.message) {
        return showMessage.error(response.message);
      }

      showMessage.success(success('deleteOrganization'));
      router.push(backPath);
    } catch (error) {
      console.log(error);
    } finally {
      setIsOpenDelete(false);
      setIsLoadingRequest(false);
    }
  };

  const onSubmit = async (values: FormikValues) => {
    try {
      setIsLoadingRequest(true);

      await onSave(values as OrganizationEditValues, RequestOrganizationStatus.APPROVED);
      router.push(backPath);
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
      Object.values(errors).forEach((error) => {
        showMessage.error(error as string);
      });
    } else {
      handleSubmit();
    }
  };

  const onDecline = async (reason: string) => {
    try {
      setIsLoadingRequest(true);
      const response = await declineOrganizationAction(id as string, reason);

      if (!response.success && response.message) {
        showMessage.error(response.message);

        return;
      }

      showMessage.success(success('sentEmail', { email: data?.email }));
      router.push(backPath);
    } catch (error) {
      // TODO Connect error message
      console.log(error);
    } finally {
      setIsOpenDecline(false);
      setIsLoadingRequest(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <>
      <Formik
        validateOnBlur
        validateOnChange
        enableReinitialize
        onSubmit={onSubmit}
        initialValues={getInitialDataOrganization(data)}
        validationSchema={organizationValidation((key, params) => error(key, params)).omit(['agree', 'password'])}
      >
        {({ values, errors, validateForm, handleSubmit, touched }) => (
          <div className="relative w-full h-full bg-boardHeader">
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
                    {modal('register.text')} {data?.email}
                  </span>
                </div>
              }
            />

            <div className="flex justify-start mb-20 px-8 pb-12 bg-white rounded-lg shadow-dashboard">
              <div className="w-full max-w-[1066px] mx-auto">
                <div className="flex items-center justify-between mb-4 py-6 pr-2 border-b-2 border-lightBlue">
                  <div className="flex items-center gap-4">
                    <ButtonIcon icon="back" iconType="primary" onClick={() => router.back()} />

                    <ButtonIcon
                      icon="save"
                      iconType="primary"
                      onClick={() => setIsOpenSave(true)}
                      disabled={!touched || Object.keys(errors).length > 0}
                    />
                  </div>
                </div>

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
                    {(isRequests || isDeclined) && (
                      <Button
                        type="button"
                        styleType="green"
                        text={btn('accept')}
                        className="uppercase"
                        onClick={() => setIsOpenAccept(true)}
                      />
                    )}

                    {isRequests && (
                      <Button
                        type="button"
                        styleType="red"
                        className="uppercase"
                        text={btn('decline')}
                        onClick={() => setIsOpenDecline(true)}
                      />
                    )}

                    {(isDeclined || isOrganization) && (
                      <Button
                        type="button"
                        styleType="red"
                        className="uppercase"
                        text={btn('delete')}
                        onClick={() => setIsOpenDelete(true)}
                      />
                    )}
                  </div>
                </Form>
              </div>
            </div>
          </div>
        )}
      </Formik>

      {isOpenDecline && data && (
        <ModalDecline
          isOpen={isOpenDecline}
          onClose={setIsOpenDecline}
          onSubmitDecline={onDecline}
          isLoading={isLoadingRequest}
          organizationName={data?.organizationName}
        />
      )}

      {isOpenDelete && data && (
        <ModalAdmin
          isLoading={isLoadingRequest}
          isOpen={isOpenDelete}
          classNameBtn="w-[82px]"
          btnCancelText={btn('no')}
          onConfirm={onSubmitRemove}
          btnConfirmText={btn('yes')}
          title={modal('remove.title')}
          onClose={() => setIsOpenDelete(false)}
          content={
            <div className="flex flex-col gap-1 text-center text-mobster lending-6">
              <span>
                {modal('remove.text')} {data?.organizationName}
              </span>
            </div>
          }
        />
      )}
    </>
  );
};

export { AdminOrganizationById };
