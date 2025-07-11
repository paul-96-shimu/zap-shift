import axios from 'axios';
import React from 'react';
import CustomHooks from './CustomHooks';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: `http://localhost:5000`
})

const UseAxios = () => {

    const {user,logOut} = CustomHooks()

    const navigate =useNavigate()
    axiosSecure.interceptors.request.use(config => {

        config.headers.Authorization = `Bearer ${user.accessToken}`
        return config
    }, error =>{
        return Promise. reject(error)
    })


  axiosSecure.interceptors.request.use(res=>{
    return res
  }, error =>{
    console.log('inside res intercep',error.status);
    const status = error.status;
    if(status === 403){
        navigate('/forbidden')
        
    }

else if(status === 401){

logOut ()
.then(() =>{
    navigate('/login')
})

. catch (() =>{ })
}


      return Promise. reject(error)
  })


    

};

export default UseAxios;