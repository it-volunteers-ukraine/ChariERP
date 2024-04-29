import { Metadata } from 'next';
import SignIn from './sign-in';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in page',
};

const SignInPage = () => {
  return <SignIn />;
};

export default SignInPage;
