'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Form, Formik, FormikErrors, FormikValues } from 'formik';

import {
  Button,
  Accordion,
  DateField,
  InputField,
  ModalAdmin,
  ButtonIcon,
  showMessage,
  AvatarField,
  EmployeeCard,
  employeeValidation,
} from '@/components';

import { getStyles } from './styles';
import { IEditData, IEmployeeForm } from './types';

export const EmployeeForm = ({ isCreate, onSubmit, initialValues }: IEmployeeForm) => {
  const router = useRouter();
  const styles = getStyles(isCreate);
  const btn = useTranslations('button');
  const text = useTranslations('inputs');
  const modal = useTranslations('modal');
  const error = useTranslations('validation');

  const [isOpenSave, setIsOpenSave] = useState(false);
  const [isOpenCancel, setIsOpenCancel] = useState(false);

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
      enableReinitialize
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={employeeValidation(error).omit(['password'])}
    >
      {({ values, errors, validateForm, handleSubmit, setFieldValue }) => (
        <div className="p-[24px_16px_48px] tablet:p-[24px_32px_48px] desktop:p-[32px_36px_48px] w-full bg-white overflow-y-auto scroll-blue">
          <div className="m-auto w-full desktopXl:max-w-[1066px]">
            <ModalAdmin
              isOpen={isOpenSave}
              classNameBtn="w-[82px]"
              btnCancelText={btn('no')}
              title={modal('save.title')}
              btnConfirmText={btn('yes')}
              content={modal('save.text')}
              onClose={() => setIsOpenSave(false)}
              onConfirm={() => submitHandle(validateForm, handleSubmit)}
            />

            <ModalAdmin
              isOpen={isOpenCancel}
              classNameBtn="w-[82px]"
              btnCancelText={btn('no')}
              btnConfirmText={btn('yes')}
              title={modal('remove.title')}
              onClose={() => setIsOpenCancel(false)}
              onConfirm={() => submitHandle(validateForm, handleSubmit)}
            />

            <Form>
              {isCreate ? (
                <div className="mb-6">
                  <AvatarField name="avatarUrl" info={text('avatar.information')} />
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-start pb-6 border-b-2 border-lightBlue">
                    <div className="flex items-center gap-4 w-fit">
                      <ButtonIcon icon="back" iconType="primary" onClick={() => router.back()} />

                      <ButtonIcon icon="save" iconType="primary" onClick={() => setIsOpenSave(true)} />
                    </div>
                  </div>

                  <EmployeeCard
                    id="123546789"
                    isStatusSelect
                    fieldName="status"
                    email={values.email}
                    name={values.firstName}
                    classNameImg="!w-[92px]"
                    surname={values.lastName}
                    jobTitle={values.position}
                    setFieldValue={setFieldValue}
                    patronymic={values.middleName}
                    status={(initialValues as IEditData).status}
                    lastSession={(initialValues as IEditData).lastLogin}
                    className="tablet:!flex-row !items-center gap-[20px] tablet:gap-0 laptop:!gap-12 !p-[24px_0_32px] desktop:!py-8 !h-fit !bg-white !shadow-none"
                  />
                </>
              )}

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
                    name="position"
                    label={text('positionOfMember.label')}
                    info={isCreate && text('positionOfMember.information')}
                    wrapperClass={`${!isCreate && 'laptop:max-w-[calc(50%-24px)]'} gap-1 laptop:!gap-12`}
                  />
                </Accordion>

                <Accordion
                  initialState
                  classNameWrapper="!gap-3"
                  classNameTitle="text-[20px] uppercase"
                  title={text('title.loginInformation')}
                  classNameChildren="flex flex-col gap-4 laptop:flex-row laptop:gap-12"
                >
                  <InputField
                    required
                    name="email"
                    label={text('email.label')}
                    wrapperClass={`${!isCreate && 'laptop:max-w-[calc(50%-24px)]'}`}
                  />

                  {isCreate && <InputField required name="password" type="password" label={text('password.label')} />}
                </Accordion>

                <Accordion
                  initialState
                  classNameWrapper="!gap-3"
                  title={text('title.additionalInformation')}
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

                    <InputField cross name="address" label={text('homeAddress.label')} />
                  </div>

                  <InputField
                    isTextarea
                    name="notes"
                    type="textarea"
                    label={text('notes.label')}
                    wrapperClass="laptop:max-w-[calc(50%-24px)]"
                    textAreaClass="!p-[0_4px_0_16px] mr-[6px] min-h-[183px] scroll-textarea !text-input-text resize-none"
                  />
                </Accordion>

                <div className={`${styles.btnWrapper}`}>
                  {!isCreate && <Button styleType="outline-blue" text={btn('deleteEmployee')} className={styles.btn} />}

                  <div className={`${styles.btnWrapper} w-full tablet:w-fit`}>
                    <Button
                      type="submit"
                      styleType="green"
                      className={styles.btn}
                      text={isCreate ? btn('add') : btn('saveChanges')}
                      onClick={() => (isCreate ? submitHandle(validateForm, handleSubmit) : setIsOpenSave(!isOpenSave))}
                    />

                    <Button
                      styleType="red"
                      className={styles.btn}
                      text={isCreate ? btn('cancel') : btn('cancelChanges')}
                      onClick={() => !isCreate && setIsOpenCancel(!isOpenCancel)}
                    />
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};
