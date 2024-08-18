'use client';

import { useTranslations } from 'next-intl';
import { Form, Formik, FormikErrors, FormikValues } from 'formik';

import {
  Button,
  Accordion,
  DateField,
  InputField,
  showMessage,
  AvatarField,
  organizationValidation,
  organizationInitialValues,
} from '@/components';

const AddMember = () => {
  const btn = useTranslations('button');
  const text = useTranslations('inputs');
  const error = useTranslations('validation');

  const onSubmit = async (values: FormikValues) => console.log('data', values);

  const submitHandle = async (validateForm: () => Promise<FormikErrors<FormikValues>>, handleSubmit: () => void) => {
    const errors = await validateForm();

    if (Object.keys(errors).length > 0) {
      showMessage.error('Error');
    } else {
      handleSubmit();
      showMessage.success('Save');
    }
  };

  return (
    <Formik
      validateOnBlur
      validateOnChange
      onSubmit={onSubmit}
      initialValues={organizationInitialValues()}
      validationSchema={organizationValidation(error).omit(['agree'])}
    >
      {({ errors, validateForm, handleSubmit }) => (
        <div className="p-[24px_16px_48px] tablet:p-[24px_32px_48px] desktop:p-[32px_36px_48px] w-full bg-white overflow-y-auto scroll-blue">
          <div className="m-auto w-full desktopXl:max-w-[1066px]">
            <Form>
              <div className="mb-6">
                <AvatarField name="avatar" info={text('avatar.information')} />
              </div>

              <div className="flex flex-col gap-9 laptop:gap-12">
                <Accordion
                  initialState
                  classNameWrapper="!gap-3"
                  classNameTitle="text-[20px] uppercase"
                  title={text('title.basicInformation')}
                  classNameChildren="flex flex-col gap-4"
                  changedLength={Object.keys(errors).length}
                >
                  <div className="flex flex-col laptop:flex-row gap-4 laptop:gap-12">
                    <InputField required name="lastName" label={text('lastName.label')} />

                    <InputField required name="firstName" label={text('name.label')} />
                  </div>

                  <div className="flex flex-col laptop:flex-row gap-4 laptop:gap-12">
                    <InputField name="middleName" label={text('middleName.label')} />

                    <InputField
                      required
                      isMasked
                      name="phone"
                      placeholderItalic
                      label={text('phone.label')}
                      placeholder="+38(0__)___-__-__"
                      wrapperClass="laptop:max-w-[calc(50%-24px)]"
                    />
                  </div>

                  <InputField
                    wrapperClass="gap-1 laptop:!gap-12"
                    name="positionOfMember"
                    label={text('positionOfMember.label')}
                    info={text('positionOfMember.information')}
                  />
                </Accordion>

                <Accordion
                  initialState
                  classNameWrapper="!gap-3"
                  classNameTitle="text-[20px] uppercase"
                  title={text('title.loginInformation')}
                  classNameChildren="flex flex-col gap-4 laptop:flex-row laptop:gap-12"
                >
                  <InputField required name="email" label={text('email.label')} />

                  <InputField required name="password" type="password" label={text('password.label')} />
                </Accordion>

                <Accordion
                  initialState
                  classNameWrapper="!gap-3"
                  title={text('title.AdditionalInformation')}
                  classNameTitle="text-[20px] uppercase"
                  changedLength={Object.keys(errors).length}
                  classNameChildren="flex flex-col gap-4 laptop:gap-12 laptop:flex-row"
                >
                  <div className="flex flex-col gap-4 laptop:w-[calc(50%-24px)]">
                    <DateField
                      placeholderItalic
                      name="dateOfBirth"
                      label={text('dateOfBirth.label')}
                      placeholder={text('dateOfRegisterOrganization.chooseDate')}
                    />

                    <DateField
                      placeholderItalic
                      name="dateOfEntry"
                      label={text('dateOfEntry.label')}
                      placeholder={text('dateOfRegisterOrganization.chooseDate')}
                    />

                    <InputField cross name="homeAddress" label={text('homeAddress.label')} />
                  </div>

                  <InputField
                    isTextarea
                    type="textarea"
                    name="textarea"
                    label={text('notes.label')}
                    wrapperClass="laptop:max-w-[calc(50%-24px)]"
                    textAreaClass="!p-[0_4px_0_16px] mr-[6px] min-h-[183px] scroll-textarea !text-input-text resize-none"
                  />
                </Accordion>

                <div className="flex flex-col tablet:flex-row items-center justify-end gap-3 tablet:gap-6">
                  <Button
                    type="submit"
                    styleType="green"
                    text={btn('add')}
                    className="uppercase w-full tablet:w-fit"
                    onClick={() => submitHandle(validateForm, handleSubmit)}
                  />

                  <Button
                    className="uppercase w-full tablet:w-fit"
                    onClick={() => {}}
                    styleType="red"
                    text={btn('cancel')}
                  />
                </div>
              </div>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default AddMember;
