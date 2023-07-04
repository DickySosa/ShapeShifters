import React from 'react';
import '../styles/confirmationCode.css';
import useForgotPassword from '../hooks/useForgotPassword';
import { Link } from 'react-router-dom';

const initialForm = {
  emailVerification: '',
  password: '',
  confirmPassword: '',
};
const validationsForm = (form) => {
  let errors = {};
  let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
  let regexPassword =
    /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;

  if (!form.emailVerification) {
    errors.emailVerification = 'Your email is required';
  } else if (!regexEmail.test(form.emailVerification.trim())) {
    errors.emailVerification = "The input field 'email' is incorrect ";
  }

  if (!form.password.trim()) {
    errors.password = "'Password' is required";
  } else if (form.password.length < 8) {
    errors.password = 'The password should have at least 8 characters';
  } else if (!regexPassword.test(form.password.trim())) {
    errors.password =
      'Password should have lower, upper case, numbers and special characters';
  } else if (form.password > 16) {
    errors.username = 'Password is no more than 16 characters long';
  }

  if (!form.confirmPassword.trim()) {
    errors.confirmPassword = "'Confirm Password' is required";
  } else if (form.confirmPassword !== form.password) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
};

const ForgotPassword = () => {
  const {
    form,
    errors,
    loading,
    response,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForgotPassword(initialForm, validationsForm);

  const handleDisabled = () => {
    return !form.emailVerification || !form.password || !form.confirmPassword;
  };

  return (
    <div className="App">
      <Link
        className="back-btn"
        to={'/'}
        style={{
          display: 'inline-block',
          marginRight: '100%',
          borderBottom: 'none',
        }}
      >
        &#8249;
      </Link>
      <h1 className="title">Forgot Password?</h1>
      <h3 className="paragraph">
        We just need your registered email address to send you password reset
      </h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="emailVerification"
          placeholder="E-mail address"
          className="username-input register-input-fields"
          onChange={handleChange}
          onBlur={handleBlur}
          value={form.emailVerification}
          required
        />

        {errors.emailVerification && <span>{errors.emailVerification}</span>}
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="password-input register-input-fields"
          onChange={handleChange}
          onBlur={handleBlur}
          value={form.password}
          required
        />

        {errors.password && <span>{errors.password}</span>}

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          className="corfirm-password-input register-input-fields"
          onChange={handleChange}
          onBlur={handleBlur}
          value={form.confirmPassword}
          required
        />
        {errors.confirmPassword && <span>{errors.confirmPassword}</span>}

        <button
          disabled={handleDisabled()}
          type="submit"
          className="confirm-btn"
        >
          Reset password
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
