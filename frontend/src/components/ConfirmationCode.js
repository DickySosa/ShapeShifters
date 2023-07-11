import React, { useRef, useState } from 'react';
import '../styles/confirmationCode.css';
import useConfirmationCode from '../hooks/useConfirmationCode';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import Message from './Message';

const ConfirmationCode = () => {
  const [disabled,setDisabled] = useState(false)

  const initialForm = {
    verificationCodeOne: '',
    verificationCodeTwo: '',
    verificationCodeThree: '',
    verificationCodeFour: '',
  };

  const {
    form,
    errors,
    loading,
    response,
    handleChange,
    handleSubmit,
    serverError
  } = useConfirmationCode(initialForm);

  const inputRefs = {
    verificationCodeOne: useRef(null),
    verificationCodeTwo: useRef(null),
    verificationCodeThree: useRef(null),
    verificationCodeFour: useRef(null),
  };

  const handleCodeChange = (e, currentFieldName, nextFieldName) => {
    const { name, value } = e.target;
    handleChange(e);

    if (value.length > 0 && nextFieldName) {
      inputRefs[nextFieldName].current.focus(); // Mover el foco al siguiente campo
    } else if (value.length === 0 && currentFieldName) {
      const previousFieldName = getPreviousFieldName(currentFieldName);
      if (previousFieldName) {
        const previousField = inputRefs[previousFieldName].current;
        previousField.focus(); // Mover el foco al campo anterior
      }
    }
  };

  const getPreviousFieldName = (currentFieldName) => {
    const fieldNames = Object.keys(inputRefs);
    const currentFieldIndex = fieldNames.indexOf(currentFieldName);
    return fieldNames[currentFieldIndex - 1];
  };

  const handleDisabled = () => {
    return !form.verificationCodeOne || !form.verificationCodeTwo  || !form.verificationCodeThree  || !form.verificationCodeFour
  };

  return (
    <div className='App'>
      <Link className='back-btn' to={'/'} style={{ display: 'inline-block', marginRight: '100%' }}>&#8249;</Link>
      <h1 className='title'>Please check your email</h1>
      <h3 className='paragraph'>We have sent a confirmation code to the email: </h3>

      <form onSubmit={handleSubmit}>
        <div className='input-group'>
          <input
            type='text'
            name='verificationCodeOne'
            placeholder='-'
            maxLength='1'
            className={errors.verificationCodeOne && 'invalid'}
            onChange={(e) => handleCodeChange(e, 'verificationCodeOne', 'verificationCodeTwo')}
            value={form.verificationCodeOne}
            ref={inputRefs.verificationCodeOne}
          />

          <input
            type='text'
            name='verificationCodeTwo'
            placeholder='-'
            maxLength='1'
            className={errors.verificationCodeTwo && 'invalid'}
            onChange={(e) => handleCodeChange(e, 'verificationCodeTwo', 'verificationCodeThree')}
            value={form.verificationCodeTwo}
            ref={inputRefs.verificationCodeTwo}
          />

          <input
            type='text'
            name='verificationCodeThree'
            placeholder='-'
            maxLength='1'
            className={errors.verificationCodeThree && 'invalid'}
            onChange={(e) => handleCodeChange(e, 'verificationCodeThree', 'verificationCodeFour')}
            value={form.verificationCodeThree}
            ref={inputRefs.verificationCodeThree}
          />

          <input
            type='text'
            name='verificationCodeFour'
            placeholder='-'
            maxLength='1'
            className={errors.verificationCodeFour && 'invalid'}
            onChange={(e) => handleCodeChange(e, 'verificationCodeFour', null)}
            value={form.verificationCodeFour}
            ref={inputRefs.verificationCodeFour}
          />
        </div>

        <div className='resend'>RESEND CODE</div>
        <br></br>
        {loading && <Loader/>}
        {response && <Message msg={`${serverError}`} bgColor="dc3545" />}
        <br></br>
        <button
          disabled={handleDisabled()}
          type='submit'
          className='confirm-btn'
        >
          Confirm Code
        </button>
      </form>
    </div>
  );
};

export default ConfirmationCode;

