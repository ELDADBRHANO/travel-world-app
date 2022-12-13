import { useRef } from 'react'
import './login.css'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
const Login = ({setShowLogin,setCurrentUser}) => {
  const nameRef = useRef()
  const passRef = useRef()
const handleSubmit=async(e)=>{
  e.preventDefault()
  const newUser ={
    username:nameRef.current.value,
    password:passRef.current.value
  }
  try {
    const response = await axios.post('/users/login',newUser)

    // produce success notification 
    setShowLogin(false)
    setCurrentUser(response.data.userName)
  } catch (error) {
    console.log(error);
  }
}


  return (
    <div className='login_container'>
      <div className="application">
        <ExitToAppIcon/>
        login to your profile
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='username' ref={nameRef}/>
        <input type="password" placeholder='password' ref={passRef}/>

        <button className='login_button'>Login</button>
      </form>

      <CancelIcon className='login_cancel' onClick={()=>setShowLogin(false)}/>
    </div>
  )
}

export default Login
