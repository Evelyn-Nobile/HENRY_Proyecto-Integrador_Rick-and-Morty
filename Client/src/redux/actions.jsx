import { ADD_FAV, REMOVE_FAV, FILTER, ORDER } from "./action-types";
import axios from 'axios';
const endpoint = 'http://localhost:3001/rickandmorty/fav';//url de nuestro servidor
//Conecto back y front
export const addFav = (character) => {
  //return { type: ADD_FAV, payload: character };
  
      return async (dispatch) => {
         try {
          const {data} = await axios.post(endpoint, character)
          if(!data.length) throw Error ("There isn't favorites")
          return dispatch({
            type: ADD_FAV,
            payload: data,
         });
         } catch (error) {
            console.log(error.message)
         }
      }
   }    
      

export const removeFav = (id) => {
  //return { type: REMOVE_FAV, payload: id };
 
  return async (dispatch) => {
   try {
      const {data} = await axios.delete(`${endpoint}/${id}`)
     // if(!data.length) throw Error ("There isn't favorites")
      return dispatch({
         type: REMOVE_FAV,
         payload: data,
   });
   } catch (error) {
      
   }
    
   
       
     
  };
};

export const filterCards = (gender) => {
  return { type: FILTER, payload: gender };
};

export const orderCards = (order) => {
  return { type: ORDER, payload: order };
};
