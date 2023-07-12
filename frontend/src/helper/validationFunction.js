const regexUsername = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]{6,}$/;
const regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
const regexPassword = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;

export const formValidations = ({
  username, email, password, confirmPassword
}) => {

  let errors = {};

  if (username || username === '') {
    if (!username.trim()) {
      errors.username = "'Username' is required";
    } else if (username.length < 6) {
      errors.username = 'The Username should have at least 6 characters';
    } else if (!regexUsername.test(username.trim())) {
      errors.username = 'The Username just accept letters and blank spaces';
    }
  }

  if (email || email === '') {
    if (!email.trim()) {
      errors.email = "'Email' is required";
    } else if (!regexEmail.test(email.trim())) {
      errors.email = "The input field 'email' is incorrect ";
    }
  }

  if (password || password === '') {
    if (!password.trim()) {
      errors.password = "'Password' is required";
    } else if (password.length < 8) {
      errors.password = 'The password should have at least 8 characters';
    } else if (!regexPassword.test(password.trim())) {
      errors.password =
        'Password should have lower, upper case, numbers and special characters';
    } else if (password > 16) {
      errors.username = 'Password is no more than 16 characters long';
    }
  }

  if (confirmPassword || confirmPassword === '') {
    if (!confirmPassword.trim()) {
      errors.confirmPassword = "'Confirm Password' is required";
    } else if (confirmPassword !== password) {
      errors.confirmPassword = 'Passwords do not match';
    }
  }

  return errors;

}


