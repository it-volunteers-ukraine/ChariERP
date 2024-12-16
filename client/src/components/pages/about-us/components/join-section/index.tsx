import Image from 'next/image';
import { Form, Formik } from 'formik';
import { useTranslations } from 'next-intl';

import { bgJoin } from '@/assets/img';
import { useWindowWidth } from '@/hooks';
import { Title } from '@/components/title';
import { Button } from '@/components/button';
import { InputField } from '@/components/input-field';
import { CheckboxField } from '@/components/checkbox-field';

import { IJoinFormValues, joinInitialValues, joinValidation } from './config';

export const JoinSection = () => {
  const { isTablet } = useWindowWidth();
  const text = useTranslations('aboutUsPage');
  const error = useTranslations('validation');
  const privacyPolicy = useTranslations('inputs');

  const validationSchema = joinValidation(error);

  const onSubmit = (values: IJoinFormValues) => {
    console.log(values);
  };

  return (
    <section className="relative overflow-hidden">
      {isTablet && (
        <div className="absolute right-1/3 h-full w-[1440px] translate-x-2/4 laptop:right-2/4 desktop:w-full">
          <Image alt="bg" priority={true} src={bgJoin} className="h-full w-full object-cover" />
        </div>
      )}
      <div className="px-4 pb-16 tablet:mx-auto tablet:w-[486px] tablet:p-0 tablet:py-24 desktop:ml-[139px] desktop:w-[552px] desktopXl:ml-[240px]">
        <Formik onSubmit={onSubmit} validationSchema={validationSchema} initialValues={joinInitialValues}>
          {() => {
            return (
              <Form className="relative rounded-[24px] bg-white px-5 py-6">
                <Title
                  title={text('joinTitle')}
                  className="mb-4 text-center font-scada text-[24px] font-bold uppercase leading-7 tablet:text-[32px] tablet:leading-[38px] desktop:text-[36px] desktop:leading-[43px]"
                />
                <InputField wrapperClass="mb-6" required name="name" label={text('form.name')} />
                <InputField wrapperClass="mb-6" required name="email" label={text('form.email')} />
                <InputField wrapperClass="mb-6" name="telegram" label={text('form.telegram')} />
                <InputField
                  wrapperClass="mb-6"
                  isMasked
                  name="phone"
                  placeholderItalic
                  label={text('form.phone')}
                  placeholder="+38(0__)___-__-__"
                />
                <InputField
                  wrapperClass="mb-6"
                  isTextarea
                  name="message"
                  type="textarea"
                  label={text('form.message')}
                  textAreaClass="scroll-textarea !overflow-y-auto !text-input-text resize-none text-wrap h-[167px] w-full"
                />
                <CheckboxField
                  href="#"
                  name="agree"
                  label={privacyPolicy('checkbox.information')}
                  hrefText={privacyPolicy('checkbox.privacyPolicy')}
                  className="mb-6 !items-start laptop:mx-auto laptop:!items-center"
                />

                <Button type="submit" styleType="primary" text={text('form.join')} className="uppercase" />
              </Form>
            );
          }}
        </Formik>
      </div>
    </section>
  );
};
