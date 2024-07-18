'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { FieldArray, Form, Formik, FormikValues } from 'formik';

import {
  Button,
  SmallBtn,
  DateField,
  Accordion,
  FileField,
  InputField,
  ButtonIcon,
  ModalAdmin,
  ModalContent,
  organizationValidation,
  organizationInitialValues,
} from '@/components';

const DashboardId = () => {
  const router = useRouter();
  const btn = useTranslations('button');
  const text = useTranslations('inputs');
  const modal = useTranslations('modal');
  const error = useTranslations('validation');

  const [isOpenSave, setIsOpenSave] = useState<boolean>(false);
  const [isOpenAccept, setIsOpenAccept] = useState<boolean>(false);
  const [isOpenDecline, setIsOpenDecline] = useState<boolean>(false);

  const onSubmit = (values: FormikValues) => {
    console.log('data', values);
    setIsOpenAccept(false);
    router.back();
  };

  return (
    <Formik
      validateOnBlur
      validateOnChange
      onSubmit={onSubmit}
      initialValues={organizationInitialValues()}
      validationSchema={organizationValidation((key, params) => error(key, params))}
    >
      {({ values, errors }) => (
        <div className="w-full h-full bg-boardHeader overflow-y-auto scroll-blue">
          <ModalAdmin
            isOpen={isOpenSave}
            onConfirm={() => {}}
            classNameBtn="w-[82px]"
            btnCancelText={btn('no')}
            title={modal('save.title')}
            btnConfirmText={btn('yes')}
            content={modal('save.text')}
            onClose={() => setIsOpenSave(false)}
          />

          <ModalAdmin
            isOpen={isOpenAccept}
            classNameBtn="w-[82px]"
            btnCancelText={btn('no')}
            btnConfirmText={btn('yes')}
            title={modal('register.title')}
            onConfirm={() => onSubmit(values)}
            onClose={() => setIsOpenAccept(false)}
            content={
              <div className="flex flex-col text-center text-mobster lending-6">
                <span>ГО Живи</span>
                <span>
                  {modal('register.text')} {'adshfg@mail.com'}
                </span>
              </div>
            }
          />

          <ModalAdmin
            onConfirm={() => {}}
            isOpen={isOpenDecline}
            classNameBtn="w-[82px]"
            btnCancelText={btn('no')}
            btnConfirmText={btn('yes')}
            title={modal('decline.title')}
            onClose={() => setIsOpenDecline(false)}
            content={<ModalContent name="declineReason" organizationName={'ГО Живи'} />}
          />

          <div className="flex justify-start mb-20 px-8 pb-12 bg-white rounded-lg shadow-dashboard">
            <div className="w-full desktop:mr-32">
              <div className="flex items-center justify-between mb-4 py-6 pr-2 border-b-2 border-lightBlue">
                <div className="flex items-center gap-4">
                  <ButtonIcon icon="back" iconType="primary" onClick={() => router.back()} />

                  <ButtonIcon icon="save" iconType="primary" onClick={() => setIsOpenSave(true)} />
                </div>

                <div className="text-[18px] text-lightBlue leading-6 capitalize">№2223</div>
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
                      wrapperClass="max-w-[140px]"
                      name="organizationTaxNumber"
                      label={text('organizationTaxNumber.labelErdpou')}
                    />

                    <InputField isCopy required name="organizationName" label={text('organizationName.label')} />
                  </div>

                  <div className="flex items-start gap-16">
                    <FileField
                      required
                      maxSize={5}
                      placeholderItalic
                      name="certificateOfRegister"
                      accept="pdf, jpg, jpeg, png"
                      label={text('certificateOfRegister.label')}
                      placeholder={text('certificateOfRegister.downloadDoc')}
                    />

                    <DateField
                      required
                      placeholderItalic
                      name="dateOfRegisterOrganization"
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
                    <InputField required name="positionOrganization" label={text('positionOrganization.label')} />

                    <InputField required name="lastName" label={text('lastName.label')} />
                  </div>

                  <div className="flex items-start gap-16">
                    <InputField required name="name" label={text('name.label')} />

                    <InputField required name="middleName" label={text('middleName.label')} />
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
                  classNameChildren="flex flex-col gap-6"
                  changedLength={values.socialNetworks.length}
                >
                  <InputField cross name="site" wrapperClass="max-w-[465px]" label={text('site.label')} />

                  <FieldArray
                    name="socialNetworks"
                    render={({ push, remove }) => (
                      <>
                        {values.socialNetworks.map((_, index) => {
                          const isRightLength = values.socialNetworks.length < 5;
                          const isLastIndex = index === values.socialNetworks.length - 1;
                          const isMoreThanOne = values.socialNetworks.length > 1;

                          return (
                            <div key={index}>
                              <InputField
                                cross
                                wrapperClass="max-w-[465px]"
                                key={`media-signUp-${index}`}
                                name={`socialNetworks.${index}`}
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

export { DashboardId };
