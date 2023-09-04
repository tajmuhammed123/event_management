import {BrowserRouter,Route,Routes} from "react-router-dom"
import UserRouter from "./Routes/UserRouter";
import AdminRoutes from "./Routes/AdminRoutes";
import ManagerRoutes from "./Routes/ManagerRoutes";

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
