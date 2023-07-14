// import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'


// const useRegister = (initialForm, validateForm) => {

//   const [form, setForm] = useState(initialForm);
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [response, setResponse] = useState(null);
//   const [serverError, setServerError] = useState(null);
//   const [newUserId, setNewUserId] = useState([])
//   const navigate = useNavigate();
//   const handleNavigation = (path,state) => {
//     navigate(path,state);
//   };

//   // useEffect(() => {
//   //   if (newUserId && Object.keys(newUserId).length > 0) {
//   //     console.log('trying user id hook useRegister------>', newUserId);
//   //   }
//   // }, [newUserId]);
  
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({
//       ...form,
//       [name]: value,
//     });
//   };

//   const handleBlur = (e) => {
//     handleChange(e);
//     setErrors(validateForm(form));
//   };

//   // useEffect(() => {
//   //   if (Object.keys(newUserId).length > 0) {
//   //     console.log('New user ID:', newUserId);
//   //   }
//   // }, [newUserId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors(validateForm(form));

//     if (Object.keys(errors).length > 0) {
//       return;
//     }

//     setLoading(true);

//     const response = await fetch('http://localhost:9000/register', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(form),
//     });

//     const data = await response.json();
//     console.log('try json data register ---------> ', data);
//     setNewUserId(data.rows[0].id)
//     console.log('trying user id hook useRegister------>', newUserId)

//     setLoading(false);
//     setResponse(true);

//     if (!data.RegistingErrors) {
//       console.log('Data save succesfully!');
//       handleNavigation('/confirmation-code', {state: {newUserId}});
//     } else {
//       setLoading(false);
//       if(data.RegistingErrors === '23505'){
//         setServerError('User already exist');
//       }
      
//       console.error(data.RegistingErrors);
//     }
    
//   };

//   return {
//     form,
//     errors,
//     loading,
//     response,
//     handleChange,
//     handleBlur,
//     handleSubmit,
//     serverError,
//   };
// };

// export default useRegister;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useRegister = (initialForm, validateForm) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [serverError, setServerError] = useState(null);
  const [newUserId, setNewUserId] = useState([]);
  const navigate = useNavigate();
  const handleNavigation = (path, state) => {
    navigate(path, state);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleBlur = (e) => {
    handleChange(e);
    setErrors(validateForm(form));
  };

  useEffect(() => {
    if (newUserId !== null) {
      console.log('New user ID:', newUserId);
      // Aquí puedes realizar cualquier otra lógica con el nuevo ID de usuario
    }
  }, [newUserId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(validateForm(form));

    if (Object.keys(errors).length > 0) {
      return;
    }

    setLoading(true);

    const response = await fetch('http://localhost:9000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();
    console.log('try json data register ---------> ', data);
    console.log('try json data register ---------> ', data.rows);
    console.log('try json data register ---------> ', data.rows[0]);
    console.log('try json data register ---------> ', data.rows[0].id);

    setNewUserId(data.rows[0].id); // Guardar el ID del usuario en newUserId

    console.log('este es el hook --->',newUserId)

    setLoading(false);
    setResponse(true);

    if (!data.RegistingErrors) {
      console.log('Data saved successfully!');
      handleNavigation('/confirmation-code', {state:{data}});
    } else {
      setLoading(false);
      if (data.RegistingErrors === '23505') {
        setServerError('User already exists');
      }

      console.error(data.RegistingErrors);
    }
  };

  return {
    form,
    errors,
    loading,
    response,
    handleChange,
    handleBlur,
    handleSubmit,
    serverError,
    newUserId,
  };
};

export default useRegister;
