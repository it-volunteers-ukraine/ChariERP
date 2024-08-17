'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Form, Formik, FormikErrors, FormikValues } from 'formik';

import {
  Button,
  Accordion,
  DateField,
  InputField,
  ModalAdmin,
  showMessage,
  organizationValidation,
  organizationInitialValues,
  AvatarUploader,
} from '@/components';

const AddMember = () => {
  const btn = useTranslations('button');
  const text = useTranslations('inputs');
  const error = useTranslations('validation');
  const modal = useTranslations('modal.save');

  const [isOpenSave, setIsOpenSave] = useState<boolean>(false);

  const onSubmit = async (values: FormikValues) => console.log('data', values);

  const submitHandle = async (validateForm: () => Promise<FormikErrors<FormikValues>>, handleSubmit: () => void) => {
    const errors = await validateForm();

    if (Object.keys(errors).length > 0) {
      showMessage.error('Error');
      setIsOpenSave(false);
    } else {
      handleSubmit();
      showMessage.success('Save');
      setIsOpenSave(false);
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
        <div className="w-full bg-white overflow-y-auto scroll-blue">
          <div className="p-[0_16px_48px] tablet:p-[0_32px_48px] m-auto w-full desktopXl:max-w-[1100px]">
            <ModalAdmin
              isOpen={isOpenSave}
              title={modal('title')}
              content={modal('text')}
              classNameBtn="w-[82px]"
              btnCancelText={btn('no')}
              btnConfirmText={btn('yes')}
              onClose={() => setIsOpenSave(false)}
              onConfirm={() => submitHandle(validateForm, handleSubmit)}
            />

            <Form>
              <div className="mb-6">
                <AvatarUploader
                  name="avatar"
                  info={
                    'Додайте зображення або лишіть пустим і ми автоматично додамо перші літери Імені та прізвища. Макс розмір 5 Мб. Формат jpg, jpeg, png.'
                  }
                />
              </div>

              <div className="flex flex-col gap-9 desktop:gap-12">
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
                    <InputField required name="middleName" label={text('middleName.label')} />

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
                    name="positionOfMember"
                    label={text('positionOfMember.label')}
                    wrapperClass="!gap-12"
                    info={text('positionOfMember.information')}
                  />
                </Accordion>

                <Accordion
                  initialState
                  classNameWrapper="!gap-3"
                  classNameTitle="text-[20px] uppercase"
                  title={text('title.loginInformation')}
                  classNameChildren="flex flex-col laptop:flex-row laptop:gap-12"
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
                    textAreaClass="mr-2 min-h-[183px] scroll-textarea resize-none"
                  />
                </Accordion>

                <div className="flex flex-col tablet:flex-row items-center justify-center gap-3 tablet:gap-6">
                  <Button
                    type="submit"
                    styleType="green"
                    className="uppercase w-full tablet:w-fit"
                    text={btn('saveChanges')}
                    onClick={() => {
                      setIsOpenSave(true);
                    }}
                  />

                  <Button
                    className="uppercase w-full tablet:w-fit"
                    onClick={() => {}}
                    styleType="red"
                    text={btn('cancelChanges')}
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
