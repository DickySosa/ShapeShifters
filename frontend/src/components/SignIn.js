import React from 'react';
import '../styles/signIn.css';
import useSignIn from '../hooks/useSignIn';
import Loader from './Loader';
import Message from './Message';
import { useNavigate } from 'react-router-dom';
import { validationsFormSignIn } from '../helper/validationFunction'

const initialForm = {
  username: '',
  password: '',
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
    serverError,
  } = useSignIn(initialForm, validationsFormSignIn);

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
        SIGN IN
      </button>
      <br></br> 
    </form>
  );
};

export default SignIn;
