'use client';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { FieldArray, Form, Formik, FormikValues } from 'formik';

import { organizationValidation, organizationInitialValues } from '@/formik-config';
import { Title, AddBtn, Button, DateField, FileField, InputField, CheckboxRadioField } from '@/components';

import { getStyles } from './styles';

const SignUp = () => {
  const styles = getStyles();

  const registration = useTranslations('auth-page.registration');
  const error = useTranslations('validation');

  const onSubmit = (values: FormikValues) => {
    console.log('data', values);
    console.log('value', values.socialNetworks);
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
              title={registration('title.basicInformation')}
            />

            <div className="flex flex-col gap-8 tablet:gap-[42px]">
              <InputField
                required
                name="organizationName"
                label={registration('organizationName.label')}
                info={
                  <div>
                    {registration('organizationName.info')}
                    <span className={styles.spanStyles}>{registration('organizationName.infoItalic')}</span>
                  </div>
                }
              />

              <InputField
                required
                type="number"
                name="organizationTaxNumber"
                wrapperClass="laptop:max-w-[calc(50%-12px)]"
                label={registration('organizationTaxNumber.label')}
              />

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
                    <Link href="#" className={`${styles.spanStyles} text-input-link underline`}>
                      {registration('certificateOfRegister.link')}
                    </Link>
                  </div>
                }
              />

              <DateField
                required
                placeholderItalic
                name="dateOfRegisterOrganization"
                wrapperClass="laptop:max-w-[calc(50%-12px)]"
                label={registration('dateOfRegisterOrganization.label')}
                placeholder={registration('dateOfRegisterOrganization.placeholder')}
              />
            </div>
          </div>

          <div>
            <Title
              className="mb-8 tablet:mb-9 mx-auto w-fit text-[26px] uppercase"
              title={registration('title.contactInformation')}
            />

            <div className="flex flex-col gap-8 tablet:gap-[42px]">
              <InputField
                required
                name="positionOrganization"
                label={registration('positionOrganization.label')}
                info={<span className={`${styles.spanStyles}`}>{registration('positionOrganization.infoItalic')}</span>}
              />

              <InputField
                required
                name="lastName"
                label={registration('lastName.label')}
                wrapperClass="laptop:max-w-[calc(50%-12px)]"
              />

              <InputField
                required
                name="name"
                label={registration('name.label')}
                wrapperClass="laptop:max-w-[calc(50%-12px)]"
              />

              <InputField
                required
                name="middleName"
                label={registration('middleName.label')}
                wrapperClass="laptop:max-w-[calc(50%-12px)]"
              />

              <InputField
                required
                isMasked
                name="phone"
                placeholderItalic
                placeholder="+38(0__)___-__-__"
                label={registration('phone.label')}
                info={<span className={`${styles.spanStyles}`}>{registration('phone.infoItalic')}</span>}
              />

              <InputField required name="email" info={registration('email.info')} label={registration('email.label')} />

              <div className="flex flex-col gap-8 tablet:gap-6">
                <Title
                  title={registration('title.media')}
                  className="w-fit font-medium text-[18px] !leading-4 !text-title-media"
                />

                <InputField
                  cross
                  name="site"
                  label={registration('site.label')}
                  info={
                    <div>
                      {registration('site.info')}
                      <span className={`${styles.spanStyles}`}>{registration('site.infoItalic')}</span>
                    </div>
                  }
                />

                <FieldArray
                  name="socialNetworks"
                  render={(arrayHelpers) => (
                    <>
                      {values.socialNetworks.map((_, index) => (
                        <div key={index}>
                          <InputField
                            cross
                            key={`media-signUp-${index}`}
                            name={`socialNetworks.${index}`}
                            label={registration('socialNetworks.label')}
                            info={
                              <div>
                                {registration('socialNetworks.info')}
                                <span className={`${styles.spanStyles}`}>
                                  {registration('socialNetworks.infoItalic')}
                                </span>
                              </div>
                            }
                          />
                          {/* <button type="button" onClick={() => arrayHelpers.remove(index)}>
                        delete
                      </button> */}
                        </div>
                      ))}

                      {values.socialNetworks.length < 5 && (
                        <AddBtn
                          onClick={() => arrayHelpers.push('')}
                          text={registration('button.addNewInput')}
                          className="justify-start !leading-4"
                        />
                      )}
                    </>
                  )}
                />
              </div>
            </div>
          </div>

          <CheckboxRadioField
            href="#"
            name="agree"
            label={registration('checkbox.info')}
            hrefText={registration('checkbox.link')}
            className="laptop:mx-auto !items-start laptop:!items-center"
          />

          <Button type="submit" styleType="primary" className="uppercase m-auto" text={registration('button.submit')} />
        </Form>
      )}
    </Formik>
  );
};

export default SignUp;
