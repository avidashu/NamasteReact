import { LOGO_URL } from "../utils/constants"; 

const About = () => {
    
  return (
    <div className="about-container">
      <div className="about-left">
        <h1>
          Welcome to <br /> The world of <br /> <span>Tasty & Fresh Food</span>
        </h1>
        <h4>
          "Better you will feel if you eat a Food from &nbsp;<span>Foodie</span> menu"
        </h4>
      </div>
      <div className="about-right">
        <img src={LOGO_URL} alt="Food Image" />
      </div>
    </div>
  );
};

export default About;