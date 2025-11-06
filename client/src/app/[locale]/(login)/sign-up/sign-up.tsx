'use client';

import { KeyboardEvent, useState } from 'react';
import { useTranslations } from 'next-intl';
import { FieldArray, Form, Formik, FormikHelpers } from 'formik';
import logger from '@/utils/logger/logger';

import { routes } from '@/constants';
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
  const errorText = useTranslations('errors');

  const [email, setEmail] = useState('');
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
        setEmail(values.email);
        setIsOpenModal(true);
      }

      if (!data.success && data.message) {
        const messageArray = Array.isArray(data.message) ? data.message : [data.message];

        return showErrorMessageOfOrganizationExist(errorText, messageArray);
      }

      handleFormik.resetForm();
    } catch (error) {
      logger.error(error);

      showMessage.error(errorText('login.somethingWrong'), { autoClose: 2000 });
    } finally {
      setIsLoading(false);
    }
  };

  const onCloseModal = () => {
    setEmail('');
    setIsOpenModal(false);
  };

  const pressKeyboard = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!/^[0-9]*$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab') {
      e.preventDefault();
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
          <Form className="desktop:gap-18 tablet:gap-16 flex w-full flex-col gap-12">
            <ModalSuccessfulRegistration
              isOpen={isOpenModal}
              isLoading={isLoading}
              onClose={onCloseModal}
              onConfirm={onCloseModal}
              rightBtnText={btn('contact')}
              leftBtnText={btn('understood')}
              classNameBtn="w-[120px] uppercase"
              title={modal('successfulRegistration.title')}
              content={
                <p className="text-roboto text-comet text-center font-normal">
                  {modal('successfulRegistration.firstPartText')}
                  <span className="font-medium italic">{email}</span>
                  {modal('successfulRegistration.secondPartText')}
                </p>
              }
            />

            <div>
              <Title
                title={text('title.basicInformation')}
                className="font-scada tablet:mb-9 mx-auto mb-8 w-fit text-[26px] uppercase"
              />

              <div className="tablet:gap-[42px] flex flex-col gap-8">
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
                  onKeyDown={pressKeyboard}
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
                className="font-scada tablet:mb-9 mx-auto mb-8 w-fit text-[26px] uppercase"
              />

              <div className="tablet:gap-[42px] flex flex-col gap-8">
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

                <div className="tablet:gap-6 flex flex-col gap-8">
                  <Title
                    title={text('title.media')}
                    className="text-title-media! w-fit text-[18px] leading-4! font-medium"
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

                              <div className="laptop:max-w-[calc(50%-12px)] mt-6 flex items-center justify-between">
                                {isRightLength && isLastIndex && (
                                  <SmallBtn
                                    type="add"
                                    text={btn('addField')}
                                    onClick={() => push('')}
                                    className="flex justify-start leading-4!"
                                  />
                                )}

                                {isMoreThanOne && (
                                  <SmallBtn
                                    type="delete"
                                    text={btn('deleteField')}
                                    onClick={() => remove(index)}
                                    className={`flex ${isRightLength && isLastIndex ? 'justify-end' : 'ml-auto'} leading-4!`}
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
              name="agree"
              href={routes.privacyPolicy}
              label={text('checkbox.information')}
              hrefText={text('checkbox.privacyPolicy')}
              className="laptop:mx-auto laptop:items-center! items-start!"
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
