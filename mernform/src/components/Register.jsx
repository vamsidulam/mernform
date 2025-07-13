import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate=useNavigate();
    const [data,setdata]=useState({
        name:'',
        email:'',
        password:''
    });
    const handleinput=(event)=>{
        event.preventDefault();
        setdata( (prev) =>({
            ...prev,
            [event.target.name]:event.target.value
        }));
    };
    const handlesubmit=async (event)=>{
        event.preventDefault();
        let response=await axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`,data);
        alert(response.data.msg);
    }
  return (
    <div>
        <form onSubmit={handlesubmit}>
            <div>
                <label>Name: </label>
                <input name='name' onChange={handleinput}
                 type='text' placeholder='enter your name '/>
            </div>
            <br/>
            <div>
                <label>Email: </label>
                <input name='email' onChange={handleinput}
                type='email' placeholder='enter your email '/>
            </div>
            <br/>
            <div>
                <label>Password: </label>
                <input name='password' onChange={handleinput}
                 type='password' placeholder='enter password '/>
            </div>
            <br/>
            <input type='submit' value='Register' />
        </form>
        <button onClick={()=>navigate('/',{replace:true})} >Home</button>
    </div>
  )
}

export default Register