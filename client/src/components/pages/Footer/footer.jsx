import { useContext, useState } from 'react'
import { userContext } from '../../../context/user'
import Login from '../login/login'
import Register from '../register/register'
import './footer.css'
function Footer() {
  const {currentUser,setCurrentUser} = useContext(userContext)
  const [showRegister, setShowRegister] = useState(null)
  const [showLogin, setShowLogin] = useState(null)
  const handleLogOut=()=>{
    setCurrentUser(null)
  }
  return (
    <div className='footer'>
      <div className="footer_down">
        {
          currentUser?(
            <button className='button logout' onClick={()=>handleLogOut()}>Logout</button>
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
