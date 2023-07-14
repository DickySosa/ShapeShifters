import React, { useRef } from 'react';
import '../styles/confirmationCode.css';
import useConfirmationCode from '../hooks/useConfirmationCode';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import Message from './Message';

const ConfirmationCode = () => {
  const initialForm = {
    verificationCodeOne: '',
    verificationCodeTwo: '',
    verificationCodeThree: '',
    verificationCodeFour: '',
  };

  const {
    form,
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

  const handleCodePaste = (e, currentFieldName) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const codeCharacters = pastedData.split('');

    let currentIndex = Object.keys(inputRefs).indexOf(currentFieldName);
    codeCharacters.forEach((character, index) => {
      const fieldName = Object.keys(inputRefs)[currentIndex + index];
      if (fieldName) {
        handleChange({
          target: {
            name: fieldName,
            value: character
          }
        });
      }
    });
  };


  const getPreviousFieldName = (currentFieldName) => {
    const fieldNames = Object.keys(inputRefs);
    const currentFieldIndex = fieldNames.indexOf(currentFieldName);
    return fieldNames[currentFieldIndex - 1];
  };

  const handleDisabled = () => {
    return !form.verificationCodeOne || !form.verificationCodeTwo || !form.verificationCodeThree || !form.verificationCodeFour
  };

  return (
    <div className='App'>
      <Link className='back-btn' to={'/'} style={{ display: 'inline-block', marginRight: '100%' }}>&#8249;</Link>
      <h1 className='title'>Please check your email</h1>
      <h3 className='paragraph'>We've sent a verification code</h3>

      <form onSubmit={handleSubmit}>
        <div className='input-group'>
          <input
            type='text'
            name='verificationCodeOne'
            placeholder='-'
            maxLength='1'
            onPaste={(e) => handleCodePaste(e, 'verificationCodeOne')}
            onChange={(e) => handleCodeChange(e, 'verificationCodeOne', 'verificationCodeTwo')}
            value={form.verificationCodeOne}
            ref={inputRefs.verificationCodeOne}
          />

          <input
            type='text'
            name='verificationCodeTwo'
            placeholder='-'
            maxLength='1'
            onPaste={(e) => handleCodePaste(e, 'verificationCodeTwo')}
            onChange={(e) => handleCodeChange(e, 'verificationCodeTwo', 'verificationCodeThree')}
            value={form.verificationCodeTwo}
            ref={inputRefs.verificationCodeTwo}
          />

          <input
            type='text'
            name='verificationCodeThree'
            placeholder='-'
            maxLength='1'
            onPaste={(e) => handleCodePaste(e, 'verificationCodeThree')}
            onChange={(e) => handleCodeChange(e, 'verificationCodeThree', 'verificationCodeFour')}
            value={form.verificationCodeThree}
            ref={inputRefs.verificationCodeThree}
          />

          <input
            type='text'
            name='verificationCodeFour'
            placeholder='-'
            maxLength='1'
            onPaste={(e) => handleCodePaste(e, 'verificationCodeFour')}
            onChange={(e) => handleCodeChange(e, 'verificationCodeFour', null)}
            value={form.verificationCodeFour}
            ref={inputRefs.verificationCodeFour}
          />
        </div>

        <div className='resend'>RESEND CODE</div>
        <br></br>
        {loading && <Loader />}
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

