import { useState } from "react";
import { useAuthProvider } from "../context/authContext";

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
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4">
      <div className="mb-4">
        <label className="block text-black mb-1">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border p-2 text-black"
        />
      </div>

      <div className="mb-4">
        <label className="block text-black mb-1">Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full border p-2 text-black"
        />
      </div>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <button
        type="submit"
        className="w-full bg-gray-800 text-white p-2 hover:bg-gray-900"
      >
        Login
      </button>
    </form>
  );
}
