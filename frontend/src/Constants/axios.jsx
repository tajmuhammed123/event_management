import axios from "axios";

export const axiosUserInstance=axios.create({
    baseURL: `http://localhost:4000`
})
// userApi.interceptors.request.use((req)=>{
//     if(localStorage.getItem('token')){
//         req.headers.Authorization='Bearer'+localStorage.getItem('token')
//     }
//     return req
// })

// export async function userLogin(details){
//     try {
//         const data=userApi.post('/login',details)
//         return data
//     } catch (error) {
//         console.log(error.message);
//     }
// }