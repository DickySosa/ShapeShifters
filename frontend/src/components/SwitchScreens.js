import React, {useEffect, useState} from 'react';
import '../App.css';
import Register from './Register';
import SignIn from './SignIn';



function SwitchScreens() {

  const [ActiveForm, SetActiveForm] = useState(<SignIn />);

  const [forms, setForms] = useState([
    { form: () => <SignIn />, active: true, className:'sign-in', label: 'SIGN IN'},
    { form: () => <Register />, active: false, className:'register', label: 'REGISTER'},
  ])

  const toggleForm = (index) => {
    const inactiveForms = forms.map((item, i) => {
      if (i === index) {
        item.active = true;
      } else {
        item.active = false;
      }
      return item;
    })
    setForms(inactiveForms)
  }

  useEffect(() => {
    const activeForm = forms.find(item => item.active).form()
    SetActiveForm(activeForm)
  }, [forms])
  
  return (
   
    <div className="App">

      <h1 className='main-title'>ShapeShifters</h1>
        <section className='switch-buttons'>
            <div className='switch-buttons-container'>
              {forms.map((form, i) => {
                return <button onClick={() => toggleForm(i)}  
                className={`${form.className} ${forms[i].active ? 'active-form' : null}`}
                key={i} >{form.label}</button>
              })}
            </div>
        </section> <br></br><br></br>

        
        {ActiveForm} 
    </div>
    
  );
}

export default SwitchScreens;