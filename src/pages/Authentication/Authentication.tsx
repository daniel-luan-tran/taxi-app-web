import LoginForm from '../../components/forms/login-form/LoginForm';
import { Page } from '../../components/layout';

const Authentication = () => {
  return (
    <Page customStyles={{ padding: 20 }} title="authentication">
      <h1>Authentication</h1>
      <LoginForm />
    </Page>
  );
};

export default Authentication;
