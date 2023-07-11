import React, {useEffect} from 'react';
import '../adminStyles/createUser.css';
import useUpdateUser from '../adminHooks/useUpdateUser';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useNavigate, useLocation } from 'react-router-dom';




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


  return errors;
};

const UpdateUser = () => {
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };

  const location = useLocation();
  const user = location.state?.user

  const initialForm = {... user}
  // const initialForm = {
  //   username: `${user.username}`,
  //   email: `${user.email}`,
  //   password:`${user.password}`,
  // };

  const {
    form,
    errors,
    loading,
    response,
    serverError,
    handleChange,
    handleBlur,
    handleSubmit,
    setUserId,
  } = useUpdateUser(initialForm, validationsForm);

  useEffect (() => {

    console.log('trying effect, imprimir', user )
    console.log('trying effect, imprimir user id componente', user.id)
    setUserId(user.id)

  }, [setUserId])


  return (
    <form onSubmit={handleSubmit} className='create-user-layout'>

      <header className="create-user-header">
        <div className='create-user-header-grid-container'>
          <button className="back-btn"
            onClick={() => handleNavigation('/menu-admin')}
          >
            &#8249;
          </button>
          <h3 className='create-user-title'>Edit user</h3>

        </div>
      </header>

      <main className='main-layout'>

        <section className='main-buttons-container'>
          <button
            type="submit"
            value="SIGN IN"

            className="create-user-button"
          >
            Update User
          </button>

        </section>
      </main>

      <h3> Editing userId: {user.id}</h3>


      {errors.id && <span>{errors.id}</span>}

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
        type="text"
        name="password"
        placeholder="Password"
        className="password-input register-input-fields"
        onChange={handleChange}
        onBlur={handleBlur}
        value={form.password}
        required
      />

      {errors.password && <span>{errors.password}</span>}


      {errors.confirmPassword && <span>{errors.confirmPassword}</span>}

      <br />
      {loading && <Loader />}
      {response && <Message msg={`${serverError}`} bgColor="dc3545" />}
      <br />
    </form>
  );
};

export default UpdateUser;