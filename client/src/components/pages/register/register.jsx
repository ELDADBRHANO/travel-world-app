import React from 'react'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useRef } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import Button from '../button/button';
import './register.css'
import axios from 'axios';
const Register = ({setShowRegister}) => {
  const nameRef= useRef()
  const emailRef= useRef()
  const passRef= useRef()
  const handleSubmit=async(e)=>{
    e.preventDefault()
    const newUser={
      userName:nameRef.current.value,
      email:emailRef.current.value,
      password:passRef.current.value
    }
    try {
      const response = await axios.post('/users/register',newUser)

      // produce success notification 
      setShowRegister(false)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='register_container'>
      <div className="appliction">
        <ExitToAppIcon/>
        create a profile
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='username' ref={nameRef}/>
        <input type="email" placeholder='email' ref={emailRef}/>
        <input type="password" placeholder='password' ref={passRef}/>

        <Button text={'register'} />
      </form>
      <CancelIcon className='cancel_icon' onClick={()=>setShowRegister(false)}/>
    </div>
  )
}

export default Register
