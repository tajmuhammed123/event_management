import {    
    ADMIN_LOGIN_SUCCESS,
    ADMIN_LOGIN_REQUEST,
    ADMIN_LOGIN_FAIL,
    ADMIN_LOGOUT
    } from '../Constants/AdminConstants' 

import { axiosAdminInstance } from "../Constants/axios";

export const adminLogin= (email, password)=>async(dispatch)=>{
    try {
      console.log(email,password);
        dispatch({
            type: ADMIN_LOGIN_REQUEST,
          });
    
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
    
          const { data } = await axiosAdminInstance.post(
            "/login",
            { email, password },
            config
          );
          console.log(data);
          localStorage.setItem("adminInfo", JSON.stringify(data));
          dispatch({
            type: ADMIN_LOGIN_SUCCESS,
            payload: data,
          });
          return data
    } catch (error) {
        dispatch({
            type: ADMIN_LOGIN_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
          return error
    }
  }

  export const AdminLogoutDetails = ()=> async (dispatch)=>{
    try {
      dispatch({
        type: ADMIN_LOGOUT,
      });
  
      localStorage.removeItem("adminInfo");
    } catch (error) {
      console.log(error.message);
    }
  }