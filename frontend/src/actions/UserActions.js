import {
    USER_REGISTER_REQUEST,
    USER_REGISTER_FAIL,
    USER_REGISTER_SUCCESS,
    USER_LOGIN_REQUEST,
    USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_SUCCESS,
    USER_LOGOUT,
    USER_GOOGLE_LOGIN_REQUEST,
    USER_GOOGLE_LOGIN_SUCCESS,
    USER_GOOGLE_LOGIN_FAIL,
} from '../Constants/userConstants'

import { axiosUserInstance } from "../Constants/axios";



export const userReg= (name, mob, email, password)=>async(dispatch)=>{
    try {
        dispatch({
            type: USER_REGISTER_REQUEST,
          });
    
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
    
          const { data } = await axiosUserInstance.post(
            "/signup",
            { name, mob, email, password },
            config
          );
          console.log(data.status);
          localStorage.setItem("userInfo", JSON.stringify(data));
          dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data,
          });
          return data
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
          return error
    }
}
export const userLogin= (email, password)=>async(dispatch)=>{
    try {
      console.log(email,password);
        dispatch({
            type: USER_LOGIN_REQUEST,
          });
    
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
    
          const { data } = await axiosUserInstance.post(
            "/login",
            { email, password },
            config
          );
          console.log(data);
          localStorage.setItem("userInfo", JSON.stringify(data));
          
          dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
          });
          return data
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
          return error
    }
}
export const userGoogleLogin= (value)=>async(dispatch)=>{
    try {
      console.log('heyy');
      console.log(value);
        dispatch({
            type: USER_GOOGLE_LOGIN_REQUEST,
          });
    
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          const values = {
            name: value.given_name,
            email: value.email,
            password: value.id,
        }
    
          const { data } = await axiosUserInstance.post(
            "/googlelogin", values ,
            config
          );
          console.log(data);
          localStorage.setItem("userInfo", JSON.stringify(data));
          dispatch({
            type: USER_GOOGLE_LOGIN_SUCCESS,
            payload: data,
          });
          return data
    } catch (error) {
        dispatch({
            type: USER_GOOGLE_LOGIN_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
          return error
    }
}

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log('heyyy');
    const { data } = await axiosUserInstance.patch(
      '/forgotpas',
      { email },
      config
    );
      console.log('done');
    console.log(data);

    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      message: data,
    });
    console.log(data);
    return data
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      error: error,
    });
    return error
  }
};

export const forgotPasswordVerify =
  (email, otp, password) => async (dispatch) => {
    try {
      dispatch({
        type: RESET_PASSWORD_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axiosUserInstance.patch(
        '/verifypassword',
        { email, otp, password },
        config
      );

      console.log(data);

      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        message: data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: RESET_PASSWORD_FAIL,
        error: error,
      });
    }
  };

export const LogoutDetails = ()=> async (dispatch)=>{
  try {
    dispatch({
      type: USER_LOGOUT,
    });

    localStorage.removeItem("userInfo");
  } catch (error) {
    console.log(error.message);
  }
}