import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./src/components/Header";
import Body from "./src/components/Body";
import { createBrowserRouter, RouterProvider,Outlet } from "react-router-dom";
import About from "./src/components/About";
import ContactUs from "./src/components/ConactUs";
import Error from "./src/components/Error";
import RestrauntMenu from "./src/components/RestrauntMenu";
import Footer from "./src/components/Footer";
//component composition!




const AppLayout = () => {
    return (
        <div className= "app">
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    );
}

const appRouter = createBrowserRouter([
   { 
    path: "/",
    element : <AppLayout/>,
    children : [
    {
        path : "/",
        element : <Body/>,
    },
        {
    path : "/about",
    element : <About/>
   },
   {
    path : "/contact",
    element : <ContactUs/>
   },
   {
    path : "/restraunt/:resId",
    element : <RestrauntMenu/>
   }
    ],
    errorElement : <Error/>,
   }
    
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router = {appRouter}/>);


