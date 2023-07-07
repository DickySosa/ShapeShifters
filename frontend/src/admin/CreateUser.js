import React from 'react';
import '../styles/register.css';
import useCreateUser from '../hooks/useCreateUser';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Link } from 'react-router-dom';


const initialForm = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  
  const validationsForm = (form) => {
    let errors = {};
    let regexUsername = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]{6,}$/;
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    let regexPassword =
      /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;
  
    if (!form.username.trim()) {
      errors.username = "'Username' is required";
    } else if (form.username.length < 6) {
      errors.username = 'The Username should have at least 6 characters';
    } else if (!regexUsername.test(form.username.trim())) {
      errors.username = 'The Username just accept letters and blank spaces';
    }
  
    if (!form.email.trim()) {
      errors.email = "'Email' is required";
    } else if (!regexEmail.test(form.email.trim())) {
      errors.email = "The input field 'email' is incorrect ";
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
  
  const CreateUser = () => {
    const {
      form,
      errors,
      loading,
      response,
      serverError,
      handleChange,
      handleBlur,
      handleSubmit,
    } = useCreateUser(initialForm, validationsForm);
  
    const handleDisabled = () => {
      return (
        !form.username || !form.email || !form.password || !form.confirmPassword
      );
    };
  
    return (
      <form onSubmit={handleSubmit} className='home'>

      <Link
        className="back-btn"
        to={'/menu-admin'}
        style={{
          display: 'inline-block',
          marginRight: '100%',
          marginBottom: '-5px',
          borderBottom: 'none',
        }}
      >
        &#8249;
      </Link>
        <header className="home-main-title">Create User</header>

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
          Create new user
        </button> 
      </form>
    );
  };
  
  export default CreateUser;