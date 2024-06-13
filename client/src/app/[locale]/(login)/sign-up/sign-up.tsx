/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Form, Formik, FormikValues } from 'formik';

import { Title } from '@/components/title';
import { CheckboxRadioField } from '@/components/checkbox-radio-field';
import { Button, DateField, FileField, InputField } from '@/components';

import { initialValues, validationSchema } from './config';

import { getStyles } from './styles';

const SignUp = () => {
  const [inputFields, setInputFields] = useState<string[]>(['socialNetworks']);

  const styles = getStyles();

  const registration = useTranslations('auth-page.registration');
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
      validationSchema={validationSchema((key, params) =>
        error(key as string, params),
      )}
    >
      {() => (
        <Form className="w-full">
          <Title
            className="mb-8 mx-auto w-fit"
            title={registration('title.basicInformation')}
          />

          <div className={styles.inputWrapper}>
            <InputField
              required
              name="organizationName"
              label={registration('organizationName.label')}
              info={
                <div>
                  {registration('organizationName.info')}
                  <span className={styles.spanStyles}>
                    {registration('organizationName.infoItalic')}
                  </span>
                </div>
              }
            />
          </div>

          <div className={`${styles.inputWrapper} laptop:w-[49%]`}>
            <InputField
              required
              type="number"
              name="organizationTaxNumber"
              label={registration('organizationTaxNumber.label')}
            />
          </div>

          <div className={styles.inputWrapper}>
            <FileField
              required
              maxSize={5}
              placeholderItalic
              name="certificateOfRegister"
              accept={'pdf, jpg, jpeg, png'}
              label={registration('certificateOfRegister.label')}
              placeholder={registration('certificateOfRegister.placeholder')}
              info={
                <div>
                  {registration('certificateOfRegister.info')}
                  <Link
                    href="#"
                    className={`${styles.spanStyles} text-input-link underline`}
                  >
                    {registration('certificateOfRegister.link')}
                  </Link>
                </div>
              }
            />
          </div>

          <div className={`${styles.inputWrapper} laptop:w-[49%]`}>
            <DateField
              required
              placeholderItalic
              name="dateOfRegisterOrganization"
              label={registration('dateOfRegisterOrganization.label')}
              placeholder={registration(
                'dateOfRegisterOrganization.placeholder',
              )}
            />
          </div>

          <Title
            className="mt-16 mb-8 mx-auto w-fit"
            title={registration('title.contactInformation')}
          />

          <div className={styles.inputWrapper}>
            <InputField
              required
              name="positionOrganization"
              label={registration('positionOrganization.label')}
              info={
                <span className={`${styles.spanStyles} italic`}>
                  {registration('positionOrganization.infoItalic')}
                </span>
              }
            />
          </div>

          <div className={`${styles.inputWrapper} laptop:w-[49%]`}>
            <InputField
              required
              name="lastName"
              label={registration('lastName.label')}
            />
          </div>

          <div className={`${styles.inputWrapper} laptop:w-[49%]`}>
            <InputField
              required
              name="name"
              label={registration('name.label')}
            />
          </div>

          <div className={`${styles.inputWrapper} laptop:w-[49%]`}>
            <InputField
              required
              name="middleName"
              label={registration('middleName.label')}
            />
          </div>

          <div className={styles.inputWrapper}>
            <InputField
              required
              isMasked
              name="phone"
              placeholderItalic
              placeholder="+38(0__)___-__-__"
              label={registration('phone.label')}
              info={
                <span className={`${styles.spanStyles} italic`}>
                  {registration('phone.infoItalic')}
                </span>
              }
            />
          </div>

          <div className={`${styles.inputWrapper} pb-[10px]`}>
            <InputField
              required
              name="email"
              info={registration('email.info')}
              label={registration('email.label')}
            />
          </div>

          <div className="mb-6 w-fit font-medium text-[18px] leading-6 text-title-media">
            {registration('title.media')}
          </div>

          <div className={styles.inputWrapper}>
            <InputField
              cross
              name="site"
              label={registration('site.label')}
              info={
                <div>
                  {registration('site.info')}
                  <span className={`${styles.spanStyles} italic`}>
                    {registration('site.infoItalic')}
                  </span>
                </div>
              }
            />
          </div>

          {inputFields.map((name, index) => {
            return (
              <div key={index} className={`${styles.inputWrapper} mb-0`}>
                <InputField
                  cross
                  name={name}
                  label={registration('socialNetworks.label')}
                  info={
                    <div>
                      {registration('socialNetworks.info')}
                      <span className={`${styles.spanStyles} italic`}>
                        {registration('socialNetworks.infoItalic')}
                      </span>
                    </div>
                  }
                />
              </div>
            );
          })}

          {inputFields.length < 5 && (
            <button
              type="button"
              onClick={addInputField}
              className="flex justify-center items-center mt-[-15px] mb-16 text-[15px] font-medium text-title-title pointer"
            >
              <span className="mr-[8px] text-[20px] font-medium">+</span>
              {registration('button.addNewInput')}
            </button>
          )}

          <CheckboxRadioField
            href="#"
            name="agree"
            label={registration('checkbox.info')}
            hrefText={registration('checkbox.link')}
            className="mb-16 laptop:mx-auto"
          />

          <Button
            type="submit"
            styleType="primary"
            text={registration('button.submit')}
            className="uppercase m-auto"
          />
        </Form>
      )}
    </Formik>
  );
};

export default SignUp;
