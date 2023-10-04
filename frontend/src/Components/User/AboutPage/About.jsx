import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
import { useNavigate, useParams } from 'react-router-dom';
import { axiosUserInstance } from '../../../Constants/axios';
import { ImageList, ImageListItem } from '@mui/material';
import CakeIcon from '@mui/icons-material/Cake';
import { Celebration, CelebrationOutlined, EmojiEvents, EmojiEventsOutlined, FavoriteBorderOutlined, FestivalOutlined, GroupsOutlined } from '@mui/icons-material';
import { Footer } from '../Common/Footer';
   
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

function About() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [eventlist, setEventlist] = useState([]);

  useEffect(() => {
    const managerdata = async () => {
      try {
        const response = await axiosUserInstance.get(`/detailpage?id=${id}`);
        setData(response.data.result);
        console.log(response.data.result);

        const eventlist = Object.keys(response.data.result.events)
          .filter((key) => response.data.result.events[key] === 'true');
          setEventlist(eventlist)
      } catch (error) {
        console.log(error.message);
      }
    };

    managerdata();
  }, [id]);

  console.log(data);

  return (
    <>
        <div>
          <div className='background-container'>
            <h1 className='main_text'>{data.team_name}</h1>
          </div>
        </div>
        <div className='main-content'>
        <div className='flex justify-between p-5'>
        <Button onClick={()=>navigate(`/eventbooking/${id}`)}>Book Slot</Button>
        <IconButton color="red" className="rounded-full">
        <FontAwesomeIcon icon={faHeart} />
      </IconButton>
        </div>
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
                  >{eventlist.length}
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
        <div className='flex flex-col pt-7 w-full mm'>
          <h1 className='flex justify-center text-2xl font-bold mb-4'>Available Events</h1>
          <div className="flex gap-2 justify-center w-full">
              
      {eventlist.includes('birthday') && (<Button variant="gradient" className="flex items-center gap-3 py-2 px-3">
        <CakeIcon/>
        Birthdays
      </Button>)}
      {eventlist.includes('wedding') && (<Button variant="gradient" className="flex items-center gap-3 py-2 px-3">
        <FavoriteBorderOutlined/>
        Weddings
      </Button>)}
      {eventlist.includes('party') && (<Button variant="gradient" className="flex items-center gap-3 py-2 px-3">
        <CelebrationOutlined/>
        Partys
      </Button>)}
      {eventlist.includes('competition') && (<Button variant="gradient" className="flex items-center gap-3 py-2 px-3">
        <EmojiEventsOutlined/>
        Competition
      </Button>)}
      {eventlist.includes('conference') && (<Button variant="gradient" className="flex items-center gap-3 py-2 px-3">
        <GroupsOutlined/>
        Conference
      </Button>)}
      {eventlist.includes('specialEvents') && (<Button variant="gradient" className="flex items-center gap-3 py-2 px-3">
        <FestivalOutlined/>
        Special event
      </Button>)}
          </div>
        </div>
          <div className='flex items-center align-middle m-8 flex-col'>
            <div className='pb-4'>
            <Typography variant="h2">Images</Typography>
            </div>
              <ImageList className='images' variant="masonry" cols={3} gap={8}>
              {data.multipleImages ? (data.multipleImages.map((img,index) => (
                <ImageListItem key={index}>
                  <img className='rounded-md'
                    srcSet={`/Images/${img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    src={`/Images/${img}?w=248&fit=crop&auto=format`}
                    alt={img}
                  />
                </ImageListItem>
              ))):(<p>No image</p>)}
            </ImageList>
          </div>
          <div className='flex items-center align-middle m-8 flex-col'>
            <div className='pb-4'>
            <Typography variant="h2">About</Typography>
            </div>
            <div className="image-collage">
              {data.about ? (
                <div className="font-semibold">{data.about}</div>
                    ) : (
                      <p>About is not provided</p>
                      )}
              </div>
          </div>
      {/* <div className="mx-auto max-w-screen-md py-12">
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
        </div> */}
        </div>
      </>
  );
}

export default About;
