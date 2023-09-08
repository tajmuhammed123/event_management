
import { 
    MANAGER_EVENT_DATA_FAIL,
    MANAGER_EVENT_DATA_REQUEST,
    MANAGER_EVENT_DATA_SUCCESS,
    MANAGER_LOGOUT, 
    MANAGER_REGISTER_FAIL, 
    MANAGER_REGISTER_REQUEST, 
    MANAGER_REGISTER_SUCCESS 
    } from "../Constants/ManagerConstants";
import { axiosManagerInstance } from "../Constants/axios";

export const managerReg= (value,eventdata)=>async(dispatch)=>{
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
            { value,eventdata },
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

export const managerDetailReg = (name,salutation,about,events,location,dishes)=>async(dispatch)=>{
    try {

      const tokenId = JSON.parse(localStorage.getItem("managerInfo"))
        dispatch({
            type: MANAGER_EVENT_DATA_REQUEST,
            Authorization: `Bearer ${tokenId.token}`
        })

        const config={
          headers: {
            "Content-Type":"application/json"
          }
        }
        console.log({name,salutation,about,events,location,dishes});
        console.log(tokenId.user._id);
        const {data} =await axiosManagerInstance.post(
         `/eventdata/${tokenId.user._id}`,
          {name,salutation,about,events,location,dishes},
          config
        )

        dispatch({
          type: MANAGER_EVENT_DATA_SUCCESS,
          payload:data
        })
        return data                                                                                                                                                                                                                                                                                                                             
    } catch (error) {
      dispatch({
        type: MANAGER_EVENT_DATA_FAIL,
        payload:error
      })
      return error
    }
}