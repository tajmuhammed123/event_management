import {
  Card,
  CardHeader,
  Typography,
  Avatar,
  Button,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
 
export function Profile() {
  const {manager}=useSelector(state=>state.adminInfo)
  console.log(manager);
  return (
      <>
  <div className="flex mt-8 align-middle items-center h-screen flex-col">
      <div>
  <Typography variant="h1" color="blue-gray" className="font-large">
                PROFILE
  </Typography>
      </div>
    <Card className="my-9" style={{ width: '600px' }}>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="p-4 rounded-none"
      >
      <Avatar
        size="lg"
        variant="circular"
        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
        alt="tania andrew"
        className="mb-2"
      />
      <div className="flex w-full flex-col gap-0.5">
        <div className="flex items-center justify-between">
          <Typography variant="h4" color="blue-gray">
            {manager.user.name}
          </Typography>
          <div className="5 flex items-center flex-col gap-0">
            <Typography variant="h5" className="p-3">${manager.user.wallet_amount}</Typography>
            <Button>Withdraw</Button>
          </div>
        </div>
        <Typography variant="h5" color="blue-gray">
            {manager.user.mob}
          </Typography>
        <Typography color="blue-gray">{manager.user.email}</Typography>
      </div>
      </CardHeader>
      {/* <CardBody>
        <Typography variant="h4" color="blue-gray">
          UI/UX Review Check
        </Typography>
        <Typography variant="lead" color="gray" className="mt-3 font-normal">
          Because it&apos;s about motivating the doers. Because I&apos;m here to
          follow my dreams and inspire others.
        </Typography>
      </CardBody> */}
      {/* <CardFooter className="flex items-center justify-between">
        <div className="flex items-center -space-x-3">
          <Tooltip content="Natali Craig">
            <Avatar
              size="sm"
              variant="circular"
              alt="natali craig"
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
              className="border-2 border-white hover:z-10"
            />
          </Tooltip>
          <Tooltip content="Tania Andrew">
            <Avatar
              size="sm"
              variant="circular"
              alt="tania andrew"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              className="border-2 border-white hover:z-10"
            />
          </Tooltip>
        </div>
        <Typography className="font-normal">January 10</Typography>
      </CardFooter> */}
    </Card>
    </div>
    </>
  );
}