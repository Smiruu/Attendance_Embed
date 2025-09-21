import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [role, setRole] = useState();
  const [access, setAccess] = useState(null);
  const [authLoading, setLoading] = useState(false);
  const [authError, setError] = useState(null);

  useEffect(() => {
    const refresh = async () => {
      try {
        const res = await API.get("/auth/refresh");
        setUser(res.data.user);
        setRole(res.data.role.role);
        setAccess(res.data.accessToken);
      } catch (err) {
        setError(err?.response?.data?.message);
      }
    };
    refresh();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const res = await API.post("/auth/login", { email, password });

      console.log(res);
      setUser(res.data.user);
      setRole(res.data.role.role);
      setAccess(res.data.accessToken);
    } catch (err) {
      setError(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    authLoading,
    authError,
    access,
    role,
    login,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthProvider = () => useContext(AuthContext);
