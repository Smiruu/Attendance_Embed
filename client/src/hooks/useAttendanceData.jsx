import { useState } from "react";
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useAttendanceData = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  // Fetch attendance by course + date
  const getAttendance = async (courseId, date, accessToken) => {
    if (!courseId || !date) return; // ✅ don't call if missing

    setLoading(true);
    setError(null);

    try {
      const res = await API.get(`/attendance/${courseId}/${date}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setAttendance(res.data|| []); // ✅ update state
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to fetch attendance");
    } finally {
      setLoading(false);
    }
  };

  return {
    attendance,
    loading,
    error,

    getAttendance,
  };
};

export default useAttendanceData;
