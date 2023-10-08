import React, { useEffect, useState } from 'react';
import { StickyNavbar } from '../Common/NavBar';
import './Home.css';
import { useSelector } from 'react-redux';
import { Button, Card, CardHeader, Typography } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { ImageList, ImageListItem } from '@mui/material';
import { CelebrationOutlined, EmojiEventsOutlined, FavoriteBorderOutlined, FestivalOutlined, GroupsOutlined } from '@mui/icons-material';
import { CakeIcon } from '@heroicons/react/24/outline';
import { UnAvailableDate } from '../Modals/UnAvailableDate';

function Home() {

  // const { isLoading, error, data } = useQuery({
  //   queryKey: ['ManagerDatas'],
  //   queryFn: () => {
  //     // Set the userId in the request headers
  //     const headers = {
  //       Authorization: `Bearer ${localStorage.getItem("managerInfo")}`,
  //       userId: localStorage.getItem("userId"),
  //     };
  
  //     return  axiosManagerInstance.get("/manager/managerdata", { headers })
  //       .then((res) => res.data);
  //   },
  // });
  const {manager}=useSelector(state=>state.managerInfo)
  const [eventlist, setEventlist] = useState([]);
  console.log(manager);
  
  const userdata=manager.user.eventData
  console.log(userdata);
  useEffect(()=>{
    console.log(manager);
    const eventlist = userdata.events
    setEventlist(eventlist)
  },[])
  const coverImage= manager.user.eventData
  ? `${manager.user.eventData.cover_image}`
  : 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';

  const navigate=useNavigate()

  return (
        <div>
          <div className='background-container flex justify-center align-middle' style={{ backgroundImage: `url(${coverImage})` }}>
            <h3>Welcome</h3>
            <h1 className='main_text'>Mr.{manager.user.name}</h1>
          </div>
          <div className='flex justify-start mr-5 my-5'>
            <UnAvailableDate />
          </div>
          <div className='m-5'>
            <Button onClick={()=>navigate('/manager/eventdata')}>Add Event Datas</Button>
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
              {userdata.multipleImages ? (userdata.multipleImages.map((img,index) => (
                <ImageListItem key={index}>
                  <img className='rounded-md'
                    srcSet={`${img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    src={`${img}?w=248&fit=crop&auto=format`}
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
              {userdata.about ? (
                <div className="font-semibold">{userdata.about}</div>
                    ) : (
                      <p>About is not provided</p>
                      )}
              </div>
          </div>
        </div>
  );
}

export default Home;
