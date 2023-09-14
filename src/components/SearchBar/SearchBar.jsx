import { useState } from "react";
import style from "./SearchBar.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import{faBars} from "@fortawesome/free-solid-svg-icons"

const SearchBar = ({onSearch}) => {
   let [id,setId] = useState('');

   const handleChange = (event) =>{
   setId(event.target.value)
   }


   return (
      <div className={style.container}>
         <FontAwesomeIcon icon={faBars} className={style.icon}/>
        <input className={style.search} type="search" value={id} onChange={handleChange} />
        <button onClick={() => {onSearch(id); setId('')}} className={style.button}>ADD</button>
      
      </div>
   )
};


export default SearchBar;