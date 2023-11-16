import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginLocal } from '../../../api/auth';
import { Button, Title } from '../../common';
import { TextInput } from '../../../components/input';
import { Form } from '../../layout';
import './LoginForm.scss';
import { useQueryClient } from 'react-query'; // Import queryCache

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

  const initialValues: LoginFormValues = {
    email: 'staff@dalutech',
    password: '123456a!',
    // remember: '',
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const validate = (values: LoginFormValues) => {
    const errors: { [key: string]: string } = {};
    if (!values.email) {
      errors.email = 'Required';
    }
    if (!values.password) {
      errors.password = 'Required';
    } else {
      // 🎯 Minimum 8 characters
      // 🎯 Should contain 1 or more numbers
      // 🎯 Should contain 1 or more symbols
      // 🎯 Should contain 1 or more letters
      const r = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;

      if (!r.test(values.password)) {
        errors.password =
          'Password must be at least 8 characters, contains only letters, numbers and symbols';
      }
    }

    return errors;
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

  return (
    <div className="login-form">
      {/* <div className="logo-wrapper">
        <img src="/src/assets/react.svg" />
      </div> */}
      <Form onSubmit={formik.submitForm} fullWidth>
        <Title>User Login</Title>
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
