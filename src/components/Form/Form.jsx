import { useState } from "react";
import validation from "./Validation";
import style from "./Form.module.css";


const Form = ({ login, onNeonTitleActivate }) => {
  let [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  let [errors, setErrors] = useState({});//Para encontrar errores. Los estados se pasan por props, no se importan ni se exportan


  const handleOnChange = (event) => { //Para bindear el estado con el input (con los input tengo que bindearlo tambien pero se hace con value).Le paso la funcion con el evento onChange a los inputs
    setUserData({
      ...userData,//Como estoy pisando el objeto, copio lo que habia antes para no perderlo
      [event.target.name]: event.target.value,//Funciona con cualquier input. Uso brackets porque no se con exactitud que propiedad es, puede ser cualquiera de las dos (email o password). De esta manera lo hago variable y dinamico. Por eso el name del input tiene que ser igual a la prop del estado
    });
    setErrors(
      validation({ //La funcion validation la ejecuto aca porque es donde puedo ver todos los cambios en tiempo real. La funcion me retorna un obj. Si tengo una ejecucion a funcion, es igual al valor de su retorno.Le paso el resultado al estado erros a traves de setErrors
        ...userData,
        [event.target.name]: event.target.value, //si encuentra errores: {email:'mensaje de error', passeord: 'mensaje de error'} y lo guarda en el estado errors
      })
    );
  };
  //La función handleOnChange es un manejador de eventos que se llama cada vez que se produce un cambio en los campos de entrada del formulario. Su función principal es actualizar el estado del componente Form con los nuevos valores ingresados en los campos del formulario. Aquí está una explicación paso a paso de lo que hace:

//Cuando un cambio (por ejemplo, escribir en un campo de entrada) ocurre en uno de los campos del formulario, se desencadena el evento onChange.
//event es el objeto de evento pasado a la función handleOnChange. Contiene información sobre el evento, como el objetivo (event.target), que es el elemento del DOM que desencadenó el evento (en este caso, el campo de entrada).
//setUserData({...userData}): Esta línea actualiza el estado userData utilizando setUserData. Sin embargo, parece que no está actualizando nada en particular porque se está propagando el mismo objeto userData sin cambios ({...userData}). Esto podría ser un error y debería actualizarse con el nuevo valor del campo de entrada.
//setErrors(validation({...userData, [event.target.name]: event.target.value})): Aquí se actualiza el estado errors utilizando el resultado de una función llamada validation. Se pasa un objeto que combina los valores actuales de userData con el nuevo valor del campo de entrada, utilizando [event.target.name]: event.target.value. Esto actualiza el estado de errores basado en las reglas definidas en la función validation.
//En resumen, handleOnChange se utiliza para capturar cambios en los campos de entrada del formulario y actualizar el estado userData con los nuevos valores ingresados, además de calcular los errores basados en las reglas de validación definidas en la función validation. Sin embargo, la línea que actualiza userData parece incorrecta ya que simplemente lo clona sin cambios, y debería actualizar el campo correspondiente con el nuevo valor del campo de entrada.

  const handleSubmit = (event) => { //Va a ir a la etiqueta form porque el evento onSubmit es de la etiqueta form
    event.preventDefault(); //Para evitar que se recargue la pagina cada vez que el usuario le da click al submit
    login(userData);
  };

  return (
    <div className={style.container}>
      <img
        src="/public/com-gif-maker-1--unscreen.gif"
        className={style.formheader}
      ></img>
      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.email}>
          <label htmlFor="email" className={style.labelemail}>
            {" "}
            Enter Your Top-Secret E-mail:{" "}
          </label>
          <input
            name="email"
            type="email"
            placeholder="E-MAIL"
            value={userData.email} //Conecto mi estado local con el input (bindeado). Si sucede un cambio en el estado, el input se tiene que enterar. Si sucede un cambio en el input, el estado se tiene que enterar
            onChange={handleOnChange}//Ante cualquier cambio se ejecuta la funcion
            autoComplete="off"
          />
          {errors.email && <p className={style.inputerror}>{errors.email}</p>}
        </div>

        <div className={style.password}>
          <label htmlFor="password">Enter Your Top-Secret Password: </label>
          <input
            name="password"
            type="password"
            placeholder="PASSWORD"
            value={userData.password} //Porque userData (el estado) es un objeto
            onChange={handleOnChange}
            autoComplete="off"
          />
          {errors.password && ( //Si tengo una propiedad password en el obj errors, renderizo una etiqueta p con el mensaje
            <p className={style.inputerror}>{errors.password}</p>//Muestro el valor de la propiedad
          )}
        </div>

        <button
          onClick={() => {
            login(userData);
            onNeonTitleActivate();
          }}
          className={style.btn}
          disabled={ //Dejo el boton deshabilitado si no escribi nada en algun input o si hay errores
            !userData.email ||
            !userData.password ||
            errors.email ||
            errors.password
          }
        >
          START
        </button>      

       
      </form>
    </div>
  );
};

export default Form;
