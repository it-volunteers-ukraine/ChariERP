/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Form, Formik, FormikValues } from 'formik';

import { Title } from '@/components/title';
import { Button, DateField, FileField, InputField } from '@/components';

import { initialValues, validationSchema } from './config';

import { getStyles } from './styles';
import { CheckboxRadioField } from '@/components/checkbox-radio-field';

const SignUp = () => {
  const [inputFields, setInputFields] = useState<string[]>(['socialNetworks']);

  const styles = getStyles();

  const registration = useTranslations('auth-page.registration');

  const onSubmit = (values: FormikValues) => {
    console.log(values);
  };

  const addInputField = () => {
    setInputFields([...inputFields, 'socialNetworks']);
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {() => (
        <Form className="w-full">
          <Title className="mb-8 mx-auto w-fit" title="основна інформація" />

          <div className={styles.inputWrapper}>
            <InputField
              required
              name="organizationName"
              info="Українською мовою (відповідно до Статуту)"
              infoAddl="Наприклад: Громадська організація «ЖИВИ»"
              label="Повна назва організації"
            />
          </div>

          <div className={`${styles.inputWrapper} laptop:w-[49%]`}>
            <InputField
              required
              name="organizationTaxNumber"
              label="ЄДРПОУ організації (податковий номер)"
            />
          </div>

          <div className={styles.inputWrapper}>
            <FileField
              required
              infoLinkRout="#"
              name="certificateOfRegister"
              infoLinkText=" Як завантажити файл."
              label="Довідка про внесення в реєстр"
              info=" Для завантаження документу натисніть на іконку скрепки або на
              поле “Завантажити файл”.Формат jpg, jpeg, png або pdf.
              Максимальний розмір 5 МБ."
            />
          </div>

          <div className={`${styles.inputWrapper} laptop:w-[49%]`}>
            <DateField
              required
              name="dateOfRegistrOrganization"
              label="Дата реєстрації організації"
              placeholder="Оберіть дату"
            />
          </div>

          <Title
            className="mt-16 mb-8 mx-auto w-fit"
            title="контактна інформація"
          />

          <div className={styles.inputWrapper}>
            <InputField
              required
              name="positionOrganization"
              label="Посада представника організації"
              infoAddl="Наприклад: Керівник, ВО, Бухгалтер і т.д."
            />
          </div>

          <div className={`${styles.inputWrapper} laptop:w-[49%]`}>
            <InputField required name="lastName" label="Прізвище" />
          </div>

          <div className={`${styles.inputWrapper} laptop:w-[49%]`}>
            <InputField required name="name" label="Ім'я" />
          </div>

          <div className={`${styles.inputWrapper} laptop:w-[49%]`}>
            <InputField required name="middleName" label="По батькові" />
          </div>

          <div className={styles.inputWrapper}>
            <InputField
              required
              isMasked
              name="phone"
              label="Телефон представника (з кодом міста)"
              infoAddl="Наприклад: +38(050)123-45-36 або +38(044)222-22-33"
            />
          </div>

          <div className={`${styles.inputWrapper} pb-[30px]`}>
            <InputField
              required
              name="email"
              label="Електронна скринька представника (e-mail)"
              info="Данна елетронна адреса скриньки буде логіном. Ви отримаєте листа на вказану електронну скриньку стосовно результатів обробки вашого запиту на реєстрацію."
            />
          </div>

          <div className="mb-6 w-fit font-medium text-[18px] leading-6 text-title-media">
            Медіа
          </div>

          <div className={styles.inputWrapper}>
            <InputField
              required
              name="site"
              label="Інтернет-сторінка організації (сайт)"
              info="Вкажіть веб-сайт організації. Наприклад: https://gozhivi.com.ua/"
            />
          </div>

          {inputFields.map((name, index) => {
            return (
              <div key={index} className={styles.inputWrapper}>
                <InputField
                  required
                  name={name}
                  label="Посилання на соц.мережу"
                  info="Додайте посилання на соціальні мережі (Facebook, Instagram, LinkedIn, TikTok, Youtube тощо). 
              Наприклад: https://www.facebook.com/gozhivi"
                />
              </div>
            );
          })}

          {inputFields.length < 5 && (
            <button
              onClick={addInputField}
              className="flex justify-center items-center mb-16 text-[15px] font-medium text-title-title pointer"
            >
              <span className="mr-[8px] text-[20px] font-medium">+</span>
              Додати ще посилання
            </button>
          )}

          <CheckboxRadioField
            name="agree"
            checked={false}
            className="mb-16"
            hrefText="Політикою конфіденційності"
            label={'Я погоджуюсь на обробку персональних даних згідно з '}
          />

          <Button
            type="submit"
            styleType="primary"
            className="uppercase m-auto"
            text={registration('button')}
          />
        </Form>
      )}
    </Formik>
  );
};

export default SignUp;
