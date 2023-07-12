import { useState } from 'react'

const useUpdateUser = (initialForm, validateForm) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [serverError, setServerError] = useState(null);
  const [userId, setUserId] = useState(null);

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
    console.log(form)
    setErrors(validateForm(form));

    if (Object.keys(errors).length > 0) {
      return;
    }

    setLoading(true);

    try {

  

        const updateReq = await fetch(`http://localhost:9000/update-user/${userId}`,{
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(form),
        })
        const updateResponse = await updateReq.json()
        console.log('Update query response ----------->', updateResponse)
        setLoading(false);
        setResponse(true);
        setServerError('User updated successfully')
    } catch (error) {
        console.log('Error: ', error)
        setServerError('Something went wrong')
    }};

    



  return {
    form,
    errors,
    loading,
    response,
    handleChange,
    handleBlur,
    handleSubmit,
    serverError,
    setUserId,
  };
};

export default useUpdateUser;