import React,{useState} from 'react';
import axios from 'axios';
import { replace, useNavigate } from 'react-router-dom';

const Login = () => {
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
    // const handlesubmit=async (event)=>{
    //     event.preventDefault();
    //     let response=await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`,data);
    //     alert(response.data.msg);
    //     if(response.data.msg==='logged in successfully'){
    //         navigate('/welcome',{replace:true});
    //         localStorage.setItem('token',response.data.token);
    //     }
        
    // }
    const handlesubmit = async (event) => {
  event.preventDefault();

  const url = `${process.env.REACT_APP_BACKEND_URL}/login`;
  console.log("🔁 Sending request to:", url);
  console.log("📦 Payload:", data);

  try {
    const response = await axios.post(url, data);
    console.log("✅ Response:", response.data);

    alert(response.data.msg);
    if (response.data.msg === 'logged in successfully') {
      localStorage.setItem('token', response.data.token);
      navigate('/welcome', { replace: true });
    }
  } catch (err) {
    console.error("❌ Axios Error:", err.response ? err.response.data : err.message);
    alert("Login failed: " + (err.response?.data?.msg || err.message));
  }
};
console.log("Backend URL:", process.env.REACT_APP_BACKEND_URL);

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
            <input type='submit' value='Login' />
        </form>
        <button onClick={()=>navigate('/register',{replace:true})} >Register</button>
    </div>
  )
}

export default Login