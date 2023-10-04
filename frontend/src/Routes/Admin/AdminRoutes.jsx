import {Routes, Route} from 'react-router-dom'
import AdminLogIn from '../../Components/Admin/AdminLogin/AdminLogin'
import AdminPublic from './AdminPublic'
import AdminHome from '../../Components/Admin/Home/AdminHome'
import AdminProtect from './AdminProtect'
import LayOut from '../../Components/Admin/LayOut/LayOut'
import UserData from '../../Components/Admin/UserData/UserData'

let routeObj={
  dashboard:'/dashboard',
  userdata:'/userdata',
  login:'/login',
}

function AdminRoutes() {
  return (
        <Routes>

          <Route element={ <AdminPublic/>} >
            <Route exact path={routeObj.login} element={ <AdminLogIn/> } />
          </Route>
          <Route element={ <AdminProtect/>} >
            <Route  path="/" element={ <LayOut> </LayOut> }>
              <Route index element={  <AdminHome/> } />
              <Route path={routeObj.dashboard} element={ <AdminHome/> } />
              <Route path={routeObj.userdata} element={ <UserData/> } />
            </Route>
          </Route>
        </Routes>
  )
}

export default AdminRoutes