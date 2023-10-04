import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    Textarea,
  } from "@material-tailwind/react";
import { managerDetail } from '../../../actions/ManagerActions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function EventData() {

    const dispatch=useDispatch()

    const navigate = useNavigate();
    const [eventdata, setEventData] = useState({
      team_name: '',
      salutation: '',
      about: '',
      cover_image:{},
      events: {},
      multipleImages:[],
      location: '',
      dishes: '',
      advance_amount: 0,
    });
  
    // const GenerateError = (err) => {
    //   toast.error(err, {
    //     position: 'top-center',
    //     theme: 'colored',
    //     autoClose: 3000
    //   });
    // };

    const [events, setEvents] = useState({
        wedding:false,
        birthday:false,
        party:false,
        competition:false,
        conference:false,
        specialEvents:false
    });
    
    const [img,setImg]=useState([])
    useEffect(()=>{
        setEvents({
            wedding: false,
            birthday: false,
            party: false,
            competition: false,
            conference: false,
            specialEvents: false,
          });
          setImg([])
          console.log(events);
          console.log(img);
    },[])
  
    const handleEvents = async (eventName) => {
        setEvents((prevEvents) => ({
            ...prevEvents,
            [eventName]: !prevEvents[eventName],
        }));
        console.log(events);
        setEventData({ ...eventdata, events });
    };
    

    const formData = new FormData();
    const handleImages = async (e) => {
    
      try {
        console.log('fdgf');
        const fileArray=[]
        const files = Array.from(e.target.files);
        files.forEach((file) => {
            fileArray.push(file)
        })
        console.log(files);
        console.log('hjg');
        setImg(()=>fileArray)
        console.log(fileArray);
        console.log(img);
        setEventData({...eventdata,[e.target.name]:fileArray})
      } catch (error) {
        console.log(error.message);
      }
    }

    const handleDeleteImage=(index) => {
        const updatedImg = [...img];
        updatedImg.splice(index, 1);
        setImg(() => [ ...updatedImg])
        console.log(img);
        setEventData({...eventdata,profileImage:img})
        console.log(eventdata);
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
            console.log(eventdata);
            const response= await dispatch(managerDetail(eventdata,formData))
            console.log(response);
            if (response.status) {
                localStorage.setItem('managerToken',response.token)
                navigate('/manager/home/');
            } else {
              navigate('/manager/eventdata');
            }
      }

  return (
    <div className=''>

        <div className='flex justify-center items-center h-screen' >
            <div>  
        <Card color="transparent" className='m-0 grid place-items-center shadow-lg rounded-b-none py-8 px-4 text-center' floated={false} shadow={false} style={{border:'1px solid grey-50'}}>
        <Typography variant="h4" color="blue-gray">
            Handle event
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
            Enter your details to register.
        </Typography>
        <form className="mt-8 mb-2 w-200 max-w-screen-lg sm:w-200" onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-4 flex flex-col gap-6">
                <div className='flex flex-row gap-2 justify-center'>
                <Input size="lg" label="Name" name='team_name' onChange={(e)=>setEventData({...eventdata,[e.target.name]:e.target.value})} />
                <Input size="lg" label="Salutation" name='salutation' onChange={(e)=>setEventData({...eventdata,[e.target.name]:e.target.value})} />
                </div>
            <Textarea size="lg" label="About" name='about' onChange={(e)=>setEventData({...eventdata,[e.target.name]:e.target.value})} />
                <div className='flex flex-wrap w-20'>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Add cover image</label>
                <input name='cover_image' onChange={(e)=>setEventData({...eventdata,[e.target.name]:e.target.files[0]},console.log(e.target.files[0]))} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"></input>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Add Multiple images</label>
                <input type="file" multiple name="profileImage" onChange={handleImages} />
                {img.map((file, index) => (
          <img
            src={URL.createObjectURL(file)}
            alt={`Image ${index + 1}`}
            key={index}
            className='h-5 w-5'
            onClick={() => handleDeleteImage(index)}
          />
        ))}
                </div>
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
                    <Input size="lg" type='number' label="Advance Amount" name='advance_amount' onChange={(e)=>setEventData({...eventdata,[e.target.name]:e.target.value})} />
                </div>
            </div>
            <Button className="mt-6" fullWidth type='submit'>
            Add/ Update Data
            </Button>
        </form>
        </Card>
        <ToastContainer />
        </div>
        </div>
    </div>
  )
}

export default EventData