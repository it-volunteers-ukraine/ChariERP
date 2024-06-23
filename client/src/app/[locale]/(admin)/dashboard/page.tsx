'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Form, Formik, FormikValues } from 'formik';

import { AddBtn } from '@/components/add-button';
import {
  Button,
  DateField,
  FileField,
  InputField,
  ButtonIcon,
  ModalAdmin,
} from '@/components';

import { initialValues, validationSchema } from './config';
import { Accordion } from '@/components/accordion';
import { CheckboxRadioField } from '@/components/checkbox-radio-field';

const Dashboard = () => {
  const [inputFields, setInputFields] = useState<string[]>(['socialNetworks']);
  const [isOpenSave, setIsOpenSave] = useState<boolean>(false);
  const [isOpenAccept, setIsOpenAccept] = useState<boolean>(false);
  const [isOpenDecline, setIsOpenDecline] = useState<boolean>(false);
  const router = useRouter();

  const error = useTranslations('validation');
  const text = useTranslations('auth-page.registration');
  const dashboard = useTranslations('auth-page.dashboard');

  const onSubmit = (values: FormikValues) => {
    console.log('data', values);
  };

  const addInputField = () => {
    setInputFields([...inputFields, 'socialNetworks']);
  };

  return (
    <Formik
      validateOnBlur
      validateOnChange
      onSubmit={onSubmit}
      initialValues={initialValues()}
      validationSchema={validationSchema((key, params) => error(key, params))}
    >
      {() => (
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
            content={
              <div>
                <div className="flex flex-col gap-4 mb-1">
                  <div className="flex flex-col text-center text-mobster lending-6">
                    <span>ГО Живи</span>
                    <span>{dashboard('modal.title.reject.subTitle')}</span>
                  </div>

                  <CheckboxRadioField
                    type="radio"
                    name={'adsf'}
                    className="p-2"
                    classNameText="text-mobster"
                    label={dashboard('modal.radioBtn.notValidUSREOU')}
                  />

                  <CheckboxRadioField
                    type="radio"
                    name={'hg'}
                    className="p-2"
                    classNameText="text-mobster"
                    label={dashboard('modal.radioBtn.InsufficientDocuments')}
                  />

                  <CheckboxRadioField
                    type="radio"
                    name={'uyt'}
                    className="p-2"
                    classNameText="text-mobster"
                    label={dashboard('modal.radioBtn.nonCompliance')}
                  />

                  <CheckboxRadioField
                    type="radio"
                    name={'345'}
                    className="p-2"
                    classNameText="text-mobster"
                    label={dashboard('modal.radioBtn.other')}
                  />
                </div>

                <div className="px-3">
                  <div className="p-[20px] border rounded-md border-lightBlue text-mobster italic">
                    {dashboard('modal.text.reject')}
                  </div>
                </div>
              </div>
            }
          />

          <div className="flex justify-start px-8 pb-12 bg-white rounded-lg shadow-bg">
            <div className="w-[994px]">
              <div className="flex items-center justify-between mb-4 py-6 pr-2 border-b-2 border-lightBlue">
                <div className="flex items-center gap-4">
                  <ButtonIcon
                    icon={'back'}
                    iconType={'primary'}
                    onClick={() => router.back()}
                  />

                  <ButtonIcon
                    icon={'save'}
                    iconType={'primary'}
                    onClick={() => setIsOpenSave(true)}
                  />
                </div>

                <div className="text-[18px] text-lightBlue leading-6 capitalize">
                  №2223
                </div>
              </div>

              <div className="flex flex-col gap-12">
                <Accordion
                  initialState={true}
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

                    <InputField
                      isCopy
                      required
                      name="organizationName"
                      label={text('organizationName.label')}
                    />
                  </div>

                  <div className="flex items-center gap-16">
                    <FileField
                      required
                      maxSize={5}
                      placeholderItalic
                      name="certificateOfRegister"
                      accept={'pdf, jpg, jpeg, png'}
                      label={text('certificateOfRegister.label')}
                      placeholder={text('certificateOfRegister.placeholder')}
                    />

                    <DateField
                      required
                      placeholderItalic
                      name="dateOfRegisterOrganization"
                      label={text('dateOfRegisterOrganization.label')}
                      placeholder={text(
                        'dateOfRegisterOrganization.placeholder',
                      )}
                    />
                  </div>
                </Accordion>

                <Accordion
                  initialState={true}
                  classNameTitle="text-[20px]"
                  classNameChildren="flex flex-col gap-6"
                  title={text('title.contactInformation')}
                >
                  <div className="flex items-center gap-16">
                    <InputField
                      required
                      name="positionOrganization"
                      label={text('positionOrganization.label')}
                    />

                    <InputField
                      required
                      name="lastName"
                      label={text('lastName.label')}
                    />
                  </div>

                  <div className="flex items-center gap-16">
                    <InputField
                      required
                      name="name"
                      label={text('name.label')}
                    />

                    <InputField
                      required
                      name="middleName"
                      label={text('middleName.label')}
                    />
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

                    <InputField
                      isCopy
                      required
                      name="email"
                      label={text('email.label')}
                    />
                  </div>
                </Accordion>

                <Accordion
                  initialState={true}
                  classNameWrapper="gap-0"
                  title={text('title.media')}
                  classNameTitle="text-[20px]"
                >
                  <InputField
                    cross
                    name="site"
                    wrapperClass="mb-6 max-w-[465px]"
                    label={text('site.label')}
                  />

                  {inputFields.map((name, index) => (
                    <InputField
                      cross
                      name={name}
                      key={`media-signUp-${index}`}
                      label={text('socialNetworks.label')}
                      wrapperClass={
                        index === inputFields.length - 1
                          ? 'max-w-[465px]'
                          : 'mb-6 max-w-[465px]'
                      }
                    />
                  ))}

                  {inputFields.length < 5 && (
                    <AddBtn
                      onClick={addInputField}
                      text={text('button.addNewInput')}
                      className="flex justify-start py-2 leading-4"
                    />
                  )}
                </Accordion>

                <div className="flex justify-end w-full gap-6">
                  <Button
                    text="Accept"
                    styleType="green"
                    className="w-[90px]"
                    onClick={() => setIsOpenAccept(true)}
                  />

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

export default Dashboard;
