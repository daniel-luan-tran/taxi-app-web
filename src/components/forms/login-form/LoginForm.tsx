import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginLocal } from '../../../api/auth';
import { Button } from '../../common';
import { TextInput } from '../../../components/input';
import { Form } from '../../layout';
import './LoginForm.scss';
import { useQueryClient } from 'react-query'; // Import queryCache
import { useCheckAuth } from '../../../hooks';
import AccountForm from '../account-form/AccountForm';
import { loginAD } from '../../../api/axios';

interface LoginFormValues {
  email: string;
  password: string;
  // remember: string;
}

const LoginForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const queryCache = useQueryClient();
  const navigate = useNavigate();

  const { isAuthed } = useCheckAuth();

  const initialValues: LoginFormValues = {
    email: 'staff@dalutech',
    password: '123456a!',
    // remember: '',
  };

  const formik = useFormik({
    // Test credentials for development (from db seeding)
    initialValues,
    onSubmit: ({ email, password }) => {
      setIsSubmitting(true);
      loginLocal({ email, password })
        .then((userData) => {
          console.log('User data:', userData);
          queryCache.setQueriesData(['checkUser'], userData);
          navigate('/');
        })
        .catch(() => setError('Incorrect password'))
        .finally(() => setIsSubmitting(false));
    },
    // validate,
  });

  if (isAuthed) return <AccountForm />;

  return (
    <div className="login-form">
      <Form onSubmit={formik.submitForm} fullWidth>
        <TextInput
          label="Account"
          value={formik.values.email}
          onChange={formik.handleChange('email')}
          touched={formik.touched.email}
          error={formik.errors.email}
          type="email"
          required
        />
        <TextInput
          label="Password"
          value={formik.values.password}
          onChange={formik.handleChange('password')}
          touched={formik.touched.password}
          error={formik.errors.password}
          type="password"
          required
        />
        <Button
          label="Log In"
          onClick={() => {}}
          isLoading={isSubmitting}
          fullwidth
          isSubmit
        />
        <Button
          label="Login Azure"
          isLoading={isSubmitting}
          fullwidth
          onClick={(e) => {
            e?.preventDefault();
            loginAD();
          }}
        />
        {/* <CheckboxInput
            checkboxLabel="Remember me"
            onChange={formik.handleChange('remember')}
            value={formik.values.remember}
          /> */}
        {error && <p className="error-text">{error}</p>}
      </Form>
    </div>
  );
};

export default LoginForm;
