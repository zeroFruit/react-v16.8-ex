import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { changeField, initalizeForm, register } from '../../modules/auth';
import AuthForm from 'components/auth/AuthForm';
import { check } from 'modules/user';
import { withRouter } from 'react-router-dom';

RegisterForm.propTypes = {
  history: PropTypes.object,
};

function RegisterForm({ history }) {
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
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
    if ([username, password, passwordConfirm].includes('')) {
      setError('Fill the blank field');
      return;
    }

    if (password !== passwordConfirm) {
      setError('Password confirmation failed');
      changeField({
        form: 'register',
        key: 'password',
        value: '',
      });
      changeField({
        form: 'register',
        key: 'passwordConfirm',
        value: '',
      });
      return;
    }
    dispatch(register({ username, password }));
  };

  useEffect(() => {
    dispatch(initalizeForm('register'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      if (authError.response.status === 409) {
        setError('Username already exist')
        return;
      }

      setError('Sign up failed');
      return;
    }
    if (auth) {
      console.log('Sign up success', auth);
      dispatch(check());
    }

  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      console.log('Sign up successfully done', user);
      history.push('/');
    }
  }, [history, user]);

  return (
    <AuthForm
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
}

export default withRouter(RegisterForm);
