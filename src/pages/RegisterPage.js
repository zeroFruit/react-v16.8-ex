import React from 'react';
import PropTypes from 'prop-types';
import AuthTemplate from '../components/auth/AuthTemplate';
import RegisterForm from '../containers/auth/RegisterForm';

RegisterPage.propTypes = {};

function RegisterPage(props) {
  return (
    <AuthTemplate>
      <RegisterForm/>
    </AuthTemplate>
  );
}

export default RegisterPage;
