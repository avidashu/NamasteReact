import { IMG_CDN_URL } from "../utils/constants";

const RestrauntCard =({
  cloudinaryImageId,
  name,
  cuisines,
  costForTwo,
  avgRatingString,
}) => {
    return (
        <div className="res-card" style={{backgroundColor : "#f0f0f0"}}>
            <img className="res-img" src = {IMG_CDN_URL + cloudinaryImageId}/>
            <h3>{name}</h3>
            <h4>{cuisines.join(",")}</h4>
            <h4> {avgRatingString} star ⭐</h4>
            <h4>{costForTwo} 💸💸</h4>
        </div>
    );
}
export default RestrauntCard;