import React from 'react'
import '../styles/confirmationCode.css';
import useConfirmationCode from '../hooks/useConfirmationCode'
import { Link } from 'react-router-dom'

const initialForm = {
  verificationCodeOne: '',
  verificationCodeTwo: '',
  verificationCodeThree: '',
  verificationCodeFour: '',
}
const validationsForm = (form) =>{
  let errors = {};

  if(!form.verificationCodeOne){
    errors.verificationCodeOne = " "
  }
  if(!form.verificationCodeTwo){
    errors.verificationCodeTwo = " "
  }
  if(!form.verificationCodeThree){
    errors.verificationCodeThree = " "
  }
  if(!form.verificationCodeFour){
    errors.verificationCodeFour = " "
  }

  return errors
}

 const ConfirmationCode = () => {
  const {
    form, 
    errors,
    loading,
    response, 
    handleChange,
    handleBlur,
    handleSubmit
  } = useConfirmationCode(initialForm, validationsForm)

  const handleCodeChange = (e, fieldName, nextFieldName) => {
    const { value } = e.target;
    handleChange(e); // Invocar la función handleChange existente

    if (value.length === 1 && nextFieldName) {
      document.getElementsByName(nextFieldName)[0].focus(); // Mover el foco al siguiente input
    }
  };
  
    return (
    <div className='App'>
        <Link className="back-btn" to={'/'} style={{ display: 'inline-block', marginRight: '100%' }}>&#8249;</Link>
        <h1 className='title'>Please check your email</h1>
        <h3 className='paragraph'>We have sent a confirmation code to the email: </h3>

        <form onSubmit={handleSubmit}>
        <div className="input-group">

          <input 
          type="text" 
          name='verificationCodeOne' 
          placeholder="-" 
          maxLength="1"
          className={ errors.verificationCodeOne && 'invalid'}
          onBlur={handleBlur}
          onChange={(e) =>
            handleCodeChange(e, 'verificationCodeOne', 'verificationCodeTwo')
          }
          value={form.verificationCodeOne}
          />

          <input 
          type="text" 
          name='verificationCodeTwo' 
          placeholder="-" 
          maxLength="1"
          className={ errors.verificationCodeTwo && 'invalid'}
          onBlur={handleBlur}
          onChange={(e) =>
            handleCodeChange(
              e,
              'verificationCodeTwo',
              'verificationCodeThree'
            )
          }
          value={form.verificationCodeTwo}
          />

          <input 
          type="text" 
          name='verificationCodeThree' 
          placeholder="-" 
          maxLength="1"
          className={ errors.verificationCodeThree && 'invalid'}
          onBlur={handleBlur}
          onChange={(e) =>
            handleCodeChange(
              e,
              'verificationCodeThree',
              'verificationCodeFour'
            )
          }
          value={form.verificationCodeThree}
          />

          <input 
          type="text" 
          name='verificationCodeFour' 
          placeholder="-" 
          maxLength="1"
          className={ errors.verificationCodeFour && 'invalid'}
          onBlur={handleBlur}
          onChange={(e) => handleCodeChange(e, 'verificationCodeFour', null)}
          value={form.verificationCodeFour}
          />
          
        </div>

        <div className='resend'>RESEND CODE</div>
            <br></br><br></br>
        <button 
        disabled={false}
        type="submit" className="confirm-btn">Confirm Code</button>
        </form>
    </div>
  )
}

export default ConfirmationCode