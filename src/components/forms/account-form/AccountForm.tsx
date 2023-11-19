import { useFormik } from 'formik';
import { useState, useMemo } from 'react';
import { Button, Spinner } from '../../common';
import { TextInput } from '../../input';
import { Form, Row } from '../../layout';
import { Account } from '../../../types';
import { updateUser } from '../../../api/account';
import { useCheckAuth, useForceRerender } from '../../../hooks';

const AccountForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isCheckingAuth: dataLoading, user } = useCheckAuth();
  const forceRerender = useForceRerender();

  const initialValues = useMemo(() => {
    if (!user) {
      return {
        id: '',
        firstName: '',
        lastName: '',
        displayName: '',
        email: '',
        address: '',
        phoneNumber: '',
        azureOid: '',
      };
    }
    return user;
  }, [user]);

  // Setup submit handlers
  const onSubmit = async (values: Account) => {
    const update = async () => {
      if (!initialValues) return;
      await updateUser(initialValues?.id, values);
      forceRerender();
    };

    setIsSubmitting(true);
    try {
      await update();
    } catch (error) {
      alert(JSON.stringify(error));
    }
    setIsSubmitting(false);
  };

  // Setup validation
  const validate = (values: Account) => {
    const errors: { [key: string]: string } = {};
    if (!values.phoneNumber) {
      errors.name = 'Required';
    }
    return errors;
  };

  // Setup form
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
    enableReinitialize: true,
  });

  // If fetching data for provided id, show loading
  if (dataLoading) return <Spinner />;

  // If submitting, show loading
  if (isSubmitting) return <Spinner size="large" />;

  // Otherwise show form
  return (
    <>
      <Form customStyles={{ margin: 'auto' }} onSubmit={formik.handleSubmit}>
        <Row justifyContent="center">
          <div>
            <Row>
              <TextInput
                label="First name"
                value={formik.values.firstName}
                onChange={(value) => {
                  formik.setFieldValue('firstName', value);
                }}
                error={formik.errors.firstName}
                touched={formik.touched.firstName}
                required
                disabled
              />
              <TextInput
                label="Last name"
                value={formik.values.lastName}
                onChange={(value) => {
                  formik.setFieldValue('lastName', value);
                }}
                error={formik.errors.lastName}
                touched={formik.touched.lastName}
                required
                disabled
              />
              <TextInput
                label="Display name"
                value={formik.values.displayName}
                onChange={(value) => {
                  formik.setFieldValue('displayName', value);
                }}
                error={formik.errors.displayName}
                touched={formik.touched.displayName}
                required
                disabled
              />
            </Row>
            <Row>
              <TextInput
                label="Emai"
                value={formik.values.email}
                onChange={(value) => {
                  formik.setFieldValue('email', value);
                }}
                error={formik.errors.email}
                touched={formik.touched.email}
                required
                disabled
              />
              <TextInput
                label="Phone number"
                value={formik.values.phoneNumber}
                onChange={(value) => {
                  formik.setFieldValue('phoneNumber', value);
                }}
                error={formik.errors.phoneNumber}
                touched={formik.touched.phoneNumber}
                required
              />
            </Row>
            <Row>
              <TextInput
                label="Address"
                value={formik.values.address}
                onChange={(value) => {
                  formik.setFieldValue('address', value);
                }}
                error={formik.errors.address}
                touched={formik.touched.address}
                required
              />
            </Row>
            <Row justifyContent="center" alignItems="center" noFlex>
              <Button
                label={'Update'}
                onClick={() => {
                  formik.submitForm();
                }}
                isSubmit
              />
            </Row>
          </div>
        </Row>
      </Form>
    </>
  );
};

export default AccountForm;
