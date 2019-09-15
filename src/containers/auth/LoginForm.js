import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { changeField, initalizeForm, login } from 'modules/auth';
import AuthForm from 'components/auth/AuthForm';
import { check } from 'modules/user';
import { withRouter } from 'react-router-dom';

LoginForm.propTypes = {};

function LoginForm({ history }) {
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  const onChange = e => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'login',
        key: name,
        value,
      })
    );
  };

  const onSubmit = e => {
    e.preventDefault();
    const { username, password } = form;
    dispatch(login({ username, password }));
  };

  useEffect(() => {
    dispatch(initalizeForm('login'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      console.log('Error occurred', authError);
      setError('Login failed');
      return;
    }

    if (auth) {
      console.log('Login succeed');
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      history.push('/');
    }
  }, [history, user]);

  return (
    <AuthForm
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
}

export default withRouter(LoginForm);
