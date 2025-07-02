import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import RootLayots from "../layouts/RootLayots";
import Home from "../Pages/Home";
import AuthLayouts from "../AuthLayouts/AuthLayouts";
import { BiLogIn } from "react-icons/bi";
import Login from "../Authentation/Login";
import Register from "../Authentation/Register";

export const router = createBrowserRouter([
  {
    path: "/",
  Component:RootLayots,
   children:[
    {
      index:true,
      Component:Home
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