import { Map, Marker, NavigationControl, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import './globalMap.css'
import PopUp from "../popUp/popUp";
import FormPopUp from "../formPopUp/formPopUp";
import { placeContext } from "../../../context/place";
import Footer from "../Footer/footer";
function GlobalMap() {
  const [pins, setPins] = useState([]);
  const [viewPort, setViewPort] = useState({
    longitude:12.4,
    latitude:37.8,
    zoom:14
  })
  const [currentPlacedId,setCurrentPlacedId] = useState(null);
  const [title,setTitle ] = useState(null)
  const[decr,setDescr] = useState(null)
  const {newPlace, setNewPlace} = useContext(placeContext)
  // const [rating, setRating] = useState(1)
  const handleAddClick = (e)=>{
    let lat = e.lngLat.lat
    let lon = e.lngLat.lng
    setNewPlace({
      lat:lat,
      lng:lon
    })
  }
  const handleMarkerClicked =(id,lat,lon)=>{
 
    setCurrentPlacedId(id)
  }
  useEffect(() => {
    const getPins = async () => {
      try {
        const response = await axios.get("/pins");
        setPins(response.data);
        console.log(response.data);
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
      initialViewState={{viewPort}}
      mapboxAccessToken={process.env.REACT_APP_TOKEN}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/eldadbrhano/clbkq3wgl004l14pf1vyos26y"
      onDblClick={handleAddClick}
    >
      <NavigationControl />
      {pins.map((pin) => (
        <>

<Marker
            key={pin._id}
            longitude={pin.lon}
            latitude={pin.lat}
            anchor="center"
            onClick={()=>handleMarkerClicked(pin._id,pin.lat,pin.lon)}
          >
            {/* diffrent user diffrent color */}
            <LocationOnIcon className="icon" style={{fontSize:viewPort.zoom *2, color: 'slateblue'}}
            />
          </Marker>


          {
            pin._id === currentPlacedId &&
            (
              <PopUp pin={pin}/>
            )
          }


          {
            newPlace&&
            <FormPopUp pin={pin} newPlace={newPlace}/>
          }
        </>
      ))}
    </Map>

    <div >
      <div>
      <Footer/>
      </div>
    </div>
  </div>
  )
}

export default GlobalMap;
