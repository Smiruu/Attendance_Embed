import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import { useAuthProvider } from '../context/authContext'


const Login = () =>{
    const{access, loading, error} = useAuthProvider();
    const navigate = useNavigate();
    console.log(access)
    useEffect(()=>{
        if(access){
            navigate("/dashboard")
        }
    },[navigate, access])
  return (
    <div>
        <LoginForm error={error} loading={loading} />
    </div>
  )
}

export default Login