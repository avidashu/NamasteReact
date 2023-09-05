import { useEffect, useState } from "react";
import resList from "../utils/mockData";
import RestrauntCard from "./RestrauntCard";
import { SWIGGY_API_URL } from "../utils/constants";
import Shimmer from "./Shimmer";
import  {Link } from "react-router-dom";

const Body = () => {

    const [listOfRestraunt,setlistOfRestraunt] = useState([]);
    const [filteredRestraunts,setfilteredRestraunts] = useState(resList);

    const [searchText,setsearchText] = useState("");

    useEffect(()=>{
        fetchData();
    },[]);


     const fetchData = async () => {
    const data = await fetch(SWIGGY_API_URL);
    const json = await data.json();
    async function checkJsonData(jsonData) {
        for (let i = 0; i < jsonData?.data?.cards.length; i++) {

          // initialize checkData for Swiggy Restaurant data
          let checkData = json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

          // if checkData is not undefined then return it
          if (checkData !== undefined) {
            return checkData;
          }
        }
      }
      const resData = await checkJsonData(json);
      setfilteredRestraunts(resData);
      setlistOfRestraunt(resData);
  };


   const updateResList = (i, card) => {
    setlistOfRestraunt(card.card?.card?.gridElements?.infoWithStyle?.restaurants);
     setfilteredRestraunts(card.card?.card?.gridElements?.infoWithStyle?.restaurants);
  };

    
    return listOfRestraunt?.length === 0 ? (
    <Shimmer />
  ) :  (
        <div className="body">
            <div className= "filter" >
                <div className="search">
                    <input type="text" className="search-box" value ={searchText} onChange={(e)=>
                    {
                        setsearchText(e.target.value);
                    }} />
                    <button className="search-btn" onClick={()=>{
                      const filteredRestraunts =   listOfRestraunt.filter((res) => res.info.name.toLowerCase().includes(searchText.toLowerCase()));
                      

                      setfilteredRestraunts(filteredRestraunts);
                    }}> Search</button>
                </div>
                <button className="filter-btn" onClick={ ()=> {
                    const filteredList = listOfRestraunt.filter(
                        (res) => res.info.avgRating > 4
                    );
                 setfilteredRestraunts(filteredList);
                }}>⭐⭐ TOP RATED ⭐⭐</button>
            </div>
            <div className="res-container">
                {
                    filteredRestraunts.map((restraunt) => {
                        return (
                <Link
                to={"/restraunt/" + restraunt?.info?.id}
                key={restraunt?.info?.id}
              >
                <RestrauntCard {...restraunt?.info} />
              </Link>
                        );
                    }
                )}
            </div>

        </div>
    );
}
export default Body;