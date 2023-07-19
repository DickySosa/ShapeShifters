import { useState} from 'react'
import { useNavigate } from 'react-router-dom'


const useSignIn = (initialForm, validateForm) => {
	const [form, setForm] = useState(initialForm)
	const [errors, setErrors] = useState({})
	const [loading, setLoading] = useState(false)
	const [response, setResponse] = useState(null)
	const [serverError, setServerError] = useState(null);

	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({
			...form,
			[name]: value
		})
	}

	const handleBlur = (e) => {
		handleChange(e);
		setErrors(validateForm(form));
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setErrors(validateForm(form));

		if (Object.keys(errors).length > 0) {
			return
		}

		setLoading(true)

	
			const fetchRequest = await fetch('http://localhost:9000/sign-in',{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(form)
			}) 

			const data = await fetchRequest.json()

			setLoading(false);
            setResponse(true);

			if(!data.SignInErrors && data.Result > 0){
				navigate('/home')
			} else {
			setLoading(false);
			if(data.Result === 0){
				setServerError('Please verify if the user or the password is correct')
			}
		}

	}


	return {
		form, errors, loading, response, handleChange, handleBlur, handleSubmit, serverError
	}
}

export default useSignIn