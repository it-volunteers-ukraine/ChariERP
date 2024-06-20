'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Form, Formik, FormikValues } from 'formik';

import { ArrowUp } from '@/assets/icons';
import { Title } from '@/components/title';
import { AddBtn } from '@/components/add-button';
import {
  Button,
  ButtonIcon,
  DateField,
  FileField,
  InputField,
} from '@/components';

import { initialValues, validationSchema } from './config';

const Dashboard = () => {
  const [inputFields, setInputFields] = useState<string[]>(['socialNetworks']);
  const text = useTranslations('auth-page.registration');
  const error = useTranslations('validation');

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
      initialValues={initialValues}
      validationSchema={validationSchema((key, params) => error(key, params))}
    >
      {() => (
        <Form className="w-full h-full bg-boardHeader">
          <div className="flex justify-start px-8 pb-12 bg-white rounded-lg shadow-bg">
            <div className="w-[994px]">
              <div className="flex items-center justify-between mb-4 py-6 pr-2 border-b-2 border-lightBlue">
                <div className="flex items-center gap-4">
                  <ButtonIcon icon={'back'} iconType={'primary'} />
                  <ButtonIcon icon={'save'} iconType={'primary'} />
                </div>

                <div className="text-[18px] text-lightBlue leading-6 capitalize">
                  №2223
                </div>
              </div>

              <div className="flex flex-col gap-12">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-start">
                    <Title title="основна інформація" className="text-[20px]" />
                    <div className="p-[6px]">
                      <ArrowUp />
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <InputField
                      isCopy
                      type="number"
                      wrapperClass="max-w-[140px]"
                      name="organizationTaxNumber"
                      label={'SDFDF'}
                    />

                    <InputField
                      isCopy
                      name="organizationName"
                      label={text('organizationName.label')}
                    />
                  </div>

                  <div className="flex items-center gap-16">
                    <FileField
                      maxSize={5}
                      placeholderItalic
                      name="certificateOfRegister"
                      accept={'pdf, jpg, jpeg, png'}
                      label={text('certificateOfRegister.label')}
                      placeholder={text('certificateOfRegister.placeholder')}
                    />

                    <DateField
                      placeholderItalic
                      name="dateOfRegisterOrganization"
                      label={text('dateOfRegisterOrganization.label')}
                      placeholder={text(
                        'dateOfRegisterOrganization.placeholder',
                      )}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-start">
                    <Title title="основна інформація" className="text-[20px]" />
                    <div className="p-[6px]">
                      <ArrowUp />
                    </div>
                  </div>

                  <div className="flex items-center gap-16">
                    <InputField
                      name="positionOrganization"
                      label={text('positionOrganization.label')}
                    />

                    <InputField
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
                      placeholder="+38(0__)___-__-__"
                      label={text('phone.label')}
                    />

                    <InputField
                      isCopy
                      required
                      name="email"
                      label={text('email.label')}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-start">
                    <Title title="media" className="text-[20px]" />
                    <div className="p-[6px]">
                      <ArrowUp />
                    </div>
                  </div>

                  <InputField
                    cross
                    name="site"
                    wrapperClass="w-[465px]"
                    label={text('site.label')}
                  />

                  {inputFields.map((name, index) => (
                    <InputField
                      cross
                      name={name}
                      key={`media-signUp-${index}`}
                      label={text('socialNetworks.label')}
                      wrapperClass="w-[465px]"
                    />
                  ))}

                  {inputFields.length < 5 && (
                    <AddBtn
                      onClick={addInputField}
                      className="flex justify-start"
                      text={text('button.addNewInput')}
                    />
                  )}

                  <div className="flex justify-end w-full gap-6">
                    <Button
                      text="Accept"
                      styleType="green"
                      className="w-[90px]"
                    />
                    <Button
                      text="Decline"
                      styleType="red"
                      className="w-[90px]"
                    />
                  </div>
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
