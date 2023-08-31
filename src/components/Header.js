import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {

   let btnName = "Login";
   const [btnNameReact,setbtnNameReact] = useState("Login");
   

    return (
        <div className="header">
            <div className="logo-container">
                <div className="logo"> 
                <img className="logo-image" src={LOGO_URL}></img>
                </div>
            </div>
            <div className="nav-items">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to ="/about">AboutUs </Link>
                    </li>
                    <li>
                        <Link to = "/contact">ConactUs </Link>
                        </li>
                    <li>Cart</li>
                    <button className="login"
                    onClick={()=>{
                        if(btnNameReact==="Login")
                        {setbtnNameReact("Logout");}
                    else
                    {
                        setbtnNameReact("Login");
                    }

                    }}>{btnNameReact}</button>
                </ul>
            </div>
        </div>
    )
}
export default Header;