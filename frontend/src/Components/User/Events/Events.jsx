import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StickyNavbar } from '../Common/NavBar';
import {   
  Typography,
  Card,
  Button,
  Input,
  CardHeader,
  CardBody,
  CardFooter,
  Tooltip,
} from "@material-tailwind/react"

import { Footer } from '../Common/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosUserInstance } from '../../../Constants/axios';
   
  // function CheckIcon() {
  //   return (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       fill="none"
  //       viewBox="0 0 24 24"
  //       strokeWidth={2}
  //       stroke="currentColor"
  //       className="h-3 w-3"
  //     >
  //       <path
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //         d="M4.5 12.75l6 6 9-13.5"
  //       />
  //     </svg>
  //   );
  // }

function Events() {
  const [data, setData] = useState([]);
  const {name} = useParams()
  const homedata=async()=>{
    try {
      await axiosUserInstance.get(`/eventlist?name=${name}`)
      .then((res) => {
        setData(res.data.managers)
        console.log(res.data);
      })
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    console.log(name);
    homedata()
    console.log('Component is mounted');
  },[]);
  const navigate=useNavigate()
  console.log(data);

  return (
    <div className='main'>
      <div className='content'>
        <StickyNavbar className="sticky"  />
        <div>
          <div className='background-container'>
            <h1 className='main_text'>BIRTHDAYS</h1>
          </div>
        </div>
        <div className='main-content'>
        <div className='flex flex-col align-middle justify-center items-center py-8'>
        <div className="relative flex w-full gap-2 md:w-max">
          <Input
            type="search"
            label="Type here..."
            className="pr-20"
            containerProps={{
              className: "min-w-[288px]",
            }}
          />
          <Button size="sm" className="!absolute right-1 top-1 rounded">
            Search
          </Button>
        </div>
        <div className='flex flex-wrap justify-center pt-10'>
        <Card className="w-full max-w-[17rem] shadow-lg mx-5" onClick={()=>navigate('/eventdata')}>
            <CardHeader floated={false} color="blue-gray">
              <img
                src="https://images.unsplash.com/photo-1524777313293-86d2ab467344?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
                alt="ui/ux review check"
              />
              <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
            </CardHeader>
            <CardBody>
              <div className="mb-3 flex items-center justify-between">
                <Typography variant="h5" color="blue-gray" className="font-medium">
                  FIESTA CATERS
                </Typography>
                <Typography
                  color="blue-gray"
                  className="flex items-center gap-1.5 font-normal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="-mt-0.5 h-5 w-5 text-yellow-700"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                  4.9
                </Typography>
              </div>
              <Typography color="gray">
                <ul>
                  <li>Birthdays</li>
                  <li>Weddings</li>
                  <li>Partys</li>
                </ul>
              </Typography>
              <div className="group mt-5 inline-flex flex-wrap items-center gap-3">
                <Tooltip content="Birthdays">
                  <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                  <img className="h-5 w-5" src="https://icon-library.com/images/cake-icon-png/cake-icon-png-24.jpg" alt="profile-picture" />
                  </span>
                </Tooltip>
                <Tooltip content="Partys">
                  <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                  <img className="h-5 w-5" src="https://icon-library.com/images/party-icon/party-icon-19.jpg" alt="profile-picture" />
                  </span>
                </Tooltip>
                <Tooltip content="Weddings">
                  <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                  <img className="h-5 w-5" src="https://icon-library.com/images/wedding-ceremony-icon/wedding-ceremony-icon-4.jpg" alt="profile-picture" />
                  </span>
                </Tooltip>
              </div>
            </CardBody>
            <CardFooter className="pt-1">
              <Button size="lg" fullWidth={true}>
                Book Your Slot
              </Button>
            </CardFooter>
          </Card>
        <Card className="w-full max-w-[17rem] shadow-lg mx-5">
            <CardHeader floated={false} color="blue-gray">
              <img
                src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="ui/ux review check"
              />
              <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
            </CardHeader>
            <CardBody>
              <div className="mb-3 flex items-center justify-between">
                <Typography variant="h5" color="blue-gray" className="font-medium">
                  CHEERFUL GANG
                </Typography>
                <Typography
                  color="blue-gray"
                  className="flex items-center gap-1.5 font-normal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="-mt-0.5 h-5 w-5 text-yellow-700"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                  4.0
                </Typography>
              </div>
              <Typography color="gray">
                <ul>
                  <li>Birthdays</li>
                  <li>Special Events</li>
                  <li>Partys</li>
                </ul>
              </Typography>
              <div className="group mt-5 inline-flex flex-wrap items-center gap-3">
                <Tooltip content="Birthdays">
                  <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                  <img className="h-5 w-5" src="https://icon-library.com/images/cake-icon-png/cake-icon-png-24.jpg" alt="profile-picture" />
                  </span>
                </Tooltip>
                <Tooltip content="Special Events">
                  <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                  <img className="h-5 w-5" src="https://icon-library.com/images/free-event-icon/free-event-icon-15.jpg" alt="profile-picture" />
                  </span>
                </Tooltip>
                <Tooltip content="Partys">
                  <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                  <img className="h-5 w-5" src="https://icon-library.com/images/party-icon/party-icon-19.jpg" alt="profile-picture" />
                  </span>
                </Tooltip>
              </div>
            </CardBody>
            <CardFooter className="pt-1">
              <Button size="lg" fullWidth={true}>
                Book Your Slot
              </Button>
            </CardFooter>
          </Card>
          {data.map((card,index)=>{
            const coverImage=`/Images/${card.eventData.cover_image}`
            const eventlist=Object.keys(card.eventData.events)
            .filter((key) => card.eventData.events[key] === 'true')
          return(
          <Card className="w-full max-w-[17rem] h-[30rem] shadow-lg mx-5" key={index} onClick={()=>navigate(`/detailpage/${card._id}`)}>
            <CardHeader className='h-[10rem]' floated={false} color="white">
              <img className='align-middle flex justify-center'
                src={coverImage}
                alt="ui/ux review check"
              />
              <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
            </CardHeader>
            <CardBody className='h-[15rem]'>
              <div className="mb-3 flex items-center justify-between">
                <Typography variant="h5" color="blue-gray" className="font-medium">
                {card.eventData.team_name}
                </Typography>
                <Typography
                  color="blue-gray"
                  className="flex items-center gap-1.5 font-normal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="-mt-0.5 h-5 w-5 text-yellow-700"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                  4.1
                </Typography>
              </div>
              <Typography color="gray">
              <ul>
                {
                  eventlist.map((event) => (
                    <li key={event}>{event}</li>
                  ))}
              </ul>

              </Typography>
              <div className="group mt-5 inline-flex flex-wrap items-center gap-3">
              {eventlist.includes('birthday') && (
                <Tooltip content="Birthdays">
                  <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                  <img className="h-5 w-5" src="https://icon-library.com/images/cake-icon-png/cake-icon-png-24.jpg" alt="profile-picture" />
                  </span>
                </Tooltip>)}
                {eventlist.includes('wedding') && (
                <Tooltip content="Weddings">
                  <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                  <img className="h-5 w-5" src="https://icon-library.com/images/wedding-ceremony-icon/wedding-ceremony-icon-4.jpg" alt="profile-picture" />
                  </span>
                </Tooltip>)}
                {eventlist.includes('competition') && (
                <Tooltip content="Competition">
                  <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                  <img className="h-5 w-5" src="https://icon-library.com/images/free-trophy-icon/free-trophy-icon-24.jpg" alt="profile-picture" />
                  </span>
                </Tooltip>)}
                {eventlist.includes('conference') && (
                <Tooltip content="Conference">
                  <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                  <img className="h-5 w-5" src="https://icon-library.com/images/meeting-icon-png/meeting-icon-png-25.jpg" alt="profile-picture" />
                  </span>
                </Tooltip>)}
                {eventlist.includes('specialEvents') && (
                <Tooltip content="Special Events">
                  <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                  <img className="h-5 w-5" src="https://icon-library.com/images/free-event-icon/free-event-icon-15.jpg" alt="profile-picture" />
                  </span>
                </Tooltip>)}
                {eventlist.includes('party') && (
                <Tooltip content="Partys">
                  <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                  <img className="h-5 w-5" src="https://icon-library.com/images/party-icon/party-icon-19.jpg" alt="profile-picture" />
                  </span>
                </Tooltip>)}
              </div>
            </CardBody>
            <CardFooter className="h-[6rem]">
              <Button className='mb-0' size="lg" fullWidth={true}>
                Book Your Slot
              </Button>
            </CardFooter>
          </Card>)})}
          </div>
        </div>
        </div>
      <div>
        <Footer/>
      </div>
      </div>
    </div>
  );
}

export default Events;
