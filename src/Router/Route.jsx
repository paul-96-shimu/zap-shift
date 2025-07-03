import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import RootLayots from "../layouts/RootLayots";
import Home from "../Pages/Home";
import AuthLayouts from "../AuthLayouts/AuthLayouts";

import Login from "../Authentation/Login";
import Register from "../Authentation/Register";
import Coverage from "../Coverage/Coverage";

export const router = createBrowserRouter([
  {
    path: "/",
  Component:RootLayots,
   children:[
    {
      index:true,
      Component:Home
    },
    {
      path:'coverage',
      Component:Coverage,
      loader:()=>fetch('./zapshift districte.json')
    }
    
   ]
  },


  {
    path:'/',
    Component:AuthLayouts,
    children:[
    {
      path:'login',
      Component:Login
    },
     {
      path:'register',
      Component:Register
    }
    
   ]
  }
]);