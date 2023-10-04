import React, { useEffect, useState } from 'react'
import { AdminNavbar } from '../Common/NavBar'
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  IconButton,
  Tooltip,
  Input,
  Spinner,
} from "@material-tailwind/react";
import { axiosAdminInstance } from '../../../Constants/axios';
import { ManagerApprove, ManagerReject } from '../../../actions/AdminActions';
import EventCategory from '../Categories/EventCategory';
import { useQuery, useQueryClient } from '@tanstack/react-query';
 
const TABLE_HEAD = ["Name", "Salutation", "Location", "Status", "Account", ""];
function AdminHome() {

  const [managerData,setData]=useState([])
  const [bookData,setBookData]=useState([])
  const [searchInput,setSearchInput]=useState('')
  const TABLE_ROWS = managerData.map((item, index) => (  {
    name: item.name,
    amount: item.eventData.salutation,
    status: item.is_authorized,
  }));
    // {
    //   name: "netflix",
    //   amount: "$14,000",
    //   date: "Wed 3:30am",
    //   status: "cancelled",
    //   account: "visa",
    //   accountNumber: "1234",
    //   expiry: "06/2026",
    // },


  // const ManagerData=async()=>{
  //   try {
      // await axiosAdminInstance.get('/getmanagerdata').then((res)=>{setData(res.data.data),console.log(res.data.data)}).catch((err)=>console.log(err.message))
      // await axiosAdminInstance.get('/getuserdata').then((res)=>{setUserData(res.data.data),console.log(res.data.data)}).catch((err)=>console.log(err.message))
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }
  const handleApprove=async(id)=>{
    try {
      const response = ManagerApprove(id)
      queryClient.invalidateQueries('manager')
      console.log(response.status);
    } catch (error) {
      console.log(error.message);
    }
  }
  const handleReject=async(id)=>{
    try {
      const response = ManagerReject(id)
      queryClient.invalidateQueries('manager')
      console.log(response);
      console.log(response.status);
    } catch (error) {
      console.log(error.message);
    }
  }

  const TABLE_HEAD = ["Manager ID", "User ID", "Employed", ""];


  const queryClient=useQueryClient()
  // const {isLoading,error,data}=useQuery({
  //   queryKey:['user'],
  //   queryFn:()=>axiosAdminInstance.get('/getuserdata').then((res)=>{setUserData(res.data.data),console.log(res.data.data)}).catch((err)=>console.log(err.message))
  // })
  // useEffect(()=>{
  //   ManagerData()
  // },[isLoading])
  const { isLoading:isLoading2, error:error2 } = useQuery({
    queryKey: ['manager'],
    queryFn: async () => {
      try {
        const userData=localStorage.getItem('adminInfo')
  const userInfo=JSON.parse(userData)
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token.token}`,
    },
  };
        const response = await axiosAdminInstance.get('/getmanagerdata',config).then((res)=>{setData(res.data.data),console.log(res.data.data)}).catch((err)=>console.log(err.message))
        setData(response.data.data);
        console.log(response.data.data);
      } catch (err) {
        console.error(err.message);
      }
    },
  });
  const { isLoading:isLoading1, error:error1 } = useQuery({
    queryKey: ['booking'],
    queryFn: async () => {
      try {
        const userData=localStorage.getItem('adminInfo')
  const userInfo=JSON.parse(userData)
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token.token}`,
    },
  };
        const response = await axiosAdminInstance.get('/getbookingdata',config).then((res)=>{setBookData(res.data.data),console.log(res.data.data)}).catch((err)=>console.log(err.message))
        setBookData(response.data.data);
        console.log(bookData);
      } catch (err) {
        console.error(err.message);
      }
    },
  });

  if(isLoading2 || isLoading1){
      return <div className='h-screen w-screen flex items-center justify-center'>
        <Spinner /></div>;
  }

  const managerdatas = managerData.filter(user => {
    const searchInputLower = searchInput.toLowerCase();
    const nameMatch = user.name.toLowerCase().includes(searchInputLower);
    return nameMatch ;
  })
  console.log(bookData);


  return (
    <>
      <div className='flex justify-end mr-5 my-5'>
      <EventCategory/>
      </div>
      <div className='flex justify-center flex-col'>
        <div className='flex justify-center'>
        <Typography variant='h2'>TRANSACTIONS</Typography>
        </div>
        <div className='flex justify-center'>
        
      <Card className="h-full w-1/2 overflow-y-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bookData.map((item, index) => {
            const isLast = index === bookData.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
            return (
              <tr key={item._id}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item.userId}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item.managerId}
                  </Typography>
                </td>
                <td className={classes}>
                        <Chip
                        className='w-max'
                          size="sm"
                          variant="ghost"
                          value={item.amount}
                          color={
                            item.status === "paid"
                              ? "green"
                              : item.amount === "not paid"
                              ? "amber"
                              : "red"
                          }
                        />
                </td>
                <td className={classes}>
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    {item.status === "paid"
                              ? "Paid"
                              : item.amount === "not paid"
                              ? "Not Paid"
                              : "Cancelled"}
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
    </div>
      </div>
      <div className='m-5 flex justify-center flex-col'>
        <div className='flex justify-center'>
        <Typography variant='h2'>MANAGER APPROVALS</Typography>
        </div>
        <div className='flex justify-center'>
      <Card className="h-full w-2/3">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Manager Approvals
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              These are manager requests to approve
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                onChange={(e)=>(setSearchInput(e.target.value))}
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
            <Button className="flex items-center gap-3" size="sm">
              <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> Download
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-hidden px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {managerdatas.map(
              (
                item,
                index,
              ) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
 
                return (
                  <tr key={index}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {item.name}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.eventData.salutation}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.eventData.location}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="w-max flex justify-center">
                        <Chip
                          size="sm"
                          variant="ghost"
                          value={item.is_authorized ? "Apporved":"N/A"}
                          color={
                            item.is_authorized
                              ? "green"
                              : item.is_authorized === "pending"
                              ? "amber"
                              : "red"
                          }
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        {/* <div className="h-9 w-12 rounded-md border border-blue-gray-50 p-1">
                          <Avatar
                            src={
                              item.eventData.dishes === "visa"
                                ? "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/visa.png"
                                : "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/mastercard.png"
                            }
                            size="sm"
                            alt={item.eventData.dishes}
                            variant="square"
                            className="h-full w-full object-contain p-1"
                          />
                        </div> */}
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal capitalize"
                          >
                            {item.eventData.name}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {item.eventData.name}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Approve">
                        <Button color='green' className='mr-3' onClick={()=>handleApprove(item._id)}>Approve</Button>
                      </Tooltip>
                      <Tooltip content="Reject">
                        <Button color='red' onClick={()=>handleReject(item._id)}>Reject</Button>
                      </Tooltip>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Button variant="outlined" size="sm">
          Previous
        </Button>
        <div className="flex items-center gap-2">
          <IconButton variant="outlined" size="sm">
            1
          </IconButton>
          <IconButton variant="text" size="sm">
            2
          </IconButton>
          <IconButton variant="text" size="sm">
            3
          </IconButton>
          <IconButton variant="text" size="sm">
            ...
          </IconButton>
          <IconButton variant="text" size="sm">
            8
          </IconButton>
          <IconButton variant="text" size="sm">
            9
          </IconButton>
          <IconButton variant="text" size="sm">
            10
          </IconButton>
        </div>
        <Button variant="outlined" size="sm">
          Next
        </Button>
      </CardFooter>
    </Card>
    </div>
      </div>

  </>
  )
}

export default AdminHome