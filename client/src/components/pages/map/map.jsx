import { Map, Marker, NavigationControl, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "./globalMap.css";
import PopUp from "../popUp/popUp";
import FormPopUp from "../formPopUp/formPopUp";
import { placeContext } from "../../../context/place";
import Footer from "../Footer/footer";
import { userContext } from "../../../context/user";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  pinAddedFailure,
  pinAddedSuccess,
  userNotLoggedIn,
} from "../../../utils/tostifyNotify";




function GlobalMap() {
  const [pins, setPins] = useState([]);
  console.log('pins:', pins);
  const [viewPort, setViewPort] = useState({
    longitude: 12.4,
    latitude: 37.8,
    zoom: 14,
  });
  const [currentPlacedId, setCurrentPlacedId] = useState(null);
  const [title, setTitle] = useState(null);
  const [decr, setDescr] = useState(null);
  const { newPlace, setNewPlace } = useContext(placeContext);
  const { currentUser, setCurrentUser } = useContext(userContext);
  const handleAddClick = (e) => {
    let lat = e.lngLat.lat;
    let lon = e.lngLat.lng;
    setNewPlace({
      lat: lat,
      lng: lon,
    });
  };


  const [rating, setRating] = useState(1);

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
      } else{

        const response = await axios.post("/pins", newPin);
        setPins([...pins, response.data]);
       
        
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

  const handleMarkerClicked = (id, lat, lon) => {
    setCurrentPlacedId(id);
  };
  useEffect(() => {
    const getPins = async () => {
      try {
        const response = await axios.get("/pins");
        setPins(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPins();
  }, []);
  return (
    <div className="App">
      <Map
        container={"map"}
        projection={"globe"}
        initialViewState={{ viewPort }}
        mapboxAccessToken={process.env.REACT_APP_TOKEN}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/eldadbrhano/clbkq3wgl004l14pf1vyos26y"
        onDblClick={handleAddClick}
      >
        <ToastContainer position="top-left" theme="dark" />
        <NavigationControl />
        {pins.map((pin) => (
          <>
            <Marker
              key={pin._id}
              longitude={pin.lon}
              latitude={pin.lat}
              anchor="center"
              onClick={() => handleMarkerClicked(pin._id, pin.lat, pin.lon)}
            >
              {/* diffrent user diffrent color */}
              <LocationOnIcon
                className="icon"
                style={{
                  fontSize: viewPort.zoom * 2,
                  color: pin.userName === currentUser ? "tomato" : "slateblue",
                }}
              />
            </Marker>

            {pin._id === currentPlacedId && <PopUp pin={pin} />}

            {newPlace && (
              <FormPopUp pin={pins} setPins={setPins} />
            )}
          </>
        ))}
      </Map>

      <div>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default GlobalMap;
