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
import Payment from "../Pages/Dasboard/Payment/Payment";
import BeARider from "../Pages/Dasboard/BeARider/BeARider";
import PendingRiders from "../Pages/Dasboard/PendingRiders/PendingRiders";
import ActiveRiders from "../Pages/Dasboard/ActiveRiders/ActiveRiders";

import ForBidden from "../Pages/Forbidden/ForBidden";
import AdminRouter from "./AdminRouter";
import MakeAdmin from "../Pages/Dasboard/MakeAdmin/MakeAdmin";


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
        path: 'forbidden',
        Component: ForBidden,
        loader: () => fetch('./zapshift districte.json')
      },

      {
        path: 'coverage',
        Component: Coverage,
        loader: () => fetch('./zapshift districte.json')
      },



      {
        path: 'beARider',
        element:
          <PrivteRoute>
            <BeARider></BeARider>
          </PrivteRoute>,

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
    path: '/dashboard',
    element: <PrivteRoute>
      <DashBoard></DashBoard>
    </PrivteRoute>,
    children: [
      {

        path: 'myParcels',
        Component: Myparcel
      },


      {

        path: "payment/:parcelId",
        Component: Payment
      },

      {
        path: 'pending-riders',
       

          element:<AdminRouter>
      <PendingRiders></PendingRiders>
        </AdminRouter>
      },
      {
        path: 'active-riders',
    

         element:<AdminRouter>
        <ActiveRiders></ActiveRiders>
        </AdminRouter>
      },
      {
        path: 'makeAdmin',

        element:<AdminRouter>
          <MakeAdmin></MakeAdmin>
        </AdminRouter>
      }

    ]
  }



]);