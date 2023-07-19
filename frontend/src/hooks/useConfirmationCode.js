import {useEffect, useState} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const useConfirmationCode = (initialForm) => {
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [serverError, setServerError] = useState(null)
  const [getCode, setGetCode] = useState(null)

  const navigate = useNavigate();

  const location = useLocation();
  const newUserId = location.state?.theData

  console.log('Id from useConfirmationCode------>', newUserId)

  

    // const fetchCode = async () => {

    //   try {
    //     const getCode = await fetch(`http://localhost:9000/verification-code/${newUserId}`,{
    //     method: 'GET'
    //   })
    //   const code = await getCode.json()
    //   console.log('Ready to use the code', code)
    //   setGetCode(code)
    //   } catch (error) {
    //     console.log(error)
    //   }

    // }
    // fetchCode()//maybe will charge before the code is in the console, check that


  const handleChange= (e) => {
    const {name,value} = e.target;
    setForm({
        ...form,
        [name]: value
    })
  }

  const handleSubmit= async (e) => {
    e.preventDefault()

    console.log(form)
    const transformedForm = Object.values(form).join('');
    const verify = {
      code: transformedForm
    }
    console.log(verify)
    console.log(form)
        setLoading(true)

        try {
          const sendCode = await fetch(`http://localhost:9000/verification-code/${newUserId}`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(verify)
          })
          const confirmation = await sendCode.json()

        } catch (error) {
          
        }
        // navigate('/user-profile')   /**  fix this */
  }

  return{
    form,loading,response, handleChange,handleSubmit, serverError
  }
}

export default useConfirmationCode