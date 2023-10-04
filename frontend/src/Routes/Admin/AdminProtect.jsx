import { Navigate, Outlet } from "react-router-dom"

function AdminProtect() {
  if(localStorage.getItem('adminInfo')){
    return <Outlet />;
  }else{
    return <Navigate to='/admin/'/>
  }
}

export default AdminProtect