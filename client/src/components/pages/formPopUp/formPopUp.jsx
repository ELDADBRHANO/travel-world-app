import axios from "axios";
import React, { useContext, useState } from "react";
import { Popup } from "react-map-gl";
import { placeContext } from "../../../context/place";
import { userContext } from "../../../context/user";
import {
  pinAddedFailure,
  pinAddedSuccess,
  userNotLoggedIn,
} from "../../../utils/tostifyNotify";
import Button from "../button/button";
import "./formPopUp.css";
function FormPopUp({ setPins, pin }) {
  
  const { newPlace, setNewPlace } = useContext(placeContext);
  const [title, setTitle] = useState(null);
  const [decr, setDescr] = useState(null);
  const { currentUser, setCurrentUser } = useContext(userContext);
  const [rating, setRating] = useState(1);
  const handleAddClick = (e) => {
    let lat = e.lngLat.lat;
    let lon = e.lngLat.lng;
    setNewPlace({
      lat: lat,
      lng: lon,
    });
  };
  const handlePinSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      userName: currentUser,
      title: title,
      rating: rating,
      desc: decr,
      lat: newPlace.lat,
      lon: newPlace.lng,
    };
    try {
      if (!currentUser) {
        userNotLoggedIn();
      } else {
        const response = await axios.post("/pins", newPin);
       
        setPins([...pin, response.data]);
       
        
        setNewPlace(null);
        // notify user on success
        pinAddedSuccess();

        setRating(1);
        setDescr(null);
        setTitle(null);
      }
    } catch (error) {
      pinAddedFailure();
      console.log(error);
    }
  };

  return (
    <div>
      <Popup
        longitude={newPlace.lng}
        latitude={newPlace.lat}
        closeOnClick={false}
        closeOnMove={false}
        onClose={() => setNewPlace(null)}
        anchor="left"
      >
        <div>
          <form onSubmit={handlePinSubmit}>
            <label>Title</label>
            <input
              type="text"
              placeholder="Enter title"
              onChange={(e) => setTitle(e.target.value)}
            />

            <label>Review</label>
            <textarea
              placeholder="Tell us about the place..."
              onChange={(e) => setDescr(e.target.value)}
            ></textarea>

            <label>Rating</label>
            <select onChange={(e) => setRating(e.target.value)}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            {/* <button className="submitBtn">Submit</button> */}
            <Button className="submitBtn" text={"Submit"} />
          </form>
        </div>
      </Popup>
    </div>
  );
}

export default FormPopUp;
