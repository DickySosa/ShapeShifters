export const validationsForm = (form) => {
    let errors = {};
    let regexUsername = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]{6,}$/;
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    let regexPassword =
      /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;
    
    if (!form.username.trim()) {
      errors.username = "'Username' is required";
    } else if (form.username.length < 6) {
      errors.username = 'The Username should have at least 6 characters';
    } else if (!regexUsername.test(form.username.trim())) {
      errors.username = 'The Username just accept letters and blank spaces';
    }
  
    if (!form.email.trim()) {
      errors.email = "'Email' is required";
    } else if (!regexEmail.test(form.email.trim())) {
      errors.email = "The input field 'email' is incorrect ";
    }
  
    if (!form.password.trim()) {
      errors.password = "'Password' is required";
    } else if (form.password.length < 8) {
      errors.password = 'The password should have at least 8 characters';
    } else if (!regexPassword.test(form.password.trim())) {
      errors.password =
        'Password should have lower, upper case, numbers and special characters';
    } else if (form.password > 16) {
      errors.username = 'Password is no more than 16 characters long';
    }

    if (!form.confirmPassword.trim()) {
             errors.confirmPassword = "'Confirm Password' is required";
           } else if (form.confirmPassword !== form.password) {
            errors.confirmPassword = 'Passwords do not match';
          }
  
    return errors;
  };


  
  export const validationsFormUpdate = (form) => {
    let errors = {};
    let regexUsername = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]{6,}$/;
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    let regexPassword =
      /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;
    
    if (!form.username.trim()) {
      errors.username = "'Username' is required";
    } else if (form.username.length < 6) {
      errors.username = 'The Username should have at least 6 characters';
    } else if (!regexUsername.test(form.username.trim())) {
      errors.username = 'The Username just accept letters and blank spaces';
    }
  
    if (!form.email.trim()) {
      errors.email = "'Email' is required";
    } else if (!regexEmail.test(form.email.trim())) {
      errors.email = "The input field 'email' is incorrect ";
    }
  
    if (!form.password.trim()) {
      errors.password = "'Password' is required";
    } else if (form.password.length < 8) {
      errors.password = 'The password should have at least 8 characters';
    } else if (!regexPassword.test(form.password.trim())) {
      errors.password =
        'Password should have lower, upper case, numbers and special characters';
    } else if (form.password > 16) {
      errors.username = 'Password is no more than 16 characters long';
    }
  
    return errors;
  };



  export const validationsFormSignIn = (form) => {
    let errors = {};
    let regexUsername = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]{6,}$/;
    let regexPassword = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;
    
    if (!form.username.trim()) {
      errors.username = "'Username' is required";
    } else if (form.username.length < 6) {
      errors.username = 'The Username should have at least 6 characters';
    } else if (!regexUsername.test(form.username.trim())) {
      errors.username = 'The Username just accept letters and blank spaces';
    }
  
    if (!form.password.trim()) {
      errors.password = "'Password' is required";
    } else if (form.password.length < 8) {
      errors.password = 'The password should have at least 8 characters';
    } else if (!regexPassword.test(form.password.trim())) {
      errors.password =
        'Password should have lower, upper case, numbers and special characters';
    } else if (form.password > 16) {
      errors.username = 'Password is no more than 16 characters long';
    }
  
    return errors;
  };


  export const validationEmail = (form) => {
    let errors = {};
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    
  
    if (!form.emailVerification) {
      errors.emailVerification = 'Your email is required';
    } else if (!regexEmail.test(form.emailVerification.trim())) {
      errors.emailVerification = "The input field 'email' is incorrect ";
    }
  
    return errors;
  };


