import { useState } from "react";


const SearchBar = ({onSearch}) => {
   let [id,setId] = useState('');

   const handleChange = (event) =>{
   setId(event.target.value)
   }


   return (
      <div>
        <input type="search" value={id} onChange={handleChange}/>
        <button onClick={() => {onSearch(id); setId('')}}>ADD</button> 
      </div>
   )
};


export default SearchBar;