import React from 'react';
import '../styles/register.css';
import useRegister from '../hooks/useRegister';
import Loader from './Loader';
import Message from './Message';
import { validationsForm } from '../helper/validationFunction'

const initialForm = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Register = () => {
  const {
    form,
    errors,
    loading,
    response,
    serverError,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useRegister(initialForm, validationsForm);

  const handleDisabled = () => {
    return (
      !form.username || !form.email || !form.password || !form.confirmPassword
    );
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
        type="email"
        name="email"
        placeholder="Email address"
        className="email-input register-input-fields"
        onChange={handleChange}
        onBlur={handleBlur}
        value={form.email}
        required
      />

      {errors.email && <span>{errors.email}</span>}

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

      <br/>
      {loading && <Loader/>}
      {response && <Message msg={`${serverError}`} bgColor="dc3545" />}
      <br/>

      <button
        type="submit"
        value="SIGN IN"
        className="submit-btn"
        disabled={handleDisabled()}
      >
        REGISTER
      </button> 
    </form>
  );
};

export default Register;
