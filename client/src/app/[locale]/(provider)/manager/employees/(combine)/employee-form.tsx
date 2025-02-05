'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Form, Formik, FormikErrors, FormikValues } from 'formik';

import {
  Button,
  Accordion,
  DateField,
  ButtonIcon,
  InputField,
  ModalAdmin,
  AvatarField,
  showMessage,
  EmployeeCard,
  employeeValidation,
} from '@/components';
import { useUserInfo } from '@/context';

import { getStyles } from './styles';
import { IEditData, IEmployeeForm } from './types';

export const EmployeeForm = ({ isCreate, onSubmit, initialValues, isLoading }: IEmployeeForm) => {
  const router = useRouter();
  const locale = useLocale();
  const { isManager } = useUserInfo();

  const btn = useTranslations('button');
  const text = useTranslations('inputs');
  const modal = useTranslations('modal');
  const error = useTranslations('validation');

  const [isOpenSave, setIsOpenSave] = useState(false);

  const changeLocale = locale === 'ua' ? 'uk' : locale;

  const styles = getStyles(isCreate);

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
      validationSchema={!isCreate ? employeeValidation(error).omit(['password']) : employeeValidation(error)}
    >
      {({ values, validateForm, handleSubmit, setFieldValue, setValues }) => (
        <div className="scroll-blue w-full overflow-y-auto bg-white p-[24px_16px_48px] tablet:p-[24px_32px_48px] desktop:p-[32px_36px_48px]">
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

            <Form>
              {isCreate && (
                <div className="mb-6">
                  <AvatarField name="avatarUrl" info={text('avatar.information')} />
                </div>
              )}

              {!isCreate && (
                <>
                  <div className="flex items-center justify-start border-b-2 border-lightBlue pb-6">
                    <div className="flex w-fit items-center gap-4">
                      <ButtonIcon type="button" icon="back" iconType="primary" onClick={() => router.back()} />

                      <ButtonIcon type="button" icon="save" iconType="primary" onClick={() => setIsOpenSave(true)} />
                    </div>
                  </div>

                  <EmployeeCard
                    inById
                    id="123546789"
                    isStatusSelect
                    fieldName="status"
                    email={values.email}
                    classNameImg="!w-[92px]"
                    lastName={values.lastName}
                    position={values.position}
                    firstName={values.firstName}
                    setFieldValue={setFieldValue}
                    middleName={values.middleName}
                    status={(values as IEditData).status}
                    lastLogin={(values as IEditData).lastLogin}
                    className="!h-fit !items-center gap-[20px] !bg-white !p-[24px_0_32px] !shadow-none tablet:!flex-row tablet:gap-0 laptop:!gap-12 desktop:!py-8"
                  />
                </>
              )}

              <div className="flex flex-col gap-9 laptop:gap-12">
                <Accordion
                  initialState
                  classNameWrapper="!gap-3"
                  classNameTitle="text-[20px] uppercase"
                  title={text('title.basicInformation')}
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4 laptop:flex-row laptop:gap-12">
                      <InputField required name="lastName" label={text('lastName.label')} />

                      <InputField required name="firstName" label={text('name.label')} />
                    </div>

                    <div className="flex flex-col gap-4 laptop:flex-row laptop:gap-12">
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
                  </div>
                </Accordion>

                <Accordion
                  initialState
                  classNameWrapper="!gap-3"
                  classNameTitle="text-[20px] uppercase"
                  title={text('title.loginInformation')}
                >
                  <div className="flex flex-col gap-4 laptop:flex-row laptop:gap-12">
                    <InputField
                      required
                      name="email"
                      label={text('email.label')}
                      wrapperClass={`${!isCreate && 'laptop:max-w-[calc(50%-24px)]'}`}
                    />

                    {isCreate && <InputField required name="password" type="password" label={text('password.label')} />}
                  </div>
                </Accordion>

                <Accordion
                  initialState
                  classNameWrapper="!gap-3"
                  classNameTitle="text-[20px] uppercase"
                  title={text('title.additionalInformation')}
                >
                  <div className="box-border flex flex-col gap-3">
                    <div className="flex flex-col gap-4 laptop:flex-row laptop:gap-12">
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
                        lang={changeLocale}
                        label={text('notes.label')}
                        wrapperClass="laptop:max-w-[calc(50%-24px)]"
                        textAreaClass="!p-[0_4px_0_16px] mr-[6px] min-h-[183px] scroll-textarea !text-input-text resize-none  !overflow-y-scroll break-words hyphens-auto whitespace-pre-wrap"
                      />
                    </div>
                  </div>
                </Accordion>

                <div className={`${styles.btnWrapper}`}>
                  {!isCreate && (
                    <Button
                      type="button"
                      disabled={isManager}
                      className={styles.btn}
                      styleType="outline-blue"
                      text={btn('deleteEmployee')}
                    />
                  )}
                  <div className={`${styles.btnWrapper} w-full tablet:w-fit`}>
                    <Button
                      type="submit"
                      styleType="green"
                      isLoading={isLoading}
                      className={styles.btn}
                      text={isCreate ? btn('add') : btn('saveChanges')}
                    />
                    <Button
                      type="button"
                      styleType="red"
                      className={styles.btn}
                      onClick={() => setValues(initialValues)}
                      text={isCreate ? btn('cancel') : btn('cancelChanges')}
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
