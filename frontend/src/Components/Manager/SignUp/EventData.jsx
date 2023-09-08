import React from 'react'
import { useState } from 'react';

import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    Textarea,
  } from "@material-tailwind/react";
import { managerDetailReg } from '../../../actions/ManagerActions';
import { useDispatch } from 'react-redux';

function EventData() {
    const [name, setName] = useState('');
    const [salutation, setSalutation] = useState('');
    const [about, setAbout] = useState('');
    const [events, setEvents] = useState({
        wedding:false,
        birthday:false,
        party:false,
        competition:false,
        conference:false,
        specialEvents:false
    });
    const [location, setLocation] = useState('');
    const [dishes, setDishes] = useState('');

    const dispatch=useDispatch()

    const handleEvents=async(eventName)=>{
        console.log(eventName);
        setEvents({
            ...events,
            [eventName]: !events[eventName],
          });
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        console.log('heko');
        try {
            const response= await dispatch(managerDetailReg(name,salutation,about,events,location,dishes))
            console.log(response);
        } catch (error) {
            console.log(error.message);
        }
    }

  return (
    <div className=''>

        <div className='flex justify-center items-center h-screen' >
            <div>  
        <Card color="transparent" className='m-0 grid place-items-center shadow-lg rounded-b-none py-8 px-4 text-center' floated={false} shadow={false} style={{border:'1px solid grey-50'}}>
        <Typography variant="h4" color="blue-gray">
            Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
            Enter your details to register.
        </Typography>
        <form className="mt-8 mb-2 w-200 max-w-screen-lg sm:w-200" onSubmit={handleSubmit}>
            <div className="mb-4 flex flex-col gap-6">
                <div className='flex flex-row gap-2 justify-center'>
                <Input size="lg" label="Name" onChange={(e)=>setName(e.target.value)} />
                <Input size="lg" label="Salutation" onChange={(e)=>setSalutation(e.target.value)} />
                </div>
            <Textarea size="lg" label="About" onChange={(e)=>setAbout(e.target.value)} />
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
                    <Input size="lg" label="Available Dishes" onChange={(e)=>setDishes(e.target.value)} />
                    <Input size="lg" label="Available Locations" onChange={(e)=>setLocation(e.target.value)} />
                </div>
            </div>
            <Button className="mt-6" fullWidth type='submit'>
            Add/Update
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <a href="#" className="font-medium text-gray-900">
                Sign In
            </a>
            </Typography>
        </form>
        </Card>
        </div>
        </div>
    </div>
  )
}

export default EventData