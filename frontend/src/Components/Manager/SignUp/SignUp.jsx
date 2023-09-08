import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userReg } from '../../../actions/UserActions';
import { ToastContainer, toast } from 'react-toastify';
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  CardHeader,
  CardBody,
  Textarea,
  TabPanel,
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
} from '@material-tailwind/react';
import './SignUp.css';

import 'react-toastify/dist/ReactToastify.css'
import { managerReg } from '../../../actions/ManagerActions';

function ManagerSignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState({
    name: '',
    mob: '',
    email: '',
    password: '',
  });
  const [eventdata, setEventData] = useState({
    team_name: '',
    salutation: '',
    about: '',
    events: {},
    location: '',
    dishes: '',
  });

  const GenerateError = (err) => {
    toast.error(err, {
      position: 'top-center',
      theme: 'colored',
      autoClose: 3000
    });
  };

  const [events, setEvents] = useState({
      wedding:false,
      birthday:false,
      party:false,
      competition:false,
      conference:false,
      specialEvents:false
  });

  const handleEvents = async (eventName) => {

    setEvents({
      ...events,
      [eventName]: !events[eventName],
  });
  setEventData({...eventdata,events})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, email, password } = value;
      if (!email) {
        GenerateError('Your email cannot be null')
      } else if (!password) {
        GenerateError('Your password cannot be null')
      } else {
        
        console.log(value,eventdata);
        const response= await dispatch(managerReg(value,eventdata))
        console.log(response);
        if (response.status) {
            localStorage.setItem('managerToken',response.token)
            navigate('/manager/home/');
        } else {
          navigate('/manager/signup');
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  const [type, setType] = React.useState("signup")

  return (
    <div className="main flex justify-center items-center h-screen" >

<CardBody>
<Tabs value={type} className="overflow-visible">
  <TabsHeader className="relative z-0 ">
    <Tab value="signup" onClick={() => setType("signup")}>
      SignUp
    </Tab>
    <Tab value="eventdata" onClick={() => setType("eventdata")}>
      Event Data
    </Tab>
  </TabsHeader>
  <TabsBody
    className="!overflow-x-hidden"
    animate={{
      initial: {
        x: type === "signup" ? 400 : -400,
      },
      mount: {
        x: 0,
      },
      unmount: {
        x: type === "signup" ? 400 : -400,
      },
    }}
  >
    <TabPanel value="signup" className="p-0">
    <div className="flex flex-col sm:flex-row ">
          <CardBody className="sm:w-full imagewidth">
            <Typography variant="h4" color="blue-gray">
              Sign Up
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Enter your details to register.
            </Typography>
        <form className="mt-8 mb-2 w-full max-w-[48rem] sm:w-[24rem]" onSubmit={handleSubmit}>
              <div className="mb-4 flex flex-col gap-6">
                <Input size="lg" label="Name" name='name' onChange={(e)=>setValue({...value,[e.target.name]:e.target.value})} />
                <Input size="lg" label="Mobile" name='mob' onChange={(e)=>setValue({...value,[e.target.name]:e.target.value})} />
                <Input size="lg" label="Email" name='email' onChange={(e)=>setValue({...value,[e.target.name]:e.target.value})} />
                <Input type="password" size="lg" label="Password" name='password' onChange={(e)=>setValue({...value,[e.target.name]:e.target.value})} />
              </div>
              <Checkbox
                label={
                  <Typography
                    variant="small"
                    color="gray"
                    className="flex items-center font-normal"
                  >
                    I agree the{' '}
                    <a
                      href="#"
                      className="font-medium transition-colors hover:text-gray-900"
                    >
                      &nbsp;Terms and Conditions
                    </a>
                  </Typography>
                }
                containerProps={{ className: '-ml-2.5' }}
              />
              <Button className="mt-6" fullWidth onClick={() => setType("eventdata")}>
                Continue
              </Button>
              <Typography color="gray" className="mt-4 text-center font-normal">
                Already have an account?{' '}
                <a href="#" onClick={()=>navigate('/login')} className="font-medium text-gray-900">
                  Sign In
                </a>
              </Typography>
        </form>
        </CardBody>
      </div>  
    </TabPanel>
    <TabPanel value="eventdata" className="p-0">
        <form className="mt-8 mb-2 w-200 max-w-screen-lg sm:w-200" onSubmit={handleSubmit}>
            <div className="mb-4 flex flex-col gap-6">
                <div className='flex flex-row gap-2 justify-center'>
                <Input size="lg" label="Name" name='team_name' onChange={(e)=>setEventData({...eventdata,[e.target.name]:e.target.value})} />
                <Input size="lg" label="Salutation" name='salutation' onChange={(e)=>setEventData({...eventdata,[e.target.name]:e.target.value})} />
                </div>
            <Textarea size="lg" label="About" name='about' onChange={(e)=>setEventData({...eventdata,[e.target.name]:e.target.value})} />
            <div className='flex flex-wrap w-full'>
            <Checkbox
            name='wedding'
            onChange={(e)=>handleEvents(e.target.name)}
                label={
                    <Typography
                    variant="small"
                    color="gray"
                    className="flex items-center mr-5 font-normal"
                    >
                    Wedding
                    </Typography>
                }
                containerProps={{ className: "-ml-2.5" }}
                />
                <Checkbox
                name='birthday'
                onChange={(e)=>handleEvents(e.target.name)}
                label={
                    <Typography
                    variant="small"
                    color="gray"
                    className="flex items-center mr-5 font-normal"
                    >
                    Birthdays
                    </Typography>
                }
                containerProps={{ className: "-ml-2.5" }}
                />
                <Checkbox
                name='party'
                onChange={(e)=>handleEvents(e.target.name)}
                label={
                    <Typography
                    variant="small"
                    color="gray"
                    className="flex items-center mr-5 font-normal"
                    >
                    Party
                    </Typography>
                }
                containerProps={{ className: "-ml-2.5" }}
                />
            <Checkbox
            name='competition'
            onChange={(e)=>handleEvents(e.target.name)}
                label={
                    <Typography
                    variant="small"
                    color="gray"
                    className="flex items-center mr-5 font-normal"
                    >
                    Competition
                    </Typography>
                }
                containerProps={{ className: "-ml-2.5" }}
                />
                <Checkbox
                name='conference'
                onChange={(e)=>handleEvents(e.target.name)}
                label={
                    <Typography
                    variant="small"
                    color="gray"
                    className="flex items-center mr-5 font-normal"
                    >
                    Conference
                    </Typography>
                }
                containerProps={{ className: "-ml-2.5" }}
                />
                <Checkbox
                name='specialEvents'
                onChange={(e)=>handleEvents(e.target.name)}
                label={
                    <Typography
                    variant="small"
                    color="gray"
                    className="flex items-center mr-5 font-normal"
                    >
                    Special Events
                    </Typography>
                }
                containerProps={{ className: "-ml-2.5" }}
                />
            </div>
                <div className='flex flex-row gap-2 justify-center'>
                    <Input size="lg" label="Available Dishes" name='dishes' onChange={(e)=>setEventData({...eventdata,[e.target.name]:e.target.value})} />
                    <Input size="lg" label="Available Locations" name='location' onChange={(e)=>setEventData({...eventdata,[e.target.name]:e.target.value})} />
                </div>
            </div>
            <Button className="mt-6" fullWidth type='submit'>
            Register
            </Button>
        </form>
    </TabPanel>
  </TabsBody>
</Tabs>
</CardBody>

      <ToastContainer />
    </div>
  );
}

export default ManagerSignUp;