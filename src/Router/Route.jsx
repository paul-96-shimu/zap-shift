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

import SendPaecel from "../Pages/SendPaecel";
import PrivteRoute from "./PrivteRoute";

import DashBoard from "../layouts/DashBoard";
import Myparcel from "../Pages/Dasboard/Myparcel";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayots,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: 'coverage',
        Component: Coverage,
        loader: () => fetch('./zapshift districte.json')
      },
      {
        path: 'sendparcel',
        element:
           <PrivteRoute>
            <SendPaecel></SendPaecel>
          </PrivteRoute>,
           loader: () => fetch('./zapshift districte.json')
          },


    
    ]
  },


  {
    path: '/',
    Component: AuthLayouts,
    children: [
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register
      }

    ]
  },

  {
    path:'/dashboard',
  element:<PrivteRoute>
    <DashBoard></DashBoard>
  </PrivteRoute>,
  children:[
    {

      path:'myParcels',
    Component: Myparcel
    }

  ]
  }


  
]);