
 const validation = (userData) => {
    const errors = {}

    const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i;
    const regexPassword = /.*\d+.*/;
    


if (!regexEmail.test(userData.email)) {
    errors.email = 'That is not a valid top-secret e-mail'
}

if(!userData.email){
    errors.email = 'You must enter a top-secret e-mail'
}

if (userData.length > 35) {
    errors.email = 'That is very long! less than 35 characters please'
}

 if  (!regexPassword.test(userData.password)){
    errors.password = 'The top secret password must have at least one number'
    }

 if (userData.password.length < 6 || userData.password.length > 10){
    
errors.password = 'The top secret password must be between 6 and 10 characters'
 }   

return errors;

    }

    


export default validation;
