'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AxiosError } from 'axios';
import { useTranslations } from 'next-intl';
import { FieldArray, Form, Formik, FormikHelpers, FormikValues } from 'formik';

import { ErrorResponse } from '@/types';
import { createOrganization } from '@/api';
import { BucketFolders, uploadFileToBucket } from '@/s3-bucket/s3-client';
import {
  Title,
  Button,
  SmallBtn,
  DateField,
  FileField,
  InputField,
  showMessage,
  CheckboxRadioField,
  OrganizationFormValues,
  organizationValidation,
  organizationInitialValues,
} from '@/components';

import { getStyles } from './styles';

const SignUp = () => {
  const styles = getStyles();
  const btn = useTranslations('button');
  const text = useTranslations('inputs');
  const error = useTranslations('validation');
  const create = useTranslations('auth-page');
  const errorText = useTranslations('errors.login');

  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = organizationValidation(error).omit(['avatar']);

  const onSubmit = async (values: FormikValues, handleFormik: FormikHelpers<OrganizationFormValues>) => {
    setIsLoading(true);

    const formData = new FormData();

    const { certificateOfRegister } = values;
    const uploadedFileUrl = await uploadFileToBucket(
      BucketFolders.CertificateOfRegister,
      certificateOfRegister as File,
    );

    formData.append(`certificate`, uploadedFileUrl!);

    Object.entries(values).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          formData.append(`${key}[]`, item);
        });
      } else if (value !== undefined && value !== null && key !== 'agree' && key !== 'declineReason') {
        formData.append(key, value);
      }
    });

    try {
      await createOrganization(formData);

      showMessage.success(create('createOrganization'));
      handleFormik.resetForm();
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;

      if (axiosError.response?.status === 400) {
        showMessage.error(errorText(axiosError.response.data.message));
      }
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
          <Button styleType="without-bg" text="button" />

          <div>
            <Title
              title={text('title.basicInformation')}
              className="mb-8 tablet:mb-9 mx-auto w-fit text-[26px] uppercase"
            />

            <div className="flex flex-col gap-8 tablet:gap-[42px]">
              <InputField
                required
                name="organizationName"
                label={text('organizationName.label')}
                info={
                  <span className={`${styles.spanStyles}`}>
                    {text('organizationName.information')}
                    <span
                      className={`${styles.spanStylesForExample}`}
                    >{` ${text('organizationName.forExample')}`}</span>
                  </span>
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
                  <span className={`${styles.spanStyles}`}>
                    {text('certificateOfRegister.information')}
                    <Link href="#" className={`${styles.spanStylesForExample} text-input-link underline`}>
                      {text('certificateOfRegister.howDownloadFile')}
                    </Link>
                  </span>
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
              title={text('title.contactInformation')}
              className="mb-8 tablet:mb-9 mx-auto w-fit text-[26px] uppercase"
            />

            <div className="flex flex-col gap-8 tablet:gap-[42px]">
              <InputField
                required
                name="position"
                label={text('positionOrganization.label')}
                info={
                  <span className={`${styles.spanStylesForExample}`}>{text('positionOrganization.forExample')}</span>
                }
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
                label={text('phone.label')}
                placeholder="+38(0__)___-__-__"
                info={<span className={`${styles.spanStylesForExample}`}>{text('phone.forExample')}</span>}
              />

              <InputField
                required
                name="email"
                label={text('email.label')}
                info={<span className={`${styles.spanStyles}`}>{text('email.information')}</span>}
              />

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
                    <span className={`${styles.spanStyles}`}>
                      {text('site.information')}
                      <br />
                      <span className={`${styles.spanStylesForExample}`}>
                        {text('site.forExample', { link: 'https://gozhivi.com.ua/' })}
                      </span>
                    </span>
                  }
                />

                <FieldArray
                  name="social"
                  render={({ push, remove }) => (
                    <>
                      {values.social.map((_, index) => {
                        const isRightLength = values.social.length < 5;
                        const isMoreThanOne = values.social.length > 1;
                        const isLastIndex = index === values.social.length - 1;

                        return (
                          <div key={index}>
                            <InputField
                              cross
                              name={`social.${index}`}
                              key={`media-signUp-${index}`}
                              label={text('socialNetworks.label')}
                              info={
                                <span className={`${styles.spanStyles}`}>
                                  {text('socialNetworks.information')}
                                  <br />
                                  <span className={`${styles.spanStylesForExample}`}>
                                    {text('socialNetworks.forExample', { link: 'https://www.facebook.com/gozhivi' })}
                                  </span>
                                </span>
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
