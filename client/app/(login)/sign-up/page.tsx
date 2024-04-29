import { Metadata } from 'next';
import { Button } from '@/components';

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Sign up page',
};

const SignUp = () => {
  return (
    <>
      <Button
        styleType="primary"
        className="uppercase"
        text="Відправити Форму"
      />
    </>
  );
};

export default SignUp;
