import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { SidebarWithCta } from '../Common/SideBar';
import { StickyNavbar } from '../Common/NavBar';
import './Home.css';
import {   
  Typography,
  Card,
  Chip,
  Avatar,
  Button
} from "@material-tailwind/react"


  import {
    CardHeader,
  } from "@material-tailwind/react";
   
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
   
function PricingCard() {
    return (
      <div  className='flex align-middle justify-center w-100 mt-10'>

      <Card color="gray" variant="gradient" className="w-full max-w-[25rem] p-5 flex justify-center">
        <div className="flex flex-row gap-4 justify-center">
          <div className="flex flex-row gap-4">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 rounded-none border-white/10 text-center p-3"
            >
            <Typography
              variant="small"
              color="white"
              className="font-normal uppercase"
            >
              EVENTS
            </Typography>
            <Typography
              variant="h1"
              color="white"
              className=" flex justify-center gap-1 text-7xl font-normal"
              >3
            </Typography>
          </CardHeader>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 rounded-none border-white/10 text-center p-3" 
          >
            <Typography
              variant="small"
              color="white"
              className="font-normal uppercase"
              >
              REVIEWS
            </Typography>
            <Typography
              variant="h1"
              color="white"
              className=" flex justify-center gap-1 text-7xl font-normal"
            >4
            </Typography>
          </CardHeader>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 rounded-none border-white/10 text-center p-3"
            >
            <Typography
              variant="small"
              color="white"
              className="font-normal uppercase"
              >
              LIKES
            </Typography>
            <Typography
              variant="h1"
              color="white"
              className=" flex justify-center gap-1 text-7xl font-normal"
              >29
            </Typography>
          </CardHeader>
          </div>
        </div>
      </Card>
      </div>
    );
  }

function Home() {
  const user = useSelector((state) => state.user);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    console.log('Toggle sidebar clicked');
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className='main'>
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <SidebarWithCta sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      </div>
      <div className='content'>
        <StickyNavbar />
        <div>
          <div className='background-container'>
            <h1 className='main_text'>HOME</h1>
          </div>
        </div>
        <div className='flex justify-between p-5'>
        <Button>Book Slot</Button>
        <Button>Like</Button>
        </div>
        <PricingCard/>
        <div className='flex flex-col w-full pt-7'>
          <h1 className='flex justify-center text-2xl font-bold mb-4'>Available Events</h1>
          <div className="flex gap-2 justify-center w-full">
          <Chip
      icon={
        <Avatar
          size="xs"
          variant="circular"
          className="h-full w-full -translate-x-0.5"
          alt="Birthday"
          src="https://img.freepik.com/premium-photo/birthday-cake-with-candle-that-says-birthday-it_948735-223220.jpg?w=1060"
        />
      }
      value={
        <Typography
          variant="small"
          color="white"
          className="font-medium capitalize leading-none"
        >
          Birthday
        </Typography>
      }
      className="rounded-full py-1.5"
    />
          <Chip
      icon={
        <Avatar
          size="xs"
          variant="circular"
          className="h-full w-full -translate-x-0.5"
          alt="Wedding"
          src="https://i1.wp.com/www.differencebetween.com/wp-content/uploads/2022/09/Wedding.jpg?resize=768%2C512&ssl=1"
        />
      }
      value={
        <Typography
          variant="small"
          color="white"
          className="font-medium capitalize leading-none"
        >
          Wedding
        </Typography>
      }
      className="rounded-full py-1.5"
    />
          <Chip
      icon={
        <Avatar
          size="xs"
          variant="circular"
          className="h-full w-full -translate-x-0.5"
          alt="Party"
          src="https://i0.wp.com/picjumbo.com/wp-content/uploads/new-years-toast-celebration-party-with-friends-free-photo.jpg?w=2210&quality=70"
        />
      }
      value={
        <Typography
          variant="small"
          color="white"
          className="font-medium capitalize leading-none"
        >
          Party
        </Typography>
      }
      className="rounded-full py-1.5"
    />
          </div>
        </div>
      <div className="mx-auto max-w-screen-md py-12">
          <Card className="mb-12 overflow-hidden">
            <img
              alt="nature"
              className="h-[32rem] w-full object-cover object-center"
              src="https://images.unsplash.com/photo-1485470733090-0aae1788d5af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2717&q=80"
            />
          </Card>
          <Typography variant="h2" color="blue-gray" className="mb-2">
            What is Material Tailwind
          </Typography>
          <Typography color="gray" className="font-normal">
            Can you help me out? you will get a lot of free exposure doing this
            can my website be in english?. There is too much white space do less
            with more, so that will be a conversation piece can you rework to make
            the pizza look more delicious other agencies charge much lesser can
            you make the blue bluer?. I think we need to start from scratch can my
            website be in english?, yet make it sexy i&apos;ll pay you in a week
            we don&apos;t need to pay upfront i hope you understand can you make
            it stand out more?. Make the font bigger can you help me out? you will
            get a lot of free exposure doing this that&apos;s going to be a chunk
            of change other agencies charge much lesser. Are you busy this
            weekend? I have a new project with a tight deadline that&apos;s going
            to be a chunk of change. There are more projects lined up charge extra
            the next time.
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default Home;
