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
      <Form className="tablet:w-[605px] tablet:px-12 tablet:py-10 laptop:w-[800px] desktop:w-[588px] desktop:px-10 desktop:py-8 desktopXl:w-[738px] desktopXl:px-12 desktopXl:py-10 m-auto bg-white px-2 py-4 shadow-md">
        <div className="tablet:mb-12 tablet:max-w-[456px] laptop:max-w-[622px] desktop:max-w-[456px] desktopXl:max-w-[642px] m-auto mb-8 max-w-[342px]">
          <h2 className="font-scada tablet:text-[32px] pointer-events-none m-auto mb-6 text-center text-2xl font-bold uppercase select-none">
            {contactPageTranslation('feedback')}
          </h2>

          <h3 className="font-scada text-new-black tablet:text-[18px] tablet:leading-[22px] pointer-events-none m-auto max-w-[456px] text-center leading-[22px] font-bold select-none">
            {contactPageTranslation('feedbackMessage')}
          </h3>
        </div>
        <div className="laptop:gap-y-12 desktop:gap-y-8 desktopXl:px-[66px] flex flex-col gap-y-8">
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
            textAreaClass="h-[240px] tablet:h-[148px] scroll-textarea text-input-text! resize-none text-wrap"
          />

          <CheckboxField
            name="agree"
            href={routes.privacyPolicy}
            label={text('checkbox.information')}
            hrefText={text('checkbox.privacyPolicy')}
            className="laptop:mx-auto laptop:items-center! items-start!"
          />

          <Button
            type="submit"
            styleType="primary"
            isLoading={isLoading}
            className="laptop:mt-0 desktop:mt-4 m-auto mt-4 uppercase"
            text={feedbackForm('buttonSubmit')}
          />
        </div>
      </Form>
    </Formik>
  );
};
