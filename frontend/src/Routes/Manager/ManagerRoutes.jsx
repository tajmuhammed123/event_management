import {Routes, Route} from 'react-router-dom'
import Home from '../../Components/Manager/Home/Home'
import ManagerSignUp from '../../Components/Manager/SignUp/ManagerSignUp'
import EventData from '../../Components/Manager/SignUp/EventData'
import LogIn from '../../Components/Manager/Login/Login'
import EmailVerified from '../../Components/Manager/Common/EmailVerified'
import ManagerPublic from './ManagerPublic'
import ManagerProtect from './ManagerProtect'
import Bookings from '../../Components/Manager/Bookings/Bookings'
import LayOut from '../../Components/Manager/LayOut/LayOut'
import { Profile } from '../../Components/Manager/Profile/Profile'
import ChatList from '../../Components/Manager/Chat/ChatList'

function ManagerRoutes() {
  let routeObj={
    login:'/login',
    signup:'/signup',
    eventdata:'/eventdata',
    bookings:'/bookings',
    profile:'/profile',
    managerverify:'/managerverify/:id',
    chat:'/chat',
  }
  return (
    <Routes>
      <Route path={routeObj.login} element={<ManagerPublic><LogIn/></ManagerPublic>}></Route>
        <Route path="/" element={ <LayOut/>}>
          <Route path={routeObj.signup} element={<ManagerSignUp/>}></Route>
          <Route path={routeObj.eventdata} element={<ManagerProtect><EventData/></ManagerProtect>}></Route>
          <Route index element={<ManagerProtect><Home/></ManagerProtect>}></Route>
          <Route path={routeObj.managerverify} element={<EmailVerified/>}></Route>
          <Route path={routeObj.bookings} element={<Bookings/>}></Route>
          <Route path={routeObj.profile} element={<ManagerProtect><Profile /></ManagerProtect>}></Route>
          <Route path={routeObj.chat} element={<ChatList />}></Route>
        </Route>
    </Routes>
  )
}

export default ManagerRoutes