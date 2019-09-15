import React from 'react';
import PropTypes from 'prop-types';
import AuthTemplate from '../components/auth/AuthTemplate';
import LoginForm from '../containers/auth/LoginForm';

LoginPage.propTypes = {};

function LoginPage(props) {
  return (
    <AuthTemplate>
      <LoginForm/>
    </AuthTemplate>
  );
}

export default LoginPage;
