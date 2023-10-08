import {BrowserRouter,Route,Routes} from "react-router-dom"
import UserRouter from "./Routes/User/UserRouter";
import AdminRoutes from "./Routes/Admin/AdminRoutes";
import ManagerRoutes from "./Routes/Manager/ManagerRoutes";
import io from 'socket.io-client'

const socket=io.connect('http://localhost:4000')

function App() {
  return (
  <BrowserRouter>
    <Routes>
       <Route path="/*" element={<UserRouter/>}/>
       <Route path="/admin/*" element={<AdminRoutes/>}/>
       <Route path="/manager/*" element={<ManagerRoutes/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
