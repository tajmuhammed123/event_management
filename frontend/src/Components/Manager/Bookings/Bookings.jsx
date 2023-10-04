import { Avatar, Button, Card, CardHeader, Dialog, DialogBody, DialogFooter, DialogHeader, List, ListItem, ListItemPrefix, Typography } from '@material-tailwind/react'
import React from 'react'
import { axiosManagerInstance } from '../../../Constants/axios';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

function Bookings() {
    const {manager}=useSelector(state=>state.managerInfo)
    const [data,setData]=useState([])
    const [open, setOpen] = React.useState(false);
 
    const handleOpen = (index) => {
      
      setOpen(!open)
      const newDialogOpen = [...dialogOpen];
      newDialogOpen[index] = !newDialogOpen[index];
      setDialogOpen(newDialogOpen)
    };
    const [dialogOpen, setDialogOpen] = useState(new Array(data.length).fill(false))
    const { isLoading, error } = useQuery({
        queryKey: ['manager'],
        queryFn: async () => {
          try {
            const managerData=localStorage.getItem('managerInfo')
            const managerInfo=JSON.parse(managerData)
            const config = {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${managerInfo.token.token}`,
              },
            };
            const response = await axiosManagerInstance.get(`/bookingdata/${manager.user._id}`,config);
            console.log(response);
            setData(response.data.data);
            console.log(response.data.data);
          } catch (err) {
            console.error(err.message);
            // Handle error here
          }
        },
      });
  return (
    <div className='h-screen justify-center align-middle flex'>
        <Card className="w-96 m-9">
          <CardHeader>
            <Typography variant="h4" color="blue-gray" className='flex justify-center'>
              Event Bookings
            </Typography>
          </CardHeader>
            <List>
              {data.length > 0?data.map((item, index) => (
                <>
                <ListItem key={index} onClick={()=>handleOpen(index)}>
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
                <Dialog
                open={dialogOpen[index]}
                handler={handleOpen}
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0.9, y: -100 },
                }}
              >
                <DialogHeader>Its a simple dialog.</DialogHeader>
                <DialogBody divider>
                  <p ><strong>Name:</strong>{item.event_name} </p>
                  <p ><strong>Moblie:</strong>{item.mob}</p>
                  <p ><strong>Event:</strong>{item.event}</p>
                  <p ><strong>Dishes:</strong>{item.preffered_dishes}</p>
                  <p ><strong>Address:</strong>{item.address}</p>
                  <p ><strong>Date:</strong>{item.date}</p>
                  <p ><strong>Time:</strong>{item.time}</p>
                  <p ><strong>Additional Data:</strong>{item.additional_data}</p>
                </DialogBody>
                <DialogFooter>
                  <Button
                    variant="text"
                    color="red"
                    onClick={()=>handleOpen(index)}
                    className="mr-1"
                  >
                    <span>Cancel</span>
                  </Button>
                  <Button variant="gradient" color="green" onClick={()=>handleOpen(index)}>
                    <span>Confirm</span>
                  </Button>
                </DialogFooter>
              </Dialog>
              </>
              )) : <Typography className='flex justify-center' variant="h6" color="blue-gray">
              No bookings
            </Typography>}
            </List>
        </Card>
    </div>
  )
}

export default Bookings