
 const validation = (userData) => { //No va con mayus porque es una funcion comun y no un componente.Le paso el estado por parametro
    const errors = {}//Inicializo un obj porque la funcion tiene que retornar un obj (se ve en la fn handleOnChange)

    const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i;
    const regexPassword = /.*\d+.*/;
    


if (!regexEmail.test(userData.email)) {//Si uso regex tengo que usar el metodo test. Lo que hace es verificar si lo que esta dentro de test coincide con la regex
    errors.email = 'That is not a valid top-secret e-mail' //Creo una propiedad en el objeto errors (email) cuyo valor sea el msj de error
}

if(!userData.email){ //Verifico si el mail esta vacio
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

return errors; //Si no tengo errores retorno el obj vacio

    }

    


export default validation;
