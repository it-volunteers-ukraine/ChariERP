import { Metadata } from 'next';
import { useTranslations } from 'next-intl';

import { Button } from '@/components';

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Sign up page',
};

const SignUp = () => {
  const registration = useTranslations('auth-page.registration');

  return (
    <>
      <Button
        styleType="primary"
        className="uppercase"
        text={registration('button')}
      />
    </>
  );
};

export default SignUp;
