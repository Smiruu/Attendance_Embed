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
  const [authLoading, setLoading] = useState(true); // Start with true to check auth on mount
  const [authError, setError] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const refresh = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await API.get("/auth/refresh");
        setUser(res.data.user);
        setRole(res.data.role.role);
        setAccess(res.data.accessToken);
      } catch (err) {
        // Only set error if it's not a 401 (no refresh token is normal for logged out users)
        if (err?.response?.status !== 401) {
          setError(err?.response?.data?.message || "Authentication error");
        }
        // Clear any stale auth data
        setUser(null);
        setRole(null);
        setAccess(null);
      } finally {
        setLoading(false);
        setIsInitialized(true);
      }
    };
    
    refresh();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const res = await API.post("/auth/login", { email, password });

      console.log(res);
      setUser(res.data.user);
      setRole(res.data.role.role);
      setAccess(res.data.accessToken);
      
      return { success: true };
    } catch (err) {
      const errorMessage = err?.response?.data?.message || "Login failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await API.post("/auth/logout", {}, {
        headers: { Authorization: `Bearer ${access}` }
      });
    } catch (err) {
      console.error("Logout failed (but clearing state anyway):", err);
    } finally {
      // Always clear state regardless of API call success
      setUser(null);
      setRole(null);
      setAccess(null);
      setError(null);
      setLoading(false);
      localStorage.removeItem("accessToken"); 
      localStorage.removeItem("profId");      
      window.location.href = "/";
    }
  };

  // Helper function to check if user is authenticated
  const isAuthenticated = () => {
    return user && access && role;
  };

  // Helper function to check if user has specific role
  const hasRole = (requiredRole) => {
    return role === requiredRole;
  };

  const value = {
    user,
    authLoading,
    authError,
    access,
    role,
    isInitialized,
    isAuthenticated,
    hasRole,
    login,
    logout
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthProvider = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthProvider must be used within an AuthProvider');
  }
  return context;
};