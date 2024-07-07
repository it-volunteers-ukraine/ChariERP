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
  const text = useTranslations('auth-page.organization');

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
          <Title className="mb-8 mx-auto w-fit text-[26px]" title={text('title.basicInformation')} />

          <div className="flex flex-col gap-6 tablet:gap-[34px] laptop:gap-[46px] desktop:gap-[34px]">
            <InputField
              required
              name="organizationName"
              label={text('organizationName.label')}
              info={
                <div>
                  {text('organizationName.info')}
                  <span className={styles.spanStyles}>{text('organizationName.infoItalic')}</span>
                </div>
              }
            />

            <InputField
              required
              type="number"
              name="organizationTaxNumber"
              wrapperClass="laptop:max-w-[calc(50%-12px)]"
              label={text('organizationTaxNumber.label')}
            />

            <FileField
              required
              maxSize={5}
              placeholderItalic
              name="certificateOfRegister"
              accept={'pdf, jpg, jpeg, png'}
              label={text('certificateOfRegister.label')}
              placeholder={text('certificateOfRegister.placeholder')}
              info={
                <div>
                  {text('certificateOfRegister.info')}
                  <Link href="#" className={`${styles.spanStyles} text-input-link underline`}>
                    {text('certificateOfRegister.link')}
                  </Link>
                </div>
              }
            />

            <DateField
              required
              placeholderItalic
              name="dateOfRegisterOrganization"
              wrapperClass="laptop:max-w-[calc(50%-12px)]"
              label={text('dateOfRegisterOrganization.label')}
              placeholder={text('dateOfRegisterOrganization.placeholder')}
            />
          </div>

          <Title className="mt-16 mb-8 mx-auto w-fit text-[26px]" title={text('title.contactInformation')} />

          <div className="flex flex-col gap-6 tablet:gap-[34px] laptop:gap-[46px] desktop:gap-[34px] mb-[36px] tablet:mb-[42px] ">
            <InputField
              required
              name="positionOrganization"
              label={text('positionOrganization.label')}
              info={<span className={`${styles.spanStyles}`}>{text('positionOrganization.infoItalic')}</span>}
            />

            <InputField
              required
              name="lastName"
              label={text('lastName.label')}
              wrapperClass="laptop:max-w-[calc(50%-12px)]"
            />

            <InputField required name="name" label={text('name.label')} wrapperClass="laptop:max-w-[calc(50%-12px)]" />

            <InputField
              required
              name="middleName"
              label={text('middleName.label')}
              wrapperClass="laptop:max-w-[calc(50%-12px)]"
            />

            <InputField
              required
              isMasked
              name="phone"
              placeholderItalic
              placeholder="+38(0__)___-__-__"
              label={text('phone.label')}
              info={<span className={`${styles.spanStyles}`}>{text('phone.infoItalic')}</span>}
            />

            <InputField required name="email" info={text('email.info')} label={text('email.label')} />
          </div>

          <div className="mb-6 w-fit font-medium text-[18px] leading-6 text-title-media">{text('title.media')}</div>

          <div className="flex flex-col gap-6 tablet:gap-[34px] laptop:gap-[46px] desktop:gap-[34px] mb-[22px]">
            <InputField
              cross
              name="site"
              label={text('site.label')}
              info={
                <div>
                  {text('site.info')}
                  <span className={`${styles.spanStyles}`}>{text('site.infoItalic')}</span>
                </div>
              }
            />

            {inputFields.map((name, index) => {
              return (
                <InputField
                  cross
                  name={name}
                  key={`media-signUp-${index}`}
                  label={text('socialNetworks.label')}
                  info={
                    <div>
                      {text('socialNetworks.info')}
                      <span className={`${styles.spanStyles}`}>{text('socialNetworks.infoItalic')}</span>
                    </div>
                  }
                />
              );
            })}
          </div>

          {inputFields.length < 5 && (
            <AddBtn
              onClick={addInputField}
              text={text('button.addNewInput')}
              className="justify-center mb-12 tablet:mb-[78px] desktop:mb-[86px]"
            />
          )}

          <CheckboxRadioField
            href="#"
            name="agree"
            label={text('checkbox.info')}
            hrefText={text('checkbox.link')}
            className="mb-16 laptop:mx-auto !items-start laptop:!items-center"
          />

          <Button type="submit" styleType="primary" className="uppercase m-auto" text={text('button.submit')} />
        </Form>
      )}
    </Formik>
  );
};

export default SignUp;
