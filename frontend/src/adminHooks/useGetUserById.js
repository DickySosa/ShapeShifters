import { useState } from 'react'

const useGetUserById = (initialForm, validateForm) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [serverError, setServerError] = useState(null);
  const [getUser, setGetUser] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    handleChange(e);
    setErrors(validateForm(form));
  };

  const handleGet =  async (e, userId) => {
    e.preventDefault();
    // console.log(form)
    setErrors(validateForm(form));

    if (Object.keys(errors).length > 0) {
      return;
    }


    setLoading(true);
    console.log(form)

    try {
        let userId = form.id
        const response = await fetch(`http://localhost:9000/get-by-id/${userId}`, {
        method: 'GET'
        });
        const data = await response.json();
        console.log('try json data Get user by id ---------> ', data);
        setGetUser(data);
    } catch (error) {
        console.error('Error obtaining the information', error);
    }
    console.log(getUser);
}

    // const response = await fetch(`http://localhost:9000/get-by-id/${userId}`, {
    //   method: 'GET'
    // });

    // const data = await response.json();
    // console.log('try json data Get user by id ---------> ', data);

    // setLoading(false);
    // setResponse(true);

    // if (!data.RegistingErrors) {
    //   console.log('Data save succesfully!');
    //   setServerError('User create successfully');
    // } else {
    //   setLoading(false);
    //   if(data.RegistingErrors === '23505'){
    //     setServerError('User already exist');
    //   }}
    

  return {
    form,
    errors,
    loading,
    response,
    handleChange,
    handleBlur,
    handleGet,
    serverError,
  };
};

/* 
const [form, setForm] = useState(initialForm);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [serverError, setServerError] = useState(null);
    const [getUser, setGetUser] = useState(null);

    const handleGet = (e) => {
        e.prevent.default();
        console.log(form)
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
          ...form,
          [name]: value,
        });
      };



*/

/* api fetch

// const handleGet = async (e, userId) => {
    //     e.preventDefault();
    //     // console.log(form)
    //     setErrors(validateForm(form));

    //     if (Object.keys(errors).length > 0) {
    //         return;
    //     }


    //     setLoading(true);
    //     console.log(form)

    //     try {
    //         let userId = form.id
    //         const response = await fetch(`http://localhost:9000/get-by-id/${userId}`, {
    //             method: 'GET'
    //         });
    //         const data = await response.json();
    //         console.log('try json data Get user by id ---------> ', data);
    //         setGetUser(data);
    //     } catch (error) {
    //         console.error('Error obtaining the information', error);
    //     }
    //     console.log(getUser);
    // }




*/

export default useGetUserById;