import { Navigate } from "react-router-dom"

function UserProtect(props) {
  if(localStorage.getItem('userInfo')){
    return props.children;
  }else{
    return <Navigate to='/loin'/>
  }
}

export default UserProtect