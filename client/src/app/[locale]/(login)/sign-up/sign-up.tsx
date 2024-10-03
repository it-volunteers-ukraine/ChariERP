'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { FieldArray, Form, Formik, FormikHelpers } from 'formik';

import { OrganizationFormValues } from '@/types';
import { createOrganizationAction } from '@/actions';
import { serializeOrganizationsCreate, showErrorMessageOfOrganizationExist } from '@/utils';
import {
  Title,
  Button,
  SmallBtn,
  DateField,
  FileField,
  InputField,
  showMessage,
  CheckboxField,
  ModalSuccessfulRegistration,
} from '@/components';

import { getStyles } from './styles';
import { organizationInitialValues, organizationValidation } from './config';

const SignUp = () => {
  const styles = getStyles();
  const btn = useTranslations('button');
  const text = useTranslations('inputs');
  const modal = useTranslations('modal');
  const error = useTranslations('validation');
  const errorText = useTranslations('errors.login');

  const [isLoading, setIsLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

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
        setIsOpenModal(true);
      }

      if (!data.success && Array.isArray(data.message)) {
        return showErrorMessageOfOrganizationExist(errorText, data.message);
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
          <Form className="desktop:gap-18 flex w-full flex-col gap-12 tablet:gap-16">
            <ModalSuccessfulRegistration
              isOpen={isOpenModal}
              isLoading={isLoading}
              rightBtnText={btn('contact')}
              leftBtnText={btn('understood')}
              classNameBtn="w-[120px] uppercase"
              onClose={() => setIsOpenModal(false)}
              navigate={() => setIsOpenModal(false)}
              onConfirm={() => setIsOpenModal(false)}
              title={modal('successfulRegistration.title')}
              content={
                <p className="text-roboto text-center font-normal text-comet">
                  {modal('successfulRegistration.firstPartText')}
                  <span className="font-medium italic">{values.email}</span>
                  {modal('successfulRegistration.secondPartText')}
                </p>
              }
            />

            <div>
              <Title
                title={text('title.basicInformation')}
                className="mx-auto mb-8 w-fit font-scada text-[26px] uppercase tablet:mb-9"
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
                  info={<span className={`${styles.spanStyles}`}>{text('certificateOfRegister.information')}</span>}
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
                className="mx-auto mb-8 w-fit font-scada text-[26px] uppercase tablet:mb-9"
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
                    className="w-fit text-[18px] font-medium !leading-4 !text-title-media"
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
                                      {text('socialNetworks.forExample', {
                                        link: 'https://www.facebook.com/gozhivi',
                                      })}
                                    </span>
                                  </span>
                                }
                              />

                              <div className="mt-6 flex items-center justify-between laptop:max-w-[calc(50%-12px)]">
                                {isRightLength && isLastIndex && (
                                  <SmallBtn
                                    type="add"
                                    text={btn('addField')}
                                    onClick={() => push('')}
                                    className="flex justify-start !leading-4"
                                  />
                                )}

                                {isMoreThanOne && (
                                  <SmallBtn
                                    type="delete"
                                    text={btn('deleteField')}
                                    onClick={() => remove(index)}
                                    className={`flex ${isRightLength && isLastIndex ? 'justify-end' : 'ml-auto'} !leading-4`}
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

            <CheckboxField
              href="#"
              name="agree"
              label={text('checkbox.information')}
              hrefText={text('checkbox.privacyPolicy')}
              className="!items-start laptop:mx-auto laptop:!items-center"
            />

            <Button
              type="submit"
              styleType="primary"
              text={btn('submit')}
              isLoading={isLoading}
              className="m-auto uppercase"
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default SignUp;
