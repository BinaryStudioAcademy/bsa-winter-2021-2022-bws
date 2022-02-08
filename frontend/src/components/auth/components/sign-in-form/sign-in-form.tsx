// import { Button } from 'components/common/common';

type Props = {
  onSubmit: () => void;
};

const SignInForm: React.FC<Props> = () => (
  <>
    <h1>Sign In ♒</h1>
    <form>{/*<Button label="Sign in" />*/}</form>
  </>
);

export { SignInForm };
