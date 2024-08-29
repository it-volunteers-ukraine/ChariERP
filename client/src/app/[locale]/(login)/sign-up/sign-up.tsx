'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { FieldArray, Form, Formik, FormikHelpers } from 'formik';

import { OrganizationFormValues } from '@/types';
import { createOrganizationAction } from '@/actions';
import { serializeOrganizationsCreate } from '@/utils';
import {
  Title,
  Button,
  SmallBtn,
  DateField,
  FileField,
  InputField,
  showMessage,
  CheckboxRadioField,
} from '@/components';

import { getStyles } from './styles';
import { organizationInitialValues, organizationValidation } from './config';

const SignUp = () => {
  const styles = getStyles();
  const btn = useTranslations('button');
  const text = useTranslations('inputs');
  const error = useTranslations('validation');
  const create = useTranslations('auth-page');
  const errorText = useTranslations('errors.login');

  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = organizationValidation(error);

  const onSubmit = async (values: OrganizationFormValues, handleFormik: FormikHelpers<OrganizationFormValues>) => {
    setIsLoading(true);

    const formData = new FormData();

    const { file, data } = serializeOrganizationsCreate(values);

    formData.append('certificate', file);
    formData.append('data', JSON.stringify(data));

    try {
      const data = await createOrganizationAction(formData);

      if (data.success) {
        showMessage.success(create('createOrganization'));
      }

      if (!data.success) {
        return showMessage.error(errorText(data.message), { autoClose: 5000 });
      }

      handleFormik.resetForm();
    } catch (error) {
      console.log(error);

      showMessage.error(errorText('somethingWrong'), { autoClose: 2000 });
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
      initialValues={organizationInitialValues}
    >
      {({ values }) => {
        return (
          <Form className="flex flex-col gap-12 tablet:gap-16 desktop:gap-18 w-full">
            <div>
              <Title
                title={text('title.basicInformation')}
                className="font-scada mb-8 tablet:mb-9 mx-auto w-fit text-[26px] uppercase"
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
                  required
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
                className="font-scada mb-8 tablet:mb-9 mx-auto w-fit text-[26px] uppercase"
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
        );
      }}
    </Formik>
  );
};

export default SignUp;
