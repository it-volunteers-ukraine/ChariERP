/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Form, Formik, FormikValues } from 'formik';

import { Title } from '@/components/title';
import { Button, DateField, FileField, InputField } from '@/components';

import { initialValues, validationSchema } from './config';

import { getStyles } from './styles';
import { CheckboxRadioField } from '@/components/checkbox-radio-field';
import Link from 'next/link';

const SignUp = () => {
  const [inputFields, setInputFields] = useState<string[]>(['socialNetworks']);

  const styles = getStyles();

  const title = useTranslations('auth-page.registration.title');
  const organizationName = useTranslations(
    'auth-page.registration.organizationName',
  );
  const organizationTaxNumber = useTranslations(
    'auth-page.registration.organizationTaxNumber',
  );
  const certificateOfRegister = useTranslations(
    'auth-page.registration.certificateOfRegister',
  );
  const dateOfRegistrOrganization = useTranslations(
    'auth-page.registration.dateOfRegistrOrganization',
  );
  const positionOrganization = useTranslations(
    'auth-page.registration.positionOrganization',
  );
  const lastName = useTranslations('auth-page.registration.lastName');
  const name = useTranslations('auth-page.registration.name');
  const middleName = useTranslations('auth-page.registration.middleName');
  const phone = useTranslations('auth-page.registration.phone');
  const email = useTranslations('auth-page.registration.email');
  const site = useTranslations('auth-page.registration.site');
  const socialNetworks = useTranslations(
    'auth-page.registration.socialNetworks',
  );
  const button = useTranslations('auth-page.registration.button');
  const checkbox = useTranslations('auth-page.registration.checkbox');

  const onSubmit = (values: FormikValues) => {
    console.log(values);
  };

  const addInputField = () => {
    setInputFields([...inputFields, 'socialNetworks']);
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {() => (
        <Form className="w-full">
          <Title
            className="mb-8 mx-auto w-fit"
            title={title('basicInformation')}
          />

          <div className={styles.inputWrapper}>
            <InputField
              required
              name="organizationName"
              label={organizationName('label')}
              info={
                <div>
                  {organizationName('info')}
                  <span className={styles.spanStyles}>
                    {organizationName('infoItalic')}
                  </span>
                </div>
              }
            />
          </div>

          <div className={`${styles.inputWrapper} laptop:w-[49%]`}>
            <InputField
              required
              name="organizationTaxNumber"
              label={organizationTaxNumber('label')}
            />
          </div>

          <div className={styles.inputWrapper}>
            <FileField
              required
              placeholderItalic
              name="certificateOfRegister"
              label={certificateOfRegister('label')}
              placeholder={certificateOfRegister('placeholder')}
              info={
                <div>
                  {certificateOfRegister('info')}
                  <Link
                    href="#"
                    className={`${styles.spanStyles} text-input-link underline`}
                  >
                    {certificateOfRegister('link')}
                  </Link>
                </div>
              }
            />
          </div>

          <div className={`${styles.inputWrapper} laptop:w-[49%]`}>
            <DateField
              required
              name="dateOfRegistrOrganization"
              label={dateOfRegistrOrganization('label')}
              placeholder={dateOfRegistrOrganization('placeholder')}
            />
          </div>

          <Title
            className="mt-16 mb-8 mx-auto w-fit"
            title={title('contactInformation')}
          />

          <div className={styles.inputWrapper}>
            <InputField
              required
              name="positionOrganization"
              label={positionOrganization('label')}
              info={
                <span className={`${styles.spanStyles} italic`}>
                  {positionOrganization('infoItalic')}
                </span>
              }
            />
          </div>

          <div className={`${styles.inputWrapper} laptop:w-[49%]`}>
            <InputField required name="lastName" label={lastName('label')} />
          </div>

          <div className={`${styles.inputWrapper} laptop:w-[49%]`}>
            <InputField required name="name" label={name('label')} />
          </div>

          <div className={`${styles.inputWrapper} laptop:w-[49%]`}>
            <InputField
              required
              name="middleName"
              label={middleName('label')}
            />
          </div>

          <div className={styles.inputWrapper}>
            <InputField
              required
              isMasked
              name="phone"
              label={phone('label')}
              placeholder="+38(0__)___-__-__"
              info={
                <span className={`${styles.spanStyles} italic`}>
                  {phone('infoItalic')}
                </span>
              }
            />
          </div>

          <div className={`${styles.inputWrapper} pb-[10px]`}>
            <InputField
              required
              name="email"
              label={email('label')}
              info={email('info')}
            />
          </div>

          <div className="mb-6 w-fit font-medium text-[18px] leading-6 text-title-media">
            {title('media')}
          </div>

          <div className={styles.inputWrapper}>
            <InputField
              required
              name="site"
              label={site('label')}
              info={
                <div>
                  {site('info')}
                  <span className={`${styles.spanStyles} italic`}>
                    {site('infoItalic')}
                  </span>
                </div>
              }
            />
          </div>

          {inputFields.map((name, index) => {
            return (
              <div key={index} className={`${styles.inputWrapper} mb-0`}>
                <InputField
                  required
                  name={name}
                  label={socialNetworks('label')}
                  info={
                    <div>
                      {socialNetworks('info')}
                      <span className={`${styles.spanStyles} italic`}>
                        {socialNetworks('infoItalic')}
                      </span>
                    </div>
                  }
                />
              </div>
            );
          })}

          {inputFields.length < 5 && (
            <button
              onClick={addInputField}
              className="flex justify-center items-center mt-[-15px] mb-16 text-[15px] font-medium text-title-title pointer"
            >
              <span className="mr-[8px] text-[20px] font-medium">+</span>
              {button('addNewInput')}
            </button>
          )}

          <CheckboxRadioField
            href="#"
            name="agree"
            checked={false}
            className="mb-16 laptop:mx-auto"
            label={checkbox('info')}
            hrefText={checkbox('link')}
          />

          <Button
            type="submit"
            styleType="primary"
            className="uppercase m-auto"
            text={button('submit')}
          />
        </Form>
      )}
    </Formik>
  );
};

export default SignUp;
