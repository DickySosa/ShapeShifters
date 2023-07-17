import {useState} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const useConfirmationCode = (initialForm) => {
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [serverError, setServerError] = useState(null)
  const navigate = useNavigate();

  const location = useLocation();
  const newUserId = location.state?.theData

  console.log('Id from useConfirmationCode------>', newUserId)

  const handleChange= (e) => {
    const {name,value} = e.target;
    setForm({
        ...form,
        [name]: value
    })
  }

  const handleSubmit= (e) => {
    e.preventDefault()

    console.log(form)
        setLoading(true)
        // navigate('/user-profile')   /**  fix this */
  }

  return{
    form,loading,response, handleChange,handleSubmit, serverError
  }
}

export default useConfirmationCode