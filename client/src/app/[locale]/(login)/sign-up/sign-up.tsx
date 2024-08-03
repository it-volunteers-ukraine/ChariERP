'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { FieldArray, Form, Formik, FormikValues } from 'formik';

import {
  Title,
  SmallBtn,
  Button,
  DateField,
  FileField,
  InputField,
  CheckboxRadioField,
  organizationValidation,
  organizationInitialValues,
} from '@/components';

import { getStyles } from './styles';

const SignUp = () => {
  const styles = getStyles();
  const btn = useTranslations('button');
  const text = useTranslations('inputs');
  const error = useTranslations('validation');

  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = organizationValidation((key, params) => error(key, params));

  const onSubmit = (values: FormikValues) => {
    setIsLoading(true);

    try {
      console.log('data', values);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Formik
      validateOnBlur
      validateOnChange
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      initialValues={organizationInitialValues()}
    >
      {({ values }) => (
        <Form className="flex flex-col gap-12 tablet:gap-16 desktop:gap-18 w-full">
          <div>
            <Title
              className="mb-8 tablet:mb-9 mx-auto w-fit text-[26px] uppercase"
              title={text('title.basicInformation')}
            />

            <div className="flex flex-col gap-8 tablet:gap-[42px]">
              <InputField
                required
                name="organizationName"
                label={text('organizationName.label')}
                info={
                  <div>
                    {text('organizationName.information')}
                    <span className={styles.spanStyles}>{text('organizationName.forExample')}</span>
                  </div>
                }
              />

              <InputField
                required
                type="number"
                name="edrpou"
                wrapperClass="laptop:max-w-[calc(50%-12px)]"
                label={text('organizationTaxNumber.labelErdpouOfOrganization')}
              />

              <FileField
                placeholderItalic
                name="certificate"
                accept=".pdf, .jpg, .jpeg, .png"
                label={text('certificateOfRegister.label')}
                placeholder={text('certificateOfRegister.downloadDoc')}
                info={
                  <div>
                    {text('certificateOfRegister.information')}
                    <Link href="#" className={`${styles.spanStyles} text-input-link underline`}>
                      {text('certificateOfRegister.howDownloadFile')}
                    </Link>
                  </div>
                }
              />

              <DateField
                required
                placeholderItalic
                name="dateOfRegistration"
                wrapperClass="laptop:max-w-[calc(50%-12px)]"
                label={text('dateOfRegisterOrganization.label')}
                placeholder={text('dateOfRegisterOrganization.chooseDate')}
              />
            </div>
          </div>

          <div>
            <Title
              className="mb-8 tablet:mb-9 mx-auto w-fit text-[26px] uppercase"
              title={text('title.contactInformation')}
            />

            <div className="flex flex-col gap-8 tablet:gap-[42px]">
              <InputField
                required
                name="position"
                label={text('positionOrganization.label')}
                info={<span className={`${styles.spanStyles}`}>{text('positionOrganization.forExample')}</span>}
              />

              <InputField
                required
                name="lastName"
                label={text('lastName.label')}
                wrapperClass="laptop:max-w-[calc(50%-12px)]"
              />

              <InputField
                required
                name="firstName"
                label={text('name.label')}
                wrapperClass="laptop:max-w-[calc(50%-12px)]"
              />

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
                info={<span className={`${styles.spanStyles}`}>{text('phone.forExample')}</span>}
              />

              <InputField required name="email" info={text('email.information')} label={text('email.label')} />

              <div className="flex flex-col gap-8 tablet:gap-6">
                <Title
                  title={text('title.media')}
                  className="w-fit font-medium text-[18px] !leading-4 !text-title-media"
                />

                <InputField
                  cross
                  name="site"
                  label={text('site.label')}
                  info={
                    <div>
                      {text('site.information')}
                      <span className={`${styles.spanStyles}`}>
                        {text('site.forExample', { link: 'https://gozhivi.com.ua/' })}
                      </span>
                    </div>
                  }
                />

                <FieldArray
                  name="social"
                  render={({ push, remove }) => (
                    <>
                      {values.social.map((_, index) => {
                        const isRightLength = values.social.length < 5;
                        const isLastIndex = index === values.social.length - 1;
                        const isMoreThanOne = values.social.length > 1;

                        return (
                          <div key={index}>
                            <InputField
                              cross
                              name={`social.${index}`}
                              key={`media-signUp-${index}`}
                              label={text('socialNetworks.label')}
                              info={
                                <div>
                                  {text('socialNetworks.information')}
                                  <span className={`${styles.spanStyles}`}>
                                    {text('socialNetworks.forExample', { link: 'https://www.facebook.com/gozhivi' })}
                                  </span>
                                </div>
                              }
                            />
                            <div className="flex items-center justify-between max-w-[calc(50%-12px)]">
                              <div>
                                {isRightLength && isLastIndex && (
                                  <SmallBtn
                                    type="add"
                                    text={btn('addField')}
                                    onClick={() => push('')}
                                    className="flex justify-start mt-3 !leading-4"
                                  />
                                )}
                              </div>

                              {isMoreThanOne && (
                                <SmallBtn
                                  type="delete"
                                  text={btn('deleteField')}
                                  onClick={() => remove(index)}
                                  className="flex justify-end mt-3 !leading-4"
                                />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </>
                  )}
                />
              </div>
            </div>
          </div>

          <CheckboxRadioField
            href="#"
            name="agree"
            label={text('checkbox.information')}
            hrefText={text('checkbox.privacyPolicy')}
            className="laptop:mx-auto !items-start laptop:!items-center"
          />

          <Button
            type="submit"
            styleType="primary"
            text={btn('submit')}
            isLoading={isLoading}
            className="uppercase m-auto"
          />
        </Form>
      )}
    </Formik>
  );
};

export default SignUp;
