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
import { axiosManagerInstance } from '../../../Constants/axios';
import { useQuery } from '@tanstack/react-query';

function EventData() {

    const dispatch=useDispatch()

    const navigate = useNavigate();
    const [eventdata, setEventData] = useState({
      team_name: '',
      salutation: '',
      about: '',
      location: '',
      dishes: '',
      profileImage:[],
      events:[],
      advance_amount: 0,
    });
  
    // const GenerateError = (err) => {
    //   toast.error(err, {
    //     position: 'top-center',
    //     theme: 'colored',
    //     autoClose: 3000
    //   });
    // };

    const [data,setEventdata]=useState([])
    
    const [img,setImg]=useState([])
    const { isLoading, error, } = useQuery({
        queryKey: ['eventdata'],
        queryFn: async () => {
          try {
            const response = await axiosManagerInstance.get('/geteventdata').then((res)=>setEventdata(res.data.eventData))
            console.log(response);
            console.log(response.data.eventData);
          } catch (err) {
            console.error(err.message);
            // Handle error here
          }
        },
      });
      const [events, setEvents] = useState([]);
      
    useEffect(()=>{
          console.log(events);
          console.log(img);
    },[])

    useEffect(() => {
        console.log(eventdata); // Log the updated img state here
      }, [eventdata])

    const handleEvents = (eventName) => {
        if (!events.includes(eventName)) {
            events.push(eventName)
        //   setEvents((prevEvents) => [...prevEvents, eventName]);
          console.log(events);
          setEventData((eventdata) =>({...eventdata,events}))
        } else {
            const indexToRemove = events.indexOf(eventName);
            if (indexToRemove !== -1) {
            events.splice(indexToRemove, 1);
            }
        //   setEvents((prevEvents) => prevEvents.filter((event) => event !== eventName));
        console.log(events);
          setEventData({...eventdata,events:events})
        }
      };
    

    const formData = new FormData();
    const handleImages = async (e) => {
    
      try {
        console.log('jkhj');
            const selectedFiles = e.currentTarget.files;
            console.log(selectedFiles);
            const fileArray = Array.from(selectedFiles)
        console.log(fileArray);
        // const fileArray=[]
        // const files = Array.from(e.target.files);
        // files.forEach((file) => {
        //     fileArray.push(file)
        // })
        // console.log(files);
        // console.log('hjg');
        // console.log(fileArray);
        // for (let i = 0; i < fileArray.length; i++) {
        //     console.log(fileArray[i]);
        //     formData.append("images", fileArray[i]);
        //   }
        setImg((prevImg) => [...prevImg, ...fileArray])
        console.log(img);
        setEventData({ ...eventdata, [e.target.name]: img });
        console.log(eventdata);
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
            setEventData({...eventdata,events:events})
            
            // formData.append('events',events)
            // formData.append('eventdata',eventdata)
            // let form=JSON.stringify(formData)
            // console.log(form);
            // for (const [key, value] of formData.entries()) {
            //     console.log(key, value);
            //   }
            //   formData.forEach((value, key) => {
            //     console.log(key, value);
            //   })
            const response= await dispatch(managerDetail(eventdata,formData))
            console.log(response);
            if (response.status) {
                localStorage.setItem('managerToken',response.token)
                navigate('/manager/');
            } else {
              navigate('/manager/eventdata');
            }
      }

  return (
    <div className='w-400 md:w-200'>

        <div className='flex justify-center items-center my-9' >
        <Card color="transparent" className='m-0 grid place-items-center shadow-lg rounded-b-none py-8 px-4 text-center sm:w-100' floated={false} shadow={false} style={{border:'1px solid grey-50'}}>
        <Typography variant="h4" color="blue-gray">
            Handle event
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
            Enter your details to register.
        </Typography>
        <form className="mt-8 mb-2 lg:w-200 max-w-screen-lg sm:w-200" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4 flex flex-col gap-6">
            <div className='flex flex-col lg:flex-row gap-2 justify-center'>
            <div className='flex flex-col lg:flex-row gap-2'>
                <Input size="lg" label="Name" name='team_name' onChange={(e) => setEventData({ ...eventdata, [e.target.name]: e.target.value })} />
                <Input size="lg" label="Salutation" name='salutation' onChange={(e) => setEventData({ ...eventdata, [e.target.name]: e.target.value })} />
            </div>
            <Input size="lg" type='number' label="Advance Amount" name='advance_amount' onChange={(e) => setEventData({ ...eventdata, [e.target.name]: e.target.value })} />
            </div>
            <Textarea size="lg" label="About" name='about' onChange={(e) => setEventData({ ...eventdata, [e.target.name]: e.target.value })} />
            <div className='flex flex-wrap w-20'>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Add cover image</label>
            <input name='cover_image' onChange={(e) => setEventData({ ...eventdata, [e.target.name]: e.target.files[0] }, console.log(e.target.files[0]))} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"></input>
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
            {data.map((item, index) => (
                <Checkbox
                key={index}
                name={item.event_name}
                onChange={(e) => handleEvents(e.target.name)}
                label={
                    <Typography
                    variant="small"
                    color="gray"
                    className="flex items-center mr-5 font-normal"
                    >
                    {item.event_name}
                    </Typography>
                }
                containerProps={{ className: "-ml-2.5" }}
                />
            ))}
            </div>
            <div className='flex flex-col lg:flex-row gap-2 justify-center'>
            <Input size="lg" label="Available Dishes" name='dishes' onChange={(e) => setEventData({ ...eventdata, [e.target.name]: e.target.value })} />
            <Input size="lg" label="Available Locations" name='location' onChange={(e) => setEventData({ ...eventdata, [e.target.name]: e.target.value })} />
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
  )
}

export default EventData