import React from 'react'
import { Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {  useState } from "react";
import StarIcon from '@mui/icons-material/Star';
import {format} from 'timeago.js'
import {  Card } from "@mui/material";

function PopUp({pin}) {
  const [viewPort, setViewPort] = useState({
    longitude:12.4,
    latitude:37.8,
    zoom:14
  })
  const handleMarkerClicked =(id,lat,lon)=>{
    setCurrentPlacedId(id)
  }
  const [currentPlacedId,setCurrentPlacedId] = useState(null);

  return (
    <div>

       <Popup
              longitude={parseInt(pin?.lon) }
              latitude={parseInt(pin?.lat)}
              closeOnClick={false}
              closeOnMove={false}
              anchor='left'
              >
                <Card className="card">
                  <label>Place</label>
                  <h4 className="place">{pin.title}</h4>
                  <label>Review</label>
                  <p className="descr">{pin.desc}</p>
                  <label>Rating</label>
                  <div className="stars">
                    {Array(pin.rating).fill(<StarIcon className="star"/>)}
                  </div>

                  <label >Information</label>
                  <div className="info">
                    <span className="userName">Reviewed by <strong> {pin.userName}</strong></span>
                    <span className="date">{format(pin.createdAt)}</span>
                  </div>


                </Card>
              </Popup>
    </div>
  )
}

export default PopUp
