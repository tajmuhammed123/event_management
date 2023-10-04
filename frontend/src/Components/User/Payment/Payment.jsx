import { loadStripe } from "@stripe/stripe-js"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { userPayment } from "../../../actions/UserActions"
import { Elements } from "@stripe/react-stripe-js"
import CehckOut from "./CheckOut"


const stripePromise=loadStripe('pk_test_51NwHkGSEDFbx4uMAoieqN5YqdW5DENZ8p9DG72A431kzPkYUt4mL1jNsafsUCI9gf33fLUfSno8XKitrf5xTe4iP00Dx0rPbwh')
const Payment=()=>{
    const {id,bookid}=useParams()
    const [clientSecret,setClientSecret]=useState("");
    useEffect(()=>{
        const request=async ()=>{
            try {
                const res=await userPayment(id)
                console.log(res);
                setClientSecret(res.data.clientSecret)
            } catch (error) {
                console.log(error.message);
            }
        }
        request()
    },[])
    const appearance = {
        theme: 'stripe',
      };
      const options = {
        clientSecret,
        appearance,
      };

    return(
        <>
            <div className="app">
                {clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                        <CehckOut Secret={clientSecret} bookid={bookid} mangId={id}/>
                    </Elements>
                )}
            </div>
        </>
    )
}

export default Payment