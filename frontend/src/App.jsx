import {BrowserRouter,Route,Routes} from "react-router-dom"
import UserRouter from "./Routes/User/UserRouter";
import AdminRoutes from "./Routes/Admin/AdminRoutes";
import ManagerRoutes from "./Routes/Manager/ManagerRoutes";

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
