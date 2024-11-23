import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { Form, Formik, FormikHelpers } from 'formik';

import { sendEmail } from '@/services';
import { Button, InputField, showMessage } from '@/components';

import { emailData, InitialValues } from './config';
import { ValidationSchema } from './validationSchema';

type InitialValuesType = typeof InitialValues;

export const FeedbackForm = () => {
  const error = useTranslations('validation');
  const contactPageTranslation = useTranslations('contactPageTranslation');
  const feedbackForm = useTranslations('contactPageTranslation.feedbackForm');

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: InitialValuesType, { resetForm }: FormikHelpers<InitialValuesType>) => {
    setIsLoading(true);

    try {
      await sendEmail(emailData(values));
      showMessage.success(feedbackForm('successfully'));
      resetForm();
    } catch (error) {
      console.error(error);
      showMessage.error(feedbackForm('error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Formik onSubmit={handleSubmit} initialValues={InitialValues} validationSchema={ValidationSchema(error)}>
      <Form className="m-auto bg-white px-2 py-4 shadow-md tablet:max-w-[605px] tablet:px-12 tablet:py-10 laptop:max-w-[800px] desktop:max-w-[588px] desktop:px-10 desktop:py-8 desktopXl:px-28 desktopXl:py-10">
        <div className="m-auto mb-8 max-w-[342px] tablet:max-w-[456px] laptop:max-w-[622px] desktop:max-w-[456px] desktopXl:max-w-[642px]">
          <h2 className="pointer-events-none m-auto mb-6 select-none text-center font-scada text-2xl font-bold uppercase tablet:text-[32px]">
            {contactPageTranslation('feedback')}
          </h2>

          <h3 className="pointer-events-none select-none text-center font-scada font-bold tablet:text-lg">
            {contactPageTranslation('feedbackMessage')}
          </h3>
        </div>
        <div className="flex flex-col gap-y-8">
          <InputField required name="surname" label={feedbackForm('labelSurname')} />

          <InputField required name="name" label={feedbackForm('labelName')} />

          <InputField
            required
            name="email"
            placeholderItalic
            label={feedbackForm('labelEmail')}
            placeholder="exampleemail@gmail.com"
          />

          <InputField
            required
            isMasked
            name="phone"
            placeholderItalic
            placeholder="+38(0__)___-__-__"
            label={feedbackForm('labelPhone')}
          />

          <InputField
            isTextarea
            name="message"
            type="textarea"
            label={feedbackForm('labelTextarea')}
            textAreaClass=" min-h-[280px] tablet:min-h-[188px] scroll-textarea !text-input-text resize-none text-wrap"
          />

          <Button
            type="submit"
            styleType="primary"
            isLoading={isLoading}
            className="m-auto uppercase"
            text={feedbackForm('buttonSubmit')}
          />
        </div>
      </Form>
    </Formik>
  );
};
