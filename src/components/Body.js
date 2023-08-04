import { useState } from "react";
import resList from "../utils/mockData";
import RestrauntCard from "./restrauntCard";
const Body = () => {

    const [listOfRestraunt,setlistOfRestraunt] = useState(resList)
    
    return (
        <div className="body">
            <div className= "filter" >
                <button className="filter-btn" onClick={ ()=> {
                    const filteredList = listOfRestraunt.filter(
                        (res) => res.info.avgRating > 4
                    );
                setlistOfRestraunt(filteredList);
                }}>Top rated Restraunts</button>
            </div>
            <div className="res-container">
                {
                    listOfRestraunt.map((restraunt) => (<RestrauntCard key={restraunt.info.id}  resData={restraunt}/>))
                }
            </div>

        </div>
    );
}
export default Body;