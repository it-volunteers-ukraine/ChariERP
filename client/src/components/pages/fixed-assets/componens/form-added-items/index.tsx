'use client';

import { Button } from '@/components/button';

import { useState } from 'react';
import { Form, Formik } from 'formik';
import { Accordion } from '../accordion';
import { SelectField } from '../select-field';
import { DateInputWithLabel } from '@/components/date-input-with-label';
import { DateComponent } from '@/components/date-picker';
import { InputTypeEnum } from '@/components/date-field/types';
import { InputField } from '@/components/input-field';
import { FileField } from '@/components/file-field';

const mock = [
  { id: '1', title: 'Material 1' },
  { id: '2', title: 'Material 2' },
  { id: '3', title: 'Material 3' },
];

const initialValues = {
  mat1: '',
  mat2: '',
  mat3: '',
  mat4: '',
  mat5: '',
  mat6: '',
  mat7: '',
  dateReceived: '',
  price: '',
  mat8: '',
  comments: '',
  certificate: null,
};

export const FormAddedItems = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <section className="min-h-full px-4 pt-3 tablet:px-8 desktopXl:px-[272px]">
      <Button text="+ Додати Матеріал" onClick={handleToggleAccordion} />

      <Accordion isOpen={isOpen}>
        <Formik
          validateOnBlur
          validateOnChange
          enableReinitialize
          initialValues={initialValues}
          onSubmit={(values) => console.log('Formik values:', values)}
          validationSchema={null}
        >
          {({ values, setFieldValue, resetForm }) => (
            <>
              <Form className="mt-4 flex flex-col gap-4 rounded-2xl bg-white p-4">
                <SelectField
                  name="mat1"
                  label="Матеріал"
                  options={mock.map((item) => ({ id: item.id, value: item.title }))}
                  variant="with-add-options"
                  classNameWrapper="desktop:w-[300px]"
                />
                <SelectField
                  name="mat2"
                  label="Матеріал"
                  options={mock.map((item) => ({ id: item.id, value: item.title }))}
                  variant="with-add-options"
                  classNameWrapper="desktop:w-[300px]"
                />
                <SelectField
                  name="mat3"
                  label="Матеріал"
                  placeholder="--НЕ ВИЗНАЧЕНО--"
                  options={mock.map((item) => ({ id: item.id, value: item.title }))}
                  variant="with-add-options"
                  classNameWrapper="desktop:w-[300px]"
                />
                <SelectField
                  name="mat4"
                  label="Матеріал"
                  options={mock.map((item) => ({ id: item.id, value: item.title }))}
                  variant="with-add-options"
                  classNameWrapper="desktop:w-[300px]"
                />
                <SelectField
                  name="mat5"
                  label="Матеріал"
                  options={mock.map((item) => ({ id: item.id, value: item.title }))}
                  variant="with-add-options"
                  classNameWrapper="desktop:w-[300px]"
                />
                <SelectField
                  name="mat6"
                  label="Матеріал"
                  options={mock.map((item) => ({ id: item.id, value: item.title }))}
                  variant="with-add-options"
                  classNameWrapper="desktop:w-[300px]"
                />
                <SelectField
                  name="mat7"
                  label="Матеріал"
                  options={mock.map((item) => ({ id: item.id, value: item.title }))}
                  variant="with-add-options"
                  classNameWrapper="desktop:w-[300px]"
                />
                <DateInputWithLabel label={'Дата надходження'} isLoading={false}>
                  <DateComponent
                    name="dateReceived"
                    placeholder="24.24.24"
                    value={values.dateReceived}
                    inputClass="rounded-lg"
                    inputType={InputTypeEnum.DATE_WITH_LABEL}
                    onChange={(date) => setFieldValue('dateReceived', date)}
                  />
                </DateInputWithLabel>
                <div className="h-10">
                  <label>PRIce</label>
                  <InputField name="price" type="text" className="!h-10" />
                </div>

                <SelectField
                  name="mat8"
                  label="Матеріал"
                  options={mock.map((item) => ({ id: item.id, value: item.title }))}
                  variant="with-add-options"
                  classNameWrapper="desktop:w-[300px]"
                />
                <div>
                  <label>file</label>
                  <FileField
                    required
                    placeholderItalic
                    name="certificate"
                    accept=".pdf, .jpg, .jpeg, .png"
                    label={'certificateOfRegister.label'}
                    placeholder={'certificateOfRegister.downloadDoc'}
                  />
                </div>
                <div>
                  <label>isTextarea</label>
                  <InputField name="comments" isTextarea rows={4} />
                </div>

                <div>
                  <Button styleType="red" type="button" text="Close" onClick={() => resetForm()} />
                  <Button text="Submit" type="submit" />
                </div>
              </Form>
            </>
          )}
        </Formik>
      </Accordion>
    </section>
  );
};
