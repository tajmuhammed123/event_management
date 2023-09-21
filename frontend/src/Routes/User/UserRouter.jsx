import {Routes, Route} from 'react-router-dom'
import SignUp from '../../Components/User/SignUp/SignUp'
import LogIn from '../../Components/User/Login/Login'
import Home from '../../Components/User/Home/Home'
import About from '../../Components/User/AboutPage/About'
import Events from '../../Components/User/Events/Events'
import UserPublic from './UserPublic'
import EmailVerified from '../../Components/User/Common/EmailVerified'
import EventBooking from '../../Components/User/Events/EventBooking'

function UserRouter() {
  return (
    <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/detailpage/:id" element={<About />}></Route>
        <Route path="/eventlist/:name" element={<Events />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<UserPublic> <LogIn /></ UserPublic>}></Route>
        <Route path='/verifyemail/:id' element={<EmailVerified />}></Route>
        <Route path='/eventbooking/:id' element={<EventBooking />}></Route>
    </Routes>
  )
}

export default UserRouter