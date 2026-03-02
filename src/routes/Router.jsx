
import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../Pages/Home";
import OurFleet from "../Pages/ourFleet/OurFleet";
import CarDetails from "../Pages/carDetails/CarDetails";
import About from "../Pages/about/About";
import Contact from "../Pages/contact/Contact";
import NotFound from "../Pages/NotFound"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    
    errorElement: <NotFound />, 
    children: [
      { path: "/", element: <Home /> },
      { path: "our-fleet", element: <OurFleet /> },
      { path: "cars/:id", element: <CarDetails /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "*", element: <NotFound /> } 
    ],
  },
]);