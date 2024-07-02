'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { FieldArray, Form, Formik, FormikValues } from 'formik';

import { organizationValidation, organizationInitialValues } from '@/formik-config';
import { AddBtn, Button, DateField, Accordion, FileField, InputField, ButtonIcon, ModalAdmin } from '@/components';

import { ModalContent } from './components/modal-content';

const Edit = () => {
  const router = useRouter();
  const [isOpenSave, setIsOpenSave] = useState<boolean>(false);
  const [isOpenAccept, setIsOpenAccept] = useState<boolean>(false);
  const [isOpenDecline, setIsOpenDecline] = useState<boolean>(false);

  const error = useTranslations('validation');
  const text = useTranslations('auth-page.registration');
  const dashboard = useTranslations('auth-page.dashboard');

  const onSubmit = (values: FormikValues) => {
    console.log('data', values);
  };

  return (
    <Formik
      validateOnBlur
      validateOnChange
      onSubmit={onSubmit}
      initialValues={organizationInitialValues()}
      validationSchema={organizationValidation((key, params) => error(key, params))}
    >
      {({ values }) => (
        <Form className="w-full h-full bg-boardHeader">
          <ModalAdmin
            isOpen={isOpenSave}
            onConfirm={() => {}}
            onClose={() => setIsOpenSave(false)}
            title={dashboard('modal.title.save')}
            content={dashboard('modal.text.save')}
            btnCancelText={dashboard('modal.btn.no')}
            btnConfirmText={dashboard('modal.btn.yes')}
          />

          <ModalAdmin
            isOpen={isOpenAccept}
            onConfirm={() => {}}
            onClose={() => setIsOpenAccept(false)}
            title={dashboard('modal.title.register')}
            btnCancelText={dashboard('modal.btn.no')}
            btnConfirmText={dashboard('modal.btn.yes')}
            content={
              <div className="flex flex-col text-center text-mobster lending-6">
                <span>ГО Живи</span>
                <span>
                  {dashboard('modal.text.register')} {' adshfg@mail.com'}
                </span>
              </div>
            }
          />

          <ModalAdmin
            onConfirm={() => {}}
            isOpen={isOpenDecline}
            onClose={() => setIsOpenDecline(false)}
            title={dashboard('modal.title.reject.title')}
            btnCancelText={dashboard('modal.btn.decline')}
            btnConfirmText={dashboard('modal.btn.accept')}
            content={<ModalContent name="rejectReason" organizationName={'ГО Живи'} />}
          />

          <div className="flex justify-start px-8 pb-12 bg-white rounded-lg shadow-bg">
            <div className="w-[994px]">
              <div className="flex items-center justify-between mb-4 py-6 pr-2 border-b-2 border-lightBlue">
                <div className="flex items-center gap-4">
                  <ButtonIcon icon="back" iconType="primary" onClick={() => router.back()} />

                  <ButtonIcon icon="save" iconType="primary" onClick={() => setIsOpenSave(true)} />
                </div>

                <div className="text-[18px] text-lightBlue leading-6 capitalize">№2223</div>
              </div>

              <div className="flex flex-col gap-12">
                <Accordion
                  initialState
                  classNameTitle="text-[20px]"
                  title={text('title.basicInformation')}
                  classNameChildren="flex flex-col gap-6"
                >
                  <div className="flex items-center gap-6">
                    <InputField
                      isCopy
                      required
                      type="number"
                      wrapperClass="max-w-[140px]"
                      name="organizationTaxNumber"
                      label={dashboard('organizationTaxNumber.label')}
                    />

                    <InputField isCopy required name="organizationName" label={text('organizationName.label')} />
                  </div>

                  <div className="flex items-center gap-16">
                    <FileField
                      required
                      maxSize={5}
                      placeholderItalic
                      name="certificateOfRegister"
                      accept="pdf, jpg, jpeg, png"
                      label={text('certificateOfRegister.label')}
                      placeholder={text('certificateOfRegister.placeholder')}
                    />

                    <DateField
                      required
                      placeholderItalic
                      name="dateOfRegisterOrganization"
                      label={text('dateOfRegisterOrganization.label')}
                      placeholder={text('dateOfRegisterOrganization.placeholder')}
                    />
                  </div>
                </Accordion>

                <Accordion
                  initialState
                  classNameTitle="text-[20px]"
                  classNameChildren="flex flex-col gap-6"
                  title={text('title.contactInformation')}
                >
                  <div className="flex items-center gap-16">
                    <InputField required name="positionOrganization" label={text('positionOrganization.label')} />

                    <InputField required name="lastName" label={text('lastName.label')} />
                  </div>

                  <div className="flex items-center gap-16">
                    <InputField required name="name" label={text('name.label')} />

                    <InputField required name="middleName" label={text('middleName.label')} />
                  </div>

                  <div className="flex items-center gap-16">
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
                >
                  <InputField cross name="site" wrapperClass="mb-6 max-w-[465px]" label={text('site.label')} />

                  <FieldArray
                    name="socialNetworks"
                    render={(arrayHelpers) => (
                      <>
                        {values.socialNetworks.map((_, index) => (
                          <div key={index}>
                            <InputField
                              cross
                              key={`media-signUp-${index}`}
                              name={`socialNetworks.${index}`}
                              label={text('socialNetworks.label')}
                              wrapperClass={
                                index === values.socialNetworks.length - 1 ? 'max-w-[465px]' : 'mb-6 max-w-[465px]'
                              }
                            />
                            {/* <button type="button" onClick={() => arrayHelpers.remove(index)}>
                        delete
                      </button> */}
                          </div>
                        ))}

                        {values.socialNetworks.length < 5 && (
                          <AddBtn
                            onClick={() => arrayHelpers.push('')}
                            text={text('button.addNewInput')}
                            className="justify-start mt-3 !leading-4"
                          />
                        )}
                      </>
                    )}
                  />
                </Accordion>

                <div className="flex justify-end w-full gap-6">
                  <Button text="Accept" styleType="green" className="w-[90px]" onClick={() => setIsOpenAccept(true)} />

                  <Button
                    type="submit"
                    text="Decline"
                    styleType="red"
                    className="w-[90px]"
                    onClick={() => setIsOpenDecline(true)}
                  />
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Edit;
