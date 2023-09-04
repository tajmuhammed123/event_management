import { 
    MANAGER_LOGOUT,
    MANAGER_REGISTER_FAIL, 
    MANAGER_REGISTER_REQUEST,
    MANAGER_REGISTER_SUCCESS 

    } from "../Constants/ManagerConstants";

export const managerRegisterReducer = (state = { loading: false, user: {}, error: null }, action) => {
    switch (action.type) {
      case MANAGER_REGISTER_REQUEST:
        return { ...state, loading: true };
  
      case MANAGER_REGISTER_SUCCESS:
        return { ...state, loading: false, user: action.payload, error: null };
  
      case MANAGER_REGISTER_FAIL:
        return { ...state, loading: false, error: action.payload };

      case MANAGER_LOGOUT:
        return {};
  
      default:
        return state;
    }
};
