import { useState } from "react";
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const useStudents = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createStudent = async (name, id_code, accessToken) => {
    setLoading(true);
    try {
      await API.post(
        "/student/create",
        { name, id_code },
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

  const getStudents = async (accessToken) => {
    setLoading(true)
    try {
      const res = await API.get("/student/",
        {headers:{
          Authorization: `Bearer ${accessToken}`
        }}
      )
      
      return res.data
    } catch (err) {
      setError(err?.response?.data?.message)
    } finally {
      setLoading(false)
    }
  }
  const deleteStudent = async(id, accessToken) => {
    setLoading(true)
    try {
        await API.delete(`/student/${id}`,{
            headers:{
                Authorization: `Bearer ${accessToken}`
            }
        })
    } catch (err) {
        setError(err?.response?.data?.message);
    } finally {
        setLoading(false)
    }
  }


  const addStudentToCourse = async(studentIds, courseId, accessToken) => {
    setLoading(true)
    try {
      const payload = {
        course_id: courseId,
        student_id: Array.isArray(studentIds) ? studentIds : [studentIds]
      }

      console.log(payload)
      await API.post('/student/course', {payload}, {
        headers:{
          Authorization: `Bearer ${accessToken}`
        }
      })
      
    } catch (err) {
      setError(err?.response?.data?.message);
    } finally {
      setLoading(false)
    }
  }

  const getCourses = async(accessToken) => {
    setLoading(true)
    try {
      const res = await API.get('/student/course', {
        headers:{
          Authorization: `Bearer ${accessToken}`
        }
      })

      return res.data
    } catch (err) {
      setError(err?.response?.data?.message);
    } finally {
      setLoading(false)
    }
  }

  const getCourseStudents = async(accessToken,courseId) => {
    setLoading(true)
    try {
      const res = await API.get(`/student/course/${courseId}`,
        {headers:{
          Authorization: `Bearer ${accessToken}`
        }}
      )

      return res.data
    } catch (err) {
      setError(err?.response?.data?.message)
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    getStudents,
    getCourses,
    createStudent,
    deleteStudent,
    addStudentToCourse,
    getCourseStudents
  };
};
