import React from 'react';
import '../styles/signIn.css';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-dom';

const initialForm = {
  username: '',
  password: '',
};
const validationsForm = (form) => {
  let errors = {};
  let regexUsername = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]{6,}$/;
  let regexPassword =
    /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;

  if (!form.username.trim()) {
    errors.username = "'Username' is required";
  } else if (form.username.length < 6) {
    errors.username = 'The Username should have at least 6 characters';
  } else if (!regexUsername.test(form.username.trim())) {
    errors.username = 'The Username just accept letters and blank spaces';
  }

  if (!form.password.trim()) {
    errors.password = "'Password' is required";
  } else if (form.password.length < 8) {
    errors.password = 'The password should have at least 8 characters';
  } else if (!regexPassword.test(form.password.trim())) {
    errors.password =
      'Password should have lower, upper case, numbers and special charecters';
  } else if (form.password.length > 16) {
    errors.password = 'Password is no more than 16 characters long';
  }

  return errors;
};

const SignIn = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/forgot-password');
  };
  const {
    form,
    errors,
    loading,
    response,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useSignIn(initialForm, validationsForm);

  const handleDisabled = () => {
    return !form.username || !form.password;
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        className="username-input register-input-fields"
        onChange={handleChange}
        onBlur={handleBlur}
        value={form.username}
        required
      />

      {errors.username && <span>{errors.username}</span>}

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

      <br></br>

      <button onClick={handleNavigate} className="forgotPassword">
        Forgot Password?
      </button>

      <br></br>

      <button
        type="submit"
        value="SIGN IN"
        className="submit-btn"
        disabled={handleDisabled()}
      >
        SIGN IN
      </button>
    </form>
  );
};

export default SignIn;
