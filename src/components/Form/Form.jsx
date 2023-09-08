import { useState } from "react"
import validation from "./Validation"

const Form = ({login}) => {
let [userData, setUserData] = useState({
    email:'',
     password: ''
})

let [errors, setErrors] = useState({})

const handleOnChange = (event) =>{
setUserData ({
    ...userData,
    [event.target.name]: event.target.value
})
setErrors(validation({
    ...userData,
    [event.target.name]: event.target.value
}))
}

const handleSubmit = (event) =>{
event.preventDefault();
login(userData)
}

return (
    <form onSubmit={handleSubmit}>
        <h2>Aca va a ir un titulo cuando se me ocurra algo</h2>
        <label htmlFor="email"> Enter Your Top-Secret E-mail: </label>
        <input name= 'email' type="email" placeholder="E-mail" value = {userData.email} onChange={handleOnChange} />
        {errors.email && <p>{errors.email}</p>}

        <label htmlFor="password">Enter Your Top-Secret Password:  </label>
        <input name= 'password' type="password" placeholder="Password" value = {userData.password} onChange={handleOnChange} />
        {errors.password && <p>{errors.password}</p>}

        <button disabled = {!userData.email || !userData.password || errors.email || errors.password}>START</button>
    </form>
)
}


export default Form;