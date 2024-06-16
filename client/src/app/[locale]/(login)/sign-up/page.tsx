import { Metadata } from 'next';

import SignUp from './sign-up';

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Sign up page',
};

const SignUpPage = () => {
  return <SignUp />;
};

export default SignUpPage;
