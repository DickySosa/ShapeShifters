import React from 'react';
import '../styles/register.css';
import useRegister from '../hooks/useRegister';
import Loader from './Loader';
import Message from './Message';
// import Message from './Message';

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

      {/* <button type="reset" value="RESET" className="reset-btn" onClick={async () => {
        console.log('Start of async shit...');

        function that returns a promise
        const mockApiCall = (error) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              if (error) {
                reject('failed succesfully!')
              }
              resolve('all good!')
            }, 2000)
          })
        }

        1. .then .catch
        Promise chaining -> err -> res -> ?
        mockApiCall(true)
          .catch((error) => {
            console.log('async error -> ', error)
            return error
          })
          .then((result) => {
            console.log('async result chain 1 -> ', result)
            return { displayError: 'User already exists...'}
          })
          .then((result) => {
            console.log('async result chain 2 -> ', result)
            return { mappedResult: result + ' mapped...' }
          })
          .finally(() => {
            console.log('finally ... ')
          })


        2. async/await
        try/catch block
        let result = null;
        try {
          result = await mockApiCall(true)
          console.log('async result -> ', result)
        } catch (error) {
          console.log('async error -> ', error)
        }

        map result
        write sync code as normal
        
        End of function
        console.log('End of async shit...')

      }}>
        DO ASYNC SHIT
      </button> */}
    </form>
  );
};

export default Register;
