import axios from 'axios'
import { createContext, useState, useContext, useEffect } from 'react'

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,  
    withCredentials: true,
})

const AuthContext = createContext();

export const AuthProvider = ({ children}) => {
    const [user, setUser] = useState();
    const [access, setAccess] = useState(null);
    const [authLoading, setLoading] = useState(true);
    const [authError, setError] = useState(false);

    useEffect(() =>{
        const refresh = async ()=>{
            try {
                const response = await API.get('/auth/refresh');
                setAccess(response.accessToken)
            } catch (err) {
                setError(err?.response?.data?.message)
            }
        }
        refresh()
    },[])
        
    const login = async (email,password) => {
        try {

            const res = await API.post('/auth/login', {email, password});

            console.log(res)
            setUser(res.data.user)
            setAccess(res.data.accessToken)
            setLoading(false)
        } catch (err) {
            setError(err?.response?.data?.message)
        }
    }

    const value ={
         user,
            authLoading,
            authError,
            access,
            login
    }
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuthProvider = () => useContext(AuthContext)