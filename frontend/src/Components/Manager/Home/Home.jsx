import { useEffect, useState } from 'react';
import { StickyNavbar } from '../Common/NavBar';
import './Home.css';
import { useSelector } from 'react-redux';
import { Avatar, Button, Card, List, ListItem, ListItemPrefix, Typography } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { axiosManagerInstance } from '../../../Constants/axios';

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
  const [data,setData]=useState([])
  const bookings=async()=>{
    try {
      const response =await axiosManagerInstance.get(`/bookingdata/${manager.user._id}`).then((res)=>{setData(res.data.data),console.log(res.data.data)})
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(()=>{
    bookings()
    console.log(manager);
  },[])
  console.log(data);
  const coverImage= manager.user.eventData
  ? `/public/Images/${manager.user.eventData.cover_image}`
  : 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';

  const navigate=useNavigate()

  return (
    <div className='main'>
      <div className='content'>
        <StickyNavbar className="sticky"  /> 
        <div>
          <div className='background-container flex justify-center align-middle' style={{ backgroundImage: `url(${coverImage})` }}>
            <h3>Welcome</h3>
            <h1 className='main_text'>Mr.{manager.user.name}</h1>
          </div>
          <div className='m-5'>
            <Button onClick={()=>navigate('/manager/eventdata')}>Add Event Datas</Button>
          </div>
          <Card className="w-96 m-5">
            <List>
              {data.map((item, index) => (
                <ListItem key={index}>
                  <ListItemPrefix>
                    <Avatar variant="circular" alt="candice" src="https://www.freeiconspng.com/uploads/msn-people-person-profile-user-icon--icon-search-engine-16.png" />
                  </ListItemPrefix>
                  <div>
                    <Typography variant="h6" color="blue-gray">
                      {item.event_name}
                    </Typography>
                    <Typography variant="small" color="gray" className="font-normal">
                    {item.mob}
                    </Typography>
                  </div>
                </ListItem>
              ))}
            </List>

    </Card>
        </div>
      </div>
    </div>
  );
}

export default Home;
