import { useState,useEffect } from "react";
import { useParams } from "react-router-dom"; // import useParams for read `resId`
import { swiggy_menu_api_URL,RESTAURANT_TYPE_KEY,MENU_ITEM_TYPE_KEY,IMG_CDN_URL,ITEM_IMG_CDN_URL } from "../utils/constants";
import Shimmer from "./Shimmer";

const RestrauntMenu = () => {

  const { resId } = useParams(); // call useParams and get value of restaurant id using object destructuring
  const [resInfo, setResInfo] = useState(null); // call useState to store the api data in res
  const [menuItems, setMenuItems] = useState([]);


  
  useEffect(()=> {
    fetchMenu();
  },[]);


  const fetchMenu = async () => {

   const response = await fetch(swiggy_menu_api_URL + resId);
   const json = await response.json();
   console.log(json);

   const restrauantData = json?.data?.cards?.map(x => x.card)?.
                             find(x => x && x.card['@type'] === RESTAURANT_TYPE_KEY)?.card?.info || null;

   setResInfo(restrauantData);

   const menuItemsData = json?.data?.cards.find(x=> x.groupedCard)?.
                            groupedCard?.cardGroupMap?.REGULAR?.
                            cards?.map(x => x.card?.card)?.
                            filter(x=> x['@type'] == MENU_ITEM_TYPE_KEY)?.
                            map(x=> x.itemCards).flat().map(x=> x.card?.info) || [];
      
      const uniqueMenuItems = [];
      menuItemsData.forEach((item) => {
        if (!uniqueMenuItems.find(x => x.id === item.id)) {
          uniqueMenuItems.push(item);
        }
      })
      setMenuItems(uniqueMenuItems);

  };




  return resInfo === null ? (
    <Shimmer />
  ) : (
    <div className="restaurant-menu">
      <div className="restaurant-summary">
        <img
          className="restaurant-img"
          src={IMG_CDN_URL + resInfo?.cloudinaryImageId}
          alt={resInfo?.name}
        />
        <div className="restaurant-summary-details">
          <h2 className="restaurant-title">{resInfo?.name}</h2>
          <p className="restaurant-tags">{resInfo?.cuisines?.join(", ")}</p>
          <div className="restaurant-details">
            <div className="restaurant-rating" style={
            (resInfo?.avgRating) < 4
              ? { backgroundColor: "var(--light-red)" }
              : (resInfo?.avgRating) === "--"
              ? { backgroundColor: "white", color: "black" }
              : { color: "white" }
          }>
              <span>{resInfo?.avgRating} &nbsp;⭐</span>
            </div>
            <div className="restaurant-rating-slash">|</div>
            <div>{resInfo?.sla?.slaString}</div>
            <div className="restaurant-rating-slash">|</div>
            <div>{resInfo?.costForTwoMessage} &nbsp;💸</div>
          </div>
        </div>
      </div>

      <div className="restaurant-menu-content">
        <div className="menu-items-container">
          <div className="menu-title-wrap">
            <h3 className="menu-title">Recommended</h3>
            <p className="menu-count">
              {menuItems.length} ITEMS
            </p>
          </div>
          <div className="menu-items-list">
            {menuItems.map((item) => (
              <div className="menu-item" key={item?.id}>
                <div className="menu-item-details">
                  <h3 className="item-title">{item?.name}</h3>
                  <p className="item-cost">
                    {item?.price > 0
                      ? new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(item?.price / 100)
                      : " "}
                  </p>
                  <p className="item-desc">{item?.description}</p>
                </div>
                <div className="menu-img-wrapper">
                  {item?.imageId && (
                    <img
                      className="menu-item-img"
                      src={ITEM_IMG_CDN_URL + item?.imageId}
                      alt={item?.name}
                    />
                  )}
                  <button className="add-btn"> ADD +</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestrauntMenu;