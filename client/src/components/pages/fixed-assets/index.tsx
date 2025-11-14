'use client';

import { Button, MaterialTable } from '@/components';
import { Accordion } from './componens/accordion';
import { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { SelectFactory } from '@/components/custom-select/fabric';
import { Roles } from '@/types';

const mock = [
  { id: '1', title: 'Material 1' },
  { id: '2', title: 'Material 2' },
  { id: '3', title: 'Material 3' },
];

export const FixedAssetsPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <Button text="+ Додати Матеріал" onClick={handleToggleAccordion} />

      {/* Зовнішній Select */}
      <SelectFactory
        name="asd"
        role={Roles.MANAGER}
        isLoading={false}
        classNameWrapper="desktop:w-[300px]"
        variant="with-add-options"
        onChange={(value) => value.value.toString()}
        selected={{ id: mock[0].id, value: mock[0].title }}
        options={mock.map((item) => ({ id: item.id, value: item.title }))}
      />

      <Accordion isOpen={isOpen}>
        <Formik
          initialValues={{ name: '', asd: mock[0].id }} // <- дефолтне значення
          onSubmit={(values) => console.log(values)}
        >
          {({ values }) => (
            <Form>
              <Field name="asd">
                {({ form }: any) => (
                  <SelectFactory
                    name="asd"
                    role={Roles.MANAGER}
                    isLoading={false}
                    classNameWrapper="desktop:w-[300px]"
                    variant="with-add-options"
                    options={mock.map((item) => ({ id: item.id, value: item.title }))}
                    selected={{
                      id: values.asd,
                      value: mock.find((m) => m.id === values.asd)?.title || '',
                    }}
                    onChange={(option) => form.setFieldValue('asd', option.id)}
                  />
                )}
              </Field>
            </Form>
          )}
        </Formik>
      </Accordion>

      <MaterialTable />
    </div>
  );
};
