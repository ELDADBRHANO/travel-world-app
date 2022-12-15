import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export const userNotLoggedIn =()=>{
  toast.warning('Login to account to set pins!')
}



export const userLoggedOut =(users)=>{
  toast.success(`${users} just Log out.`)
}



export const pinAddedSuccess=()=>{
  toast.success('pin added successfully.')
}


export const pinAddedFailure =()=>{
  toast.error("Couldn't add your pin, please fill all fields.")
}