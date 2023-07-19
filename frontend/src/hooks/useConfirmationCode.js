import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const useConfirmationCode = (initialForm) => {
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [serverError, setServerError] = useState(null)
  const [saveResponse, setSaveResponse] = useState(null)

  const navigate = useNavigate();

  const location = useLocation();
  const newUserId = location.state?.theData

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const transformedForm = Object.values(form).join('');

    const verify = {
      code: transformedForm
    }

    setLoading(true)


    try {
      const sendCode = await fetch(`http://localhost:9000/verification-code/${newUserId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(verify)
      })

      if (sendCode.error) {
        throw new Error('Network response was not ok');
      }

      const confirmation = await sendCode.json()
      setSaveResponse(confirmation)

      setLoading(false);
      setResponse(true);

      if (!confirmation.error && confirmation > 0) {
        navigate('/user-profile')
      } else {
        setLoading(false)
        setServerError('Confirmation code does not match')

      }
    } catch (error) {
      setLoading(false);
      setServerError('There was an error during the request.');
      console.error(error);
    }

  }

  return {
    form, loading, response, handleChange, handleSubmit, serverError
  }
}

export default useConfirmationCode