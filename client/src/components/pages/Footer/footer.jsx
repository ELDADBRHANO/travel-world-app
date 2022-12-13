import React, { useState } from 'react'
import Login from '../login/login'
import Register from '../register/register'
import './footer.css'
function Footer() {
  const [currentUser,setUser] = useState(null)
  const [showRegister, setShowRegister] = useState(null)
  const [showLogin, setShowLogin] = useState(null)
  return (
    <div className='footer'>
      <div className="footer_down">
        {
          currentUser?(
            <button className='button logout'>Logout</button>
          ):(<div>
            <button onClick={()=>{setShowLogin(true)}} className='button login'>Login</button>
            <button onClick={()=>{setShowRegister(true)}}  className='button register'>register</button>
          </div>)
        }
      </div>
      {showRegister&&<Register setShowRegister={setShowRegister}/>}
      {showLogin&&<Login setShowRegister={setShowRegister} setShowLogin={setShowLogin}/>}
    </div>
  )
}

export default Footer
