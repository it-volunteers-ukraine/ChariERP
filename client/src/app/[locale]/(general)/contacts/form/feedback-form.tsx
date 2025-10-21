import { useState } from 'react';
import { useTranslations } from 'next-intl';
import logger from '@/utils/logger/logger';

import { Form, Formik, FormikHelpers } from 'formik';

import { routes } from '@/constants';
import { sendEmail } from '@/services';
import { Button, CheckboxField, InputField, showMessage } from '@/components';

import { emailData, InitialValues } from './config';
import { ValidationSchema } from './validationSchema';

type InitialValuesType = typeof InitialValues;

export const FeedbackForm = () => {
  const text = useTranslations('inputs');
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
      logger.error(error);
      showMessage.error(feedbackForm('error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Formik onSubmit={handleSubmit} initialValues={InitialValues} validationSchema={ValidationSchema(error)}>
      <Form className="m-auto bg-white px-2 py-4 shadow-md tablet:w-[605px] tablet:px-12 tablet:py-10 laptop:w-[800px] desktop:w-[588px] desktop:px-10 desktop:py-8 desktopXl:w-[738px] desktopXl:px-12 desktopXl:py-10">
        <div className="m-auto mb-8 max-w-[342px] tablet:mb-12 tablet:max-w-[456px] laptop:max-w-[622px] desktop:max-w-[456px] desktopXl:max-w-[642px]">
          <h2 className="pointer-events-none m-auto mb-6 select-none text-center font-scada text-2xl font-bold uppercase tablet:text-[32px]">
            {contactPageTranslation('feedback')}
          </h2>

          <h3 className="pointer-events-none m-auto max-w-[456px] select-none text-center font-scada font-bold leading-[22px] text-newBlack tablet:text-[18px] tablet:leading-[22px]">
            {contactPageTranslation('feedbackMessage')}
          </h3>
        </div>
        <div className="flex flex-col gap-y-8 laptop:gap-y-12 desktop:gap-y-8 desktopXl:px-[66px]">
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
            textAreaClass="h-[240px] tablet:h-[148px] scroll-textarea !text-input-text resize-none text-wrap"
          />

          <CheckboxField
            name="agree"
            href={routes.privacyPolicy}
            label={text('checkbox.information')}
            hrefText={text('checkbox.privacyPolicy')}
            className="!items-start laptop:mx-auto laptop:!items-center"
          />

          <Button
            type="submit"
            styleType="primary"
            isLoading={isLoading}
            className="m-auto mt-4 uppercase laptop:mt-0 desktop:mt-4"
            text={feedbackForm('buttonSubmit')}
          />
        </div>
      </Form>
    </Formik>
  );
};
