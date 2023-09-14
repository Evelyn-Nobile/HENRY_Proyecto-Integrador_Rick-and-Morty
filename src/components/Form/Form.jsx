import { useState } from "react";
import validation from "./Validation";
import style from "./Form.module.css";

const Form = ({ login, onNeonTitleActivate }) => {
  let [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  let [errors, setErrors] = useState({});

  const handleOnChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validation({
        ...userData,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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
          <label htmlFor="email"> Enter Your Top-Secret E-mail: </label>
          <input
            name="email"
            type="email"
            placeholder="E-MAIL"
            value={userData.email}
            onChange={handleOnChange}
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
            value={userData.password}
            onChange={handleOnChange}
            autoComplete="off"
          />
          {errors.password && (
            <p className={style.inputerror}>{errors.password}</p>
          )}
        </div>

        <button
          onClick={() => {
            login(userData);
            onNeonTitleActivate();
          }}
          className={style.btn}
          disabled={
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
