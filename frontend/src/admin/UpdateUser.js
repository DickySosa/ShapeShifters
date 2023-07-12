import React, {useEffect} from 'react';
import '../adminStyles/createUser.css';
import useUpdateUser from '../adminHooks/useUpdateUser';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useNavigate, useLocation } from 'react-router-dom';
import { formValidations } from '../helper/validationFunction'



const UpdateUser = () => {
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };

  const location = useLocation();
  const user = location.state?.user

  const initialForm = {... user}

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
  } = useUpdateUser(initialForm, formValidations);

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