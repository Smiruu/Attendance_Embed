import { useState } from "react";
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const useCourses = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createCourse = async ({ accessToken, prof_id, name,section,time_start, time_end, day, room }) => {
    setLoading(true);
    try {
      await API.post(
        "/professor/courses/create",
        { prof_id, name, section,time_start, time_end, day, room},
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

  const getProfCourses = async({accessToken, prof_id}) =>{
    setLoading(true);
    try {
        const res = await API.get(
        `/professor/courses/${prof_id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return res.data
    } catch (err) {
      setError(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }


  

  return {
    loading,
    error,
    createCourse,
    getProfCourses
  };
};

