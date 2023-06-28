import {useState} from 'react'
import {useNavigate} from 'react-router-dom'


const useRegister = (initialForm, validateForm) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateForm(form));

    if (Object.keys(errors).length > 0) {
      return;
    }

    alert('Sending Form ')
      console.log(form);
      setLoading(true);
      
      fetch('http://localhost:8000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
        Accept: 'application/json',
      })
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        setResponse(true);
  
        // Maneja la respuesta del servidor después de guardar los datos en la base de datos
        if (data && data.success) {
          // Hacer algo si la respuesta indica éxito
          console.log('¡Los datos se guardaron correctamente!');
          navigate('/confirmation-code');
        } else {
          // Hacer algo si la respuesta indica error
          console.error('Hubo un error al guardar los datos:', data.error);
          // Mostrar un mensaje de error al usuario, por ejemplo
        }
      })
      .catch(error => {
        setLoading(false);
        // Maneja cualquier error que ocurra durante la solicitud
        console.error('Error:', error);
        // Mostrar un mensaje de error al usuario, por ejemplo
      });
  };

  return {
    form,
    errors,
    loading,
    response,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};

export default useRegister;