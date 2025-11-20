'use client';

import { useState } from 'react';
import { Form, Formik } from 'formik';

import { Warning } from '@/assets/icons';
import { Button } from '@/components/button';
import { FileField } from '@/components/file-field';
import { InputField } from '@/components/input-field';
import { DateComponent } from '@/components/date-picker';
import { InputTypeEnum } from '@/components/date-field/types';

import { Accordion } from '../accordion';
import { SelectField } from '../select-field';
import { IFormAddedItemsValues } from './type';
import { validationSchema } from './validation-schema';

const mock = [
  { id: '1', title: 'Material 1' },
  { id: '2', title: 'Material 2' },
  { id: '3', title: 'Material 3' },
];

const initialValues: IFormAddedItemsValues = {
  nameMaterial: '',
  category: '',
  unitMeasurement: '',
  storageLocation: '',
  storageFloor: '',
  originFinancing: '',
  financing: '',
  dateReceived: '',
  price: '',
  currency: '',
  photo: null,
  description: '',
};

export const FormAddedItems = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <section className="tablet:px-8 desktopXl:px-[272px] min-h-full px-4 pt-3">
      <Button text="+ Додати Матеріал" onClick={handleToggleAccordion} className="mb-6" />

      <Accordion isOpen={isOpen}>
        <Formik
          validateOnBlur
          validateOnChange
          enableReinitialize
          initialValues={initialValues}
          onSubmit={(values, { resetForm }) => {
            console.log('Formik values:', values);

            resetForm();
          }}
          validationSchema={validationSchema((key) => key)}
        >
          {({ values, errors, touched, setFieldValue, resetForm }) => {
            const borderError =
              touched.dateReceived && errors.dateReceived
                ? '[&>div>div>div>div]:border-red-500'
                : '[&>div>div>div>div]:border-arctic-sky';

            return (
              <>
                <Form className="flex max-w-[1532px] flex-col gap-6 rounded-2xl bg-white p-4">
                  <div className="tablet:flex-row tablet:flex-wrap tablet:gap-6 desktop:gap-10 mt-4 flex flex-col gap-4">
                    <SelectField
                      name="nameMaterial"
                      label="1.Назва матеріалу"
                      variant="with-add-options"
                      placeholder="--НЕ ВИЗНАЧЕНО--"
                      classNameWrapper="tablet:w-[300px]"
                      options={mock.map((item) => ({ id: item.id, value: item.title }))}
                    />
                    <SelectField
                      name="category"
                      label="2.Категорія"
                      variant="with-add-options"
                      placeholder="--НЕ ВИЗНАЧЕНО--"
                      classNameWrapper="tablet:w-[300px]"
                      options={mock.map((item) => ({ id: item.id, value: item.title }))}
                    />
                    <SelectField
                      name="unitMeasurement"
                      variant="with-add-options"
                      label="3.Одиниця вимірювання"
                      placeholder="--НЕ ВИЗНАЧЕНО--"
                      classNameWrapper="tablet:w-[300px]"
                      options={mock.map((item) => ({ id: item.id, value: item.title }))}
                    />
                    <SelectField
                      name="storageLocation"
                      label="4.Місце зберігання"
                      variant="with-add-options"
                      placeholder="--НЕ ВИЗНАЧЕНО--"
                      classNameWrapper="tablet:w-[300px]"
                      options={mock.map((item) => ({ id: item.id, value: item.title }))}
                    />
                    <SelectField
                      name="storageFloor"
                      variant="with-add-options"
                      label="5.Поверх зберігання"
                      placeholder="--НЕ ВИЗНАЧЕНО--"
                      classNameWrapper="tablet:w-[300px]"
                      options={mock.map((item) => ({ id: item.id, value: item.title }))}
                    />
                    <SelectField
                      label="6.Походження"
                      name="originFinancing"
                      variant="with-add-options"
                      placeholder="--НЕ ВИЗНАЧЕНО--"
                      classNameWrapper="tablet:w-[300px]"
                      options={mock.map((item) => ({ id: item.id, value: item.title }))}
                    />
                    <SelectField
                      name="financing"
                      label="7.Фінансування"
                      variant="with-add-options"
                      placeholder="--НЕ ВИЗНАЧЕНО--"
                      classNameWrapper="tablet:w-[300px]"
                      options={mock.map((item) => ({ id: item.id, value: item.title }))}
                    />
                    <div className={borderError}>
                      <label>8.Дата надходження</label>
                      <DateComponent
                        error="error"
                        name="dateReceived"
                        value={values.dateReceived}
                        placeholder="--НЕ ВИЗНАЧЕНО--"
                        inputType={InputTypeEnum.DATE_WITH_LABEL}
                        onChange={(date) => setFieldValue('dateReceived', date)}
                        inputClass="rounded-lg tablet:w-[300px] w-full hover:border-[#1D1B20] transition-all duration-300"
                      />
                      {touched.dateReceived && errors.dateReceived && (
                        <div className="mt-1 flex gap-1">
                          <Warning width={14} height={14} />

                          <span className="text-input-error text-[12px]/[14px]">{errors.dateReceived}</span>
                        </div>
                      )}
                    </div>

                    <div className="[&>div>label>fieldset]:border-arctic-sky [&>div>label>fieldset]:h-[42px] [&>div>label>fieldset]:rounded-lg [&>div>label>fieldset]:py-2">
                      <label>9.Вартість</label>
                      <InputField name="price" type="text" wrapperClass="tablet:w-[300px] w-full" />
                    </div>

                    <SelectField
                      name="currency"
                      label="10.Грошова одиниця"
                      variant="with-add-options"
                      placeholder="--НЕ ВИЗНАЧЕНО--"
                      classNameWrapper="tablet:w-[300px]"
                      options={mock.map((item) => ({ id: item.id, value: item.title }))}
                    />
                    <div className="[&>div>label>fieldset]:border-arctic-sky transition-all duration-300 hover:border-[#1D1B20] [&>div>label>fieldset]:h-[42px] [&>div>label>fieldset]:rounded-lg [&>div>label>fieldset]:py-2">
                      <label>11.Фото</label>
                      <FileField
                        required
                        name="photo"
                        placeholderItalic
                        accept=".pdf, .jpg, .jpeg, .png"
                        wrapperClass="tablet:w-[300px] w-full"
                      />
                    </div>
                    <div className="[&>div>label>fieldset]:border-arctic-sky [&>div>label>fieldset]:rounded-lg [&>div>label>fieldset]:p-2">
                      <label>12.Опис</label>
                      <InputField
                        rows={4}
                        isTextarea
                        name="description"
                        placeholder="Примітка"
                        wrapperClass="tablet:min-w-[640px] w-full rounded-lg "
                      />
                    </div>
                  </div>

                  <div className="flex justify-between gap-4">
                    <Button
                      type="button"
                      styleType="red"
                      text="СКАСУВАТИ"
                      onClick={() => resetForm()}
                      className="[&>button]:bg-white"
                    />
                    <Button text="ДОДАТИ" type="submit" />
                  </div>
                </Form>
              </>
            );
          }}
        </Formik>
      </Accordion>
    </section>
  );
};
