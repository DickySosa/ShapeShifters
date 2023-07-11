import React from 'react';
import '../styles/confirmationCode.css';
import useForgotPassword from '../hooks/useForgotPassword';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import Message from './Message';
import { validationEmail } from '../helper/validationFunction'


const initialForm = {
  emailVerification: '',
  password: '',
  confirmPassword: '',
};


const ForgotPassword = () => {
  const {
    form,
    errors,
    loading,
    response,
    serverError,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForgotPassword(initialForm, validationEmail);

  const handleDisabled = () => {
    return !form.emailVerification 
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

        <br/>
      {loading && <Loader/>}
      {response && <Message msg={`${serverError}`} bgColor="dc3545" />}
      <br/>


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
