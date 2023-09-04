import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { SidebarWithCta } from '../Common/SideBar';
import { StickyNavbar } from '../Common/NavBar';
import './About.css';
import {   
  Typography,
  Card,
  Button,
  IconButton
} from "@material-tailwind/react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

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

function About() {
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
      <div className='content pl-12'>
        <StickyNavbar />
        <div>
          <div className='background-container'>
            <h1 className='main_text'>FIESTA CATERS</h1>
          </div>
        </div>
        <div className='main-content'>
        <div className='flex justify-between p-5'>
        <Button>Book Slot</Button>
        <IconButton color="red" className="rounded-full">
        <FontAwesomeIcon icon={faHeart} />
      </IconButton>
        </div>
        <PricingCard/>
        <div className='flex flex-col pt-7 w-full mm'>
          <h1 className='flex justify-center text-2xl font-bold mb-4'>Available Events</h1>
          <div className="flex gap-2 justify-center w-full">
          <div>
          <Button variant="gradient" className="flex items-center gap-3 py-2 px-3">
          <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="3em"
      width="3em"
    >
      <path d="M12 6a2 2 0 002-2c0-.38-.1-.73-.29-1.03L12 0l-1.71 2.97c-.19.3-.29.65-.29 1.03a2 2 0 002 2m4.6 10l-1.07-1.08L14.45 16c-1.3 1.29-3.58 1.3-4.89 0L8.5 14.92 7.4 16a3.467 3.467 0 01-4.4.39V21a1 1 0 001 1h16a1 1 0 001-1v-4.61a3.467 3.467 0 01-4.4-.39M18 9h-5V7h-2v2H6a3 3 0 00-3 3v1.54c0 1.08.88 1.96 1.96 1.96.54 0 1.04-.2 1.38-.57L8.5 12.8l2.11 2.13c.74.74 2.03.74 2.77 0l2.12-2.13 2.15 2.13c.35.37.85.57 1.38.57 1.08 0 1.97-.88 1.97-1.96V12a3 3 0 00-3-3z" />
    </svg>
        Birthdays
      </Button>
    </div>
    <Button variant="gradient" className="flex items-center gap-3 py-2 px-3">
        <svg fill="#ffffff" height="30px" width="30px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 480 480" xml:space="preserve" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier"> <g id="XMLID_504_"> <g> <g> 
          <path d="M382.884,297.066c0.438-0.404,0.871-0.815,1.299-1.236c10.374-10.202,16.087-23.833,16.087-38.382V230 c0-27.57-22.43-50-50-50h-28.412c-16.129,0-29.25,13.122-29.25,29.25v47.477c0,13.898,5.235,26.666,13.814,36.35 c-6.854,2.128-13.081,6.083-17.96,11.54l-36.684,35.69c-0.191,0.187-0.376,0.381-0.553,0.583 c-2.285,2.613-5.587,4.111-9.059,4.111c-3.472,0-6.773-1.498-9.059-4.111c-0.271-0.31-0.561-0.602-0.868-0.876l-39.525-35.275 c-5.181-5.656-12.317-9.1-19.93-9.658c4.936-10.048,7.708-21.34,7.709-33.27l0.002-23.223 c0.001-14.031-5.462-27.222-15.383-37.144c-9.921-9.922-23.111-15.386-37.143-15.386h-1.1c-29.801,0-54.045,24.148-54.045,53.831 c0,24.8-11.107,47.91-30.474,63.403l-8.366,6.693c-5.205,4.165-7.143,10.92-4.937,17.211c2.207,6.29,7.94,10.355,14.606,10.355 h20.68c-1.561,3.504-2.92,7.162-4.074,10.961L33.37,437.04c-3.385,11.143-1.43,23.54,5.104,32.352 C43.475,476.133,50.733,480,58.392,480h125.572c7.657,0,14.916-3.867,19.915-10.609c6.533-8.812,8.489-21.208,5.104-32.352 l-24.282-79.945c-1.605-5.285-7.191-8.266-12.475-6.662c-5.284,1.605-8.268,7.19-6.662,12.475l24.282,79.945 c1.769,5.824,0.253,11.543-2.034,14.628c-0.697,0.941-2.126,2.521-3.849,2.521H58.392c-1.723,0-3.151-1.579-3.849-2.521 c-2.287-3.084-3.803-8.804-2.033-14.628l26.889-88.528c1.863-6.134,4.386-11.756,7.521-16.773h17.827 c21.055,0,40.13-8.634,53.872-22.55h11.972c2.884,0,5.627,1.245,7.526,3.415c0.271,0.31,0.561,0.602,0.867,0.876l39.521,35.271 c6.063,6.642,14.646,10.438,23.661,10.438c9.093,0,
          17.749-3.863,23.819-10.613l36.689-35.696 c0.191-0.187,0.376-0.381,0.552-0.582c3.799-4.341,9.285-6.831,15.052-6.831h28.164c0.002,0,0.01,0,0.015,0h15.704 c5.818,0,11.144,2.402,14.994,6.764s5.573,9.943,4.842,15.801l-5.913,50.812l-27.791,13.896l-26.178-13.089l-3.77-31.646 c-0.653-5.484-5.631-9.402-11.112-8.747c-5.484,0.653-9.4,5.628-8.747,11.112l12.661,106.299 c1.249,9.987,9.781,17.519,19.846,17.519h36.324c10.066,0,18.598-7.532,19.854-17.604l14.681-126.156 c1.423-11.379-2.114-22.836-9.704-31.433C389.443,301.741,386.313,299.142,382.884,297.066z M160.494,261.809 c-0.003,30.736-25.012,55.741-55.747,55.741h-1.833c13.804-11.025,24.729-26.091,30.965-43.871 c1.828-5.212-0.915-10.918-6.127-12.747c-5.206-1.825-10.917,0.915-12.746,6.126c-9.309,26.54-31.641,45.426-57.462,49.615 c22.469-19.26,35.282-47.046,35.282-76.786c0-18.654,15.272-33.831,34.045-33.831h1.1c8.688,0,16.856,3.384,23,9.528 c6.144,6.144,9.526,14.313,9.525,23L160.494,261.809z M380.271,257.448L380.271,257.448c-0.001,9.144-3.592,17.71-10.112,24.122 c-6.519,6.411-15.167,9.84-24.303,9.704c-18.333-0.306-33.248-15.804-33.248-34.547v-2.784c11.198,6.797,24.62,10.5,38.31,10.5 c5.522,0,10-4.477,10-10s-4.478-10-10-10c-11.248,0-22.162-3.351-30.73-9.435c-4.746-3.37-7.579-8.98-7.579-15.008v-10.75 c0-5.101,4.149-9.25,9.25-9.25h28.412c16.542,0,30,13.458,30,30V257.448z M367.318,460l-36.317,0.058l-6.053-50.818l18.874,9.437 c2.814,1.407,6.129,1.407,8.943,0l20.557-10.278L367.318,460z"></path> <path d="M346.153,0c-23.502,0-46.622,6.201-66.861,17.932c-15.224,8.824-28.599,20.617-39.292,34.56 c-10.693-13.943-24.069-25.737-39.292-34.56C180.468,6.201,157.348,0,133.846,0C60.043,0,0,60.224,0,134.25 c0,30.441,11.135,59.707,31.353,82.405c1.976,2.219,4.717,3.349,7.471,3.349c2.366,0,4.741-0.835,6.647-2.533 c4.124-3.674,4.489-9.995,0.815-14.119C29.335,184.321,20,159.78,20,134.25C20,71.252,71.071,20,133.847,20 c40.28,0,76.758,20.704,97.58,55.383c1.807,3.011,5.062,4.853,8.573,4.853s6.765-1.842,8.573-4.853 C269.394,40.704,305.874,20,346.154,20C408.929,20,460,71.252,460,134.25c0,25.529-9.335,50.069-26.284,69.099 c-3.673,4.124-3.308,10.445,0.816,14.118c4.125,3.674,10.446,3.309,14.119-0.816C468.867,193.954,480,164.689,480,134.25 C480,60.224,419.957,0,346.153,0z"></path> </g> </g> </g> </g></svg>
        Weddings
      </Button>
      <Button variant="gradient" className="flex items-center gap-3 py-2 px-3">
        <svg width="30px" height="30px" viewBox="0 0 170.079 170.079" enable-background="new 0 0 170.079 170.078" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="background"></g> <g id="AESTHETICS_ICONS"> <g> <g> 
          <path d="M144.667,33.673c5.218,5.989,9.375,13.801,11.663,22.785c6.001,23.544-3.081,46.186-20.282,50.569 c-17.202,4.381-36.011-11.152-42.011-34.696c-2.29-8.983-2.377-17.832-0.663-25.587L144.667,33.673z" fill="#ffffff"></path> <path d=" M158.237,72.7c-0.513,17-8.917,31.06-22.098,34.418C119.006,111.483,100.289,96.7,94.206,72.7H158.237z" fill="#ffffff" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="4"></path> <path d=" M144.823,34.29c5.043,5.298,9.298,13.491,11.586,22.476c6.002,23.546-3.121,46.031-20.323,50.416 c-17.201,4.383-35.95-10.918-41.95-34.464c-2.29-8.984-2.494-18.293-0.604-25.356L144.823,34.29z" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="4"></path> <line fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="4" x1="135.72" x2="145.486" y1="107.036" y2="145.358"></line> <line fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="4" x1="153.364" x2="137.293" y1="142.692" y2="146.788"></line> </g> <g> 
            <path d="M25.413,22.673c-5.218,5.989-9.375,13.801-11.663,22.785c-6.001,23.544,3.081,46.186,20.282,50.569 c17.202,4.381,36.011-11.152,42.011-34.696c2.29-8.983,2.377-17.832,0.662-25.587L25.413,22.673z" fill="#ffffff"></path> <path d=" M11.842,61.7c0.513,17,8.917,31.06,22.098,34.418C51.073,100.483,69.791,85.7,75.874,61.7H11.842z" fill="#ffffff" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="4"></path> <path d=" M25.256,23.29c-5.043,5.298-9.298,13.491-11.587,22.476c-6.001,23.546,3.122,46.031,20.324,50.416 c17.201,4.383,35.95-10.918,41.95-34.464c2.29-8.984,2.494-18.293,0.604-25.356L25.256,23.29z" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="4"></path> <line fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="4" x1="34.358" x2="24.593" y1="96.036" y2="134.358"></line> <line fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="4" x1="16.715" x2="32.786" y1="131.692" y2="135.788"></line> </g> </g> </g> <g id="SAMPLE_TEXT"></g> </g></svg>
        Partys
      </Button>
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
            Random Text
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
    </div>
  );
}

export default About;
