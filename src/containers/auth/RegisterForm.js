import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { changeField, initalizeForm, register } from '../../modules/auth';
import AuthForm from 'components/auth/AuthForm';

RegisterForm.propTypes = {};

function RegisterForm(props) {
  const dispatch = useDispatch();
  const { form, auth, authError } = useSelector(({ auth }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
  }));

  const onChange = e => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'register',
        key: name,
        value,
      })
    );
  };

  const onSubmit = e => {
    e.preventDefault();

    const { username, password, passwordConfirm } = form;
    if (password !== passwordConfirm) {
      // TODO: error handling
      return;
    }
    dispatch(register({ username, password }));
  };

  useEffect(() => {
    dispatch(initalizeForm('register'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      console.log('Error occurred', authError);
      return;
    }
    if (auth) {
      console.log('Sign up success', auth);
    }

  }, [auth, authError]);

  return (
    <AuthForm
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
}

export default RegisterForm;
