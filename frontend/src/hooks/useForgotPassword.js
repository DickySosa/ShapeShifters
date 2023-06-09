import {useState} from 'react'
// import { useNavigate } from 'react-router-dom'

const useForgotPassword = (initialForm, validateForm) => {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null)
//   const navigate = useNavigate();

  const handleChange= (e) => {
    const {name,value} = e.target;
    setForm({
        ...form,
        [name]: value
    })
  }

  const handleBlur= (e) => {
    handleChange(e);
    setErrors(validateForm(form));
  }

  const handleSubmit= (e) => {
    e.preventDefault()
    setErrors(validateForm(form));

    if(Object.keys(errors).length > 0){
        return
    }
    console.log(form)
        setLoading(true)
        // navigate('/user-profile')
  }

  return{
    form, errors,loading,response, handleChange,handleBlur,handleSubmit
  }
}

export default useForgotPassword