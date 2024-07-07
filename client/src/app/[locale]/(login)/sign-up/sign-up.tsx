'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Form, Formik, FormikValues } from 'formik';

import { organizationValidation, organizationInitialValues } from '@/formik-config';
import { Title, AddBtn, Button, DateField, FileField, InputField, CheckboxRadioField } from '@/components';

import { getStyles } from './styles';

const SignUp = () => {
  const [inputFields, setInputFields] = useState<string[]>(['socialNetworks']);

  const styles = getStyles();

  const error = useTranslations('validation');
  const organization = useTranslations('auth-page.organization');

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
      initialValues={organizationInitialValues()}
      validationSchema={organizationValidation((key, params) => error(key, params))}
    >
      {() => (
        <Form className="w-full">
          <Title className="mb-8 mx-auto w-fit text-[26px]" title={organization('title.basicInformation')} />

          <div className="flex flex-col gap-6 tablet:gap-[34px] laptop:gap-[46px] desktop:gap-[34px]">
            <InputField
              required
              name="organizationName"
              label={organization('organizationName.label')}
              info={
                <div>
                  {organization('organizationName.info')}
                  <span className={styles.spanStyles}>{organization('organizationName.infoItalic')}</span>
                </div>
              }
            />

            <InputField
              required
              type="number"
              name="organizationTaxNumber"
              wrapperClass="laptop:max-w-[calc(50%-12px)]"
              label={organization('organizationTaxNumber.label')}
            />

            <FileField
              required
              maxSize={5}
              placeholderItalic
              name="certificateOfRegister"
              accept={'pdf, jpg, jpeg, png'}
              label={organization('certificateOfRegister.label')}
              placeholder={organization('certificateOfRegister.placeholder')}
              info={
                <div>
                  {organization('certificateOfRegister.info')}
                  <Link href="#" className={`${styles.spanStyles} text-input-link underline`}>
                    {organization('certificateOfRegister.link')}
                  </Link>
                </div>
              }
            />

            <DateField
              required
              placeholderItalic
              name="dateOfRegisterOrganization"
              wrapperClass="laptop:max-w-[calc(50%-12px)]"
              label={organization('dateOfRegisterOrganization.label')}
              placeholder={organization('dateOfRegisterOrganization.placeholder')}
            />
          </div>

          <Title className="mt-16 mb-8 mx-auto w-fit text-[26px]" title={organization('title.contactInformation')} />

          <div className="flex flex-col gap-6 tablet:gap-[34px] laptop:gap-[46px] desktop:gap-[34px] mb-[36px] tablet:mb-[42px] ">
            <InputField
              required
              name="positionOrganization"
              label={organization('positionOrganization.label')}
              info={<span className={`${styles.spanStyles}`}>{organization('positionOrganization.infoItalic')}</span>}
            />

            <InputField
              required
              name="lastName"
              label={organization('lastName.label')}
              wrapperClass="laptop:max-w-[calc(50%-12px)]"
            />

            <InputField
              required
              name="name"
              label={organization('name.label')}
              wrapperClass="laptop:max-w-[calc(50%-12px)]"
            />

            <InputField
              required
              name="middleName"
              label={organization('middleName.label')}
              wrapperClass="laptop:max-w-[calc(50%-12px)]"
            />

            <InputField
              required
              isMasked
              name="phone"
              placeholderItalic
              placeholder="+38(0__)___-__-__"
              label={organization('phone.label')}
              info={<span className={`${styles.spanStyles}`}>{organization('phone.infoItalic')}</span>}
            />

            <InputField required name="email" info={organization('email.info')} label={organization('email.label')} />
          </div>

          <div className="mb-6 w-fit font-medium text-[18px] leading-6 text-title-media">
            {organization('title.media')}
          </div>

          <div className="flex flex-col gap-6 tablet:gap-[34px] laptop:gap-[46px] desktop:gap-[34px] mb-[22px]">
            <InputField
              cross
              name="site"
              label={organization('site.label')}
              info={
                <div>
                  {organization('site.info')}
                  <span className={`${styles.spanStyles}`}>{organization('site.infoItalic')}</span>
                </div>
              }
            />

            {inputFields.map((name, index) => {
              return (
                <InputField
                  cross
                  name={name}
                  key={`media-signUp-${index}`}
                  label={organization('socialNetworks.label')}
                  info={
                    <div>
                      {organization('socialNetworks.info')}
                      <span className={`${styles.spanStyles}`}>{organization('socialNetworks.infoItalic')}</span>
                    </div>
                  }
                />
              );
            })}
          </div>

          {inputFields.length < 5 && (
            <AddBtn
              onClick={addInputField}
              text={organization('button.addNewInput')}
              className="justify-center mb-12 tablet:mb-[78px] desktop:mb-[86px]"
            />
          )}

          <CheckboxRadioField
            href="#"
            name="agree"
            label={organization('checkbox.info')}
            hrefText={organization('checkbox.link')}
            className="mb-16 laptop:mx-auto !items-start laptop:!items-center"
          />

          <Button type="submit" styleType="primary" className="uppercase m-auto" text={organization('button.submit')} />
        </Form>
      )}
    </Formik>
  );
};

export default SignUp;
