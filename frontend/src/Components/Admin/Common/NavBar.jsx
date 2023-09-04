import {
    Navbar,
    Typography,
    IconButton,
    Button,
  } from "@material-tailwind/react";
  import { BellIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AdminLogoutDetails } from "../../../actions/AdminActions";
   
  export function AdminNavbar() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const handleLogOut = async () => {
        dispatch(
          AdminLogoutDetails()
        );
        navigate("/admin/");
      };
    return (
      <Navbar
        variant="gradient"
        color="blue-gray"
        className="mx-auto from-blue-gray-900 to-blue-gray-800 py-3"
        style={{maxWidth: "none", borderRadius:'0'}}
      >
        <div className="flex flex-wrap items-center justify-between text-white">
          <Typography
            as="a"
            href="#"
            variant="h6"
            className="mr-4 ml-2 cursor-pointer py-1.5"
          >
            DASHBOARD
          </Typography>
          <div className="ml-auto flex gap-1 md:mr-4">
            <IconButton variant="text" color="white">
              <Cog6ToothIcon className="h-4 w-4" />
            </IconButton>
            <IconButton variant="text" color="white">
              <BellIcon className="h-4 w-4" />
            </IconButton>
          </div>
          <div className="flex flex-nowrap items-center gap-2">
          <Button variant="gradient" size="sm" fullWidth onClick={()=>handleLogOut()}>
            LogOut
          </Button>
        </div>
        </div>
      </Navbar>
    );
  }