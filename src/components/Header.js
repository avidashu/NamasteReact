import { LOGO_URL } from "../utils/constants";

const Header = () => {
    return (
        <div className="header">
            <div className="logo-container">
                <div className="logo"> 
                <img className="logo-image" src={LOGO_URL}></img>
                </div>
            </div>
            <div className="nav-items">
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Careers</li>
                    <li>Cart</li>
                </ul>
            </div>
        </div>
    )
}
export default Header;