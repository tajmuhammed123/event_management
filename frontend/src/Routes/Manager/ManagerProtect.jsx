import { Navigate } from 'react-router-dom';

function ManagerProtect(props) {
    if(localStorage.getItem('managerInfo')){
        return props.children;
      }else{
        return <Navigate to='/manager/'/>
      }
}

export default ManagerProtect