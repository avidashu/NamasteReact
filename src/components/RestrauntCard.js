import { IMG_URL } from "../utils/constants";

const RestrauntCard = (props) => {
    const {resData}= props;

    const {
        name,
        cuisines,
        avgRatingString,
        locality,
        cloudinaryImageId,
        costForTwo

    } = resData?.info
    return (
        <div className="res-card" style={{backgroundColor : "#f0f0f0"}}>
            <img className="res-img" src = {IMG_URL + cloudinaryImageId}/>
            <h3>{name}</h3>
            <h4>{cuisines.join(",")}</h4>
            <h4> {avgRatingString} star</h4>
            <h4> {locality}</h4>
            <h4>{costForTwo}</h4>
        </div>
    );
}
export default RestrauntCard;