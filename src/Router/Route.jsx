import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import RootLayots from "../layouts/RootLayots";
import Home from "../Pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
  Component:RootLayots,
   children:[
    {
      index:true,
      Component:Home}
    
   ]
  },
]);