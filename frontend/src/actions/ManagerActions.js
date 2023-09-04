

import { 
    MANAGER_LOGOUT, 
    MANAGER_REGISTER_FAIL, 
    MANAGER_REGISTER_REQUEST, 
    MANAGER_REGISTER_SUCCESS 
    } from "../Constants/ManagerConstants";
import { axiosManagerInstance } from "../Constants/axios";

export const managerReg= (name, mob, email, password)=>async(dispatch)=>{
    try {
        dispatch({
            type: MANAGER_REGISTER_REQUEST,
          });
    
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
    
          const { data } = await axiosManagerInstance.post(
            "/signup",
            { name, mob, email, password },
            config
          );
          console.log(data.status);
          localStorage.setItem("managerInfo", JSON.stringify(data));
          dispatch({
            type: MANAGER_REGISTER_SUCCESS,
            payload: data,
          });
          return data
    } catch (error) {
        dispatch({
            type: MANAGER_REGISTER_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
          return error
    }
}

export const LogoutDetails = ()=> async (dispatch)=>{
    try {
      dispatch({
        type: MANAGER_LOGOUT,
      });
  
      localStorage.removeItem("managerInfo");
    } catch (error) {
      console.log(error.message);
    }
  }