import { useState} from 'react'
import { useNavigate } from 'react-router-dom'


const useSignIn = (initialForm, validateForm) => {
	const [form, setForm] = useState(initialForm)
	const [errors, setErrors] = useState({})
	const [loading, setLoading] = useState(false)
	const [response, setResponse] = useState(null)
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

		try{
			const fetchRequest = await fetch('http://localhost:8000/signin',{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(form)
			}) 

			const data = await fetchRequest.json()

			setLoading(false);
            setResponse(true);

			if(!data.error){
				console.log('User exist');
				navigate('/home')
			}
		} catch (error){
			setLoading(false);
			console.log('Error: ', error)
			console.log('User must be created')

		}

	}


	return {
		form, errors, loading, response, handleChange, handleBlur, handleSubmit
	}
}

export default useSignIn