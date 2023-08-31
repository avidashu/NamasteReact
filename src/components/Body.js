import { useEffect, useState } from "react";
import resList from "../utils/mockData";
import RestrauntCard from "./restrauntCard";
import { SWIGGY_API_URL } from "../utils/constants";
const Body = () => {

    const [listOfRestraunt,setlistOfRestraunt] = useState(resList);
    const [filteredRestraunts,setfilteredRestraunts] = useState(resList);

    const [searchText,setsearchText] = useState("");

    useEffect(()=>{
        fetchData();
    },[]);


     const fetchData = async () => {
    const data = await fetch(SWIGGY_API_URL);
    const json = await data.json();
    json?.data?.cards.map((card, i) => {
      card.card?.card?.gridElements?.infoWithStyle?.restaurants != undefined
        ? updateResList(i, card)
        : "";
    });
  };


   const updateResList = (i, card) => {
    setlistOfRestraunt(card.card?.card?.gridElements?.infoWithStyle?.restaurants);
     setfilteredRestraunts(card.card?.card?.gridElements?.infoWithStyle?.restaurants);
  };

    
    return (
        <div className="body">
            <div className= "filter" >
                <div className="search">
                    <input type="text" className="search-box" value ={searchText} onChange={(e)=>
                    {
                        setsearchText(e.target.value);
                    }} />
                    <button onClick={()=>{
                      const filteredRestraunts =   listOfRestraunt.filter((res) => res.info.name.toLowerCase().includes(searchText.toLowerCase()));
                      

                      setfilteredRestraunts(filteredRestraunts);
                    }}> Search</button>
                </div>
                <button className="filter-btn" onClick={ ()=> {
                    const filteredList = listOfRestraunt.filter(
                        (res) => res.info.avgRating > 4
                    );
                 setfilteredRestraunts(filteredList);
                }}>Top rated Restraunts</button>
            </div>
            <div className="res-container">
                {
                    filteredRestraunts.map((restraunt) => (<RestrauntCard key={restraunt.info.id}  resData={restraunt}/>))
                }
            </div>

        </div>
    );
}
export default Body;