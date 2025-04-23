import { useState } from 'react';
import { Form, Formik } from 'formik';

import { Select } from '@/components/select';
import { DateField } from '@/components/date-field';
import { InputTypeEnum } from '@/components/date-field/types';
import { DateInputWithLabel } from '@/components/date-input-with-label';
import { ISelectOption } from '@/components/select/select-logic-wrapper/types';
import { ITaskResponse } from '@/types';

interface ITaskDetailsProps {
  task: ITaskResponse;
}

const mockOption = [
  {
    text: 'option1',
    value: 'option1',
  },
  {
    text: 'option2',
    value: 'option2',
  },
  {
    text: 'option3',
    value: 'option3',
  },
];

export const TaskDetails = ({ task }: ITaskDetailsProps) => {
  const initialValues = {
    status: '',
    dateEnd: task.dateEnd ? task.dateEnd : '',
    priority: '',
    dateStart: task.dateStart ? task.dateStart : '',
  };

  console.log(task);

  const [selected, setSelected] = useState<ISelectOption | undefined>();

  const handleSelect = (value: ISelectOption) => {
    const newSelected = mockOption.find((opt) => opt.value === value.value);

    if (newSelected) {
      setSelected(newSelected);
    }
  };

  return (
    <Formik validateOnBlur validateOnChange onSubmit={() => console.log('asdf')} initialValues={initialValues}>
      {({ values }) => {
        console.log(values);

        return (
          <Form className="flex w-full flex-col justify-between gap-y-5 md:flex-row md:gap-10 desktop:justify-between">
            <div className="flex w-full flex-col gap-5 md:ml-8 laptop:ml-0 desktop:max-w-[451px]">
              <div className="desktop:flex desktop:justify-between">
                <h4 className="mb-2 desktop:mb-0">Статус:</h4>
                <Select
                  name="status"
                  selected={selected}
                  options={mockOption}
                  onChange={handleSelect}
                  placeholder="НЕ ВИЗНАЧЕНО"
                  classNameWrapper="desktop:w-[291px]"
                />
              </div>
              <div className="desktop:flex desktop:justify-between">
                <h4 className="mb-2 desktop:mb-0">Пріоритет:</h4>
                <Select
                  options={mockOption}
                  selected={selected}
                  name="priority"
                  placeholder="НЕ ВИЗНАЧЕНО"
                  onChange={handleSelect}
                  classNameWrapper="desktop:w-[291px]"
                />
              </div>
            </div>
            <div className="flex w-full justify-between gap-5 md:flex-col md:gap-5 desktop:max-w-[451px]">
              <DateInputWithLabel label="Дата початку:">
                <DateField
                  name="dateStart"
                  label="dateStart"
                  wrapperClass="w-full desktop:w-[291px]"
                  placeholder="24.24.24"
                  inputClass="rounded-lg"
                  inputType={InputTypeEnum.DATE_WITH_LABEL}
                />
              </DateInputWithLabel>
              <DateInputWithLabel label="Дата закінчення:">
                <DateField
                  name="dateEnd"
                  label="dateEnd"
                  wrapperClass="w-full desktop:w-[291px]"
                  placeholder="24.24.24"
                  inputClass="rounded-lg"
                  inputType={InputTypeEnum.DATE_WITH_LABEL}
                />
              </DateInputWithLabel>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
