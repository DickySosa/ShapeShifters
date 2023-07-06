import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const useRegister = (initialForm, validateForm) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [serverError, setServerError] = useState(null);
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(validateForm(form));

    if (Object.keys(errors).length > 0) {
      return;
    }

    setLoading(true);

    const response = await fetch('http://localhost:9000/create-new-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();
    console.log('try json data register ---------> ', data);

    setLoading(false);
    setResponse(true);

    if (!data.RegistingErrors) {
      console.log('Data save succesfully!');
      setServerError('User create successfully');
    } else {
      setLoading(false);
      if(data.RegistingErrors === '23505'){
        setServerError('User already exist');
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
  };
};

export default useRegister;