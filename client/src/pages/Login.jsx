import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import LoginForm from '../components/login/LoginForm'
import { useAuthProvider } from '../context/authContext'

const Login = () => {
  const { access, authLoading, authError, role } = useAuthProvider();
  const navigate = useNavigate();


  useEffect(() => {
    if (access && role) {
      if (role === "professor") {
        navigate("/dashboard");
      } else if (role === "admin") {
        navigate("/admin");
      }
    }
  }, [access, role, navigate]);

  return (
    <div>
        <LoginForm error={authError} loading={authLoading} />
    </div>
  )
}

export default Login