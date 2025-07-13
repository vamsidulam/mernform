import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Welcome = () => {
    const [msg,setmsg]=useState();
    useEffect( ()=>{
        const token=localStorage.getItem('token');
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/getdetails`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        }).then(
            (res)=> setmsg(res.data.msg)
        )
        .catch( (err)=>{
            setmsg(err.response?.data?.message || "Access denied");
        } )
    },[] );
    const handlelogout=()=>{
        localStorage.removeItem('token');
        setmsg('');
    }
    const navigate=useNavigate();
  return (
    <div>
        <h2>Welcome Page</h2>
        <p>{msg}</p>
        <button onClick={()=>navigate('/',{replace:true})} >Home</button>
        <br/>
        <button onClick={handlelogout}>Logout</button>
    </div>
  )
}

export default Welcome