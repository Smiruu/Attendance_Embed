import { useState } from "react";
import { useAuthProvider } from "../../context/authContext";
import { FaUser, FaLock } from "react-icons/fa";

export default function LoginForm({ error, loading }) {

    const{login} = useAuthProvider();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    console.log(formData)
    e.preventDefault();
    await login(formData.email, formData.password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      {/*title upper left*/}
      <div className="absolute top-6 left-8 flex items-center space-x-2">
        <div className="w-8 h-8 rounded-full bg-[#554640]" />
        <h1 className="text-[#554640] font-bold text-lg">
          Attendance Based System
        </h1>
      </div>

      {/*login card*/}
      <div className="bg-[#554640] text-white rounded-2xl shadow-lg p-10 w-96">
        <h2 className="text-2xl font-extrabold text-center mb-6"> LOGIN </h2>

    <form onSubmit={handleSubmit}>
          {/*username*/}
          <div className="mb-5">
            <label className="block font-semibold mb-1">Email</label>
            <div className="flex items-center bg-white rounded-full px-3 py-2">
              <FaUser className="text-[#554640] mr-2" />
              <input
                type="email"
                name="email"
                placeholder="Type your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="flex-1 outline-none text-sm text-[#554640] bg-transparent"
              />
            </div>
          </div>

          {/*password */}
          <div className="mb-5">
            <label className="block font-semibold mb-1">Password</label>
            <div className="flex items-center bg-white rounded-full px-3 py-2">
              <FaLock className="text-[#554640] mr-2" />
              <input
                type="password"
                name="password"
                placeholder="Type your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="flex-1 outline-none text-sm text-[#554640] bg-transparent"
              />
            </div>
          </div>

          {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

          {/*button*/}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-[#554640] font-bold py-2 rounded-full hover:bg-gray-100 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
