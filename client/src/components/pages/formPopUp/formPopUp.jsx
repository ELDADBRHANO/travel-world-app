import { Button } from '@mui/material'
import React, { useContext, useState } from 'react'
import { Popup } from 'react-map-gl'
import { placeContext } from '../../../context/place'
import './formPopUp.css';
function FormPopUp() {
  const {newPlace, setNewPlace} = useContext(placeContext)
  // const [newPlace, setNewPlace] = useState(null)
  const [title,setTitle ] = useState(null)
  const[decr,setDescr] = useState(null)
  const [rating, setRating] = useState(1)
  const handleAddClick = (e)=>{
    let lat = e.lngLat.lat
    let lon = e.lngLat.lng
    setNewPlace({
      lat:lat,
      lng:lon
    })
    
  }
  const handleFormSubmit =(e)=>{
    e.preventDefault()
  }
  return (
    <div>
        <Popup
            longitude={newPlace.lng}
            latitude={newPlace.lat}
            closeOnClick={false}
            closeOnMove={false}
            onClose={()=> setNewPlace(null)}
            anchor='left'
            >
              <div>
                <form onSubmit={handleFormSubmit}>
                  <label>Title</label>
                  <input type="text" placeholder="Enter title" onChange={(e)=>setTitle(e.target.value)} />

                  <label>Review</label>
                  <textarea placeholder="Tell us about the place..." onChange={(e)=>setDescr(e.target.value)}></textarea>

                  <label>Rating</label>
                  <select onChange={(e)=>setRating(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  </select>
                  <button className="submitBtn">Submit</button>
                </form>

              </div>
            </Popup>
    </div>
  )
}

export default FormPopUp
