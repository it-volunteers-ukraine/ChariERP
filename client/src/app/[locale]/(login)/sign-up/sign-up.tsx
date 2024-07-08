'use client';
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
  const error = useTranslations('validation');
  const text = useTranslations('auth-page.organization');

  const onSubmit = (values: FormikValues) => {
    console.log('data', values);
  };

  return (
    <Formik
      validateOnBlur
      validateOnChange
      onSubmit={onSubmit}
      initialValues={organizationInitialValues()}
      validationSchema={organizationValidation((key, params) => error(key, params))}
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
                    {text('organizationName.info')}
                    <span className={styles.spanStyles}>{text('organizationName.infoItalic')}</span>
                  </div>
                }
              />

              <InputField
                required
                type="number"
                name="organizationTaxNumber"
                label={text('organizationTaxNumber.label')}
                wrapperClass="laptop:max-w-[calc(50%-12px)]"
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
          </div>

          <div>
            <Title
              className="mb-8 tablet:mb-9 mx-auto w-fit text-[26px] uppercase"
              title={text('title.contactInformation')}
            />

            <div className="flex flex-col gap-8 tablet:gap-[42px]">
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

              <InputField
                required
                name="name"
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
                info={<span className={`${styles.spanStyles}`}>{text('phone.infoItalic')}</span>}
              />

              <InputField required name="email" info={text('email.info')} label={text('email.label')} />

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
                      {text('site.info')}
                      <span className={`${styles.spanStyles}`}>{text('site.infoItalic')}</span>
                    </div>
                  }
                />

                <FieldArray
                  name="socialNetworks"
                  render={({ push, remove }) => (
                    <>
                      {values.socialNetworks.map((_, index) => (
                        <div key={index}>
                          <InputField
                            cross
                            key={`media-signUp-${index}`}
                            name={`socialNetworks.${index}`}
                            label={text('socialNetworks.label')}
                            info={
                              <div>
                                {text('socialNetworks.info')}
                                <span className={`${styles.spanStyles}`}>{text('socialNetworks.infoItalic')}</span>
                              </div>
                            }
                          />
                          <div className="flex items-center justify-between max-w-[calc(50%-12px)]">
                            <div>
                              {values.socialNetworks.length < 5 && index === values.socialNetworks.length - 1 && (
                                <SmallBtn
                                  type="add"
                                  text={text('button.addNewInput')}
                                  onClick={() => push('')}
                                  className="flex justify-start mt-3 !leading-4"
                                />
                              )}
                            </div>

                            {index !== 0 && (
                              <SmallBtn
                                type="delete"
                                text={text('button.delete')}
                                onClick={() => remove(index)}
                                className="flex justify-end mt-3 !leading-4"
                              />
                            )}
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                />
              </div>
            </div>
          </div>

          <CheckboxRadioField
            href="#"
            name="agree"
            label={text('checkbox.info')}
            hrefText={text('checkbox.link')}
            className="laptop:mx-auto !items-start laptop:!items-center"
          />

          <Button type="submit" styleType="primary" className="uppercase m-auto" text={text('button.submit')} />
        </Form>
      )}
    </Formik>
  );
};

export default SignUp;
