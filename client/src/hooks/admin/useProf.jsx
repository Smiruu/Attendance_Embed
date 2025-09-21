import { useState } from "react";
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const useProf = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createProf = async ({ accessToken, email, password, full_name, id_code }) => {
    setLoading(true);
    try {
      await API.post(
        "/professor/create",
        { email, password, full_name, id_code },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    } catch (err) {
      setError(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteProf = async(id, accessToken) =>{
    setLoading(true);
    try {
      await API.delete(
        `/professor/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    } catch (err) {
      setError(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    error,
    createProf,
    deleteProf,
  };
};

