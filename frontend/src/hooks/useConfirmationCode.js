import {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const useConfirmationCode = (initialForm) => {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [serverError, setServerError] = useState(null)
  const navigate = useNavigate();

  const handleChange= (e) => {
    const {name,value} = e.target;
    setForm({
        ...form,
        [name]: value
    })
  }

  // const handleBlur= (e) => {
  //   handleChange(e);
  //   setErrors(validateForm(form));
  // }

  const handleSubmit= (e) => {
    e.preventDefault()

    console.log(form)
        setLoading(true)
        // navigate('/user-profile')
  }

  return{
    form, errors,loading,response, handleChange,handleSubmit, serverError
  }
}

export default useConfirmationCode