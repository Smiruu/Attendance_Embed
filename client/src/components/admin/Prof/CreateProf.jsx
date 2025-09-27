import { useState } from "react";
import { useProf } from "../../../hooks/admin/useProf";
import { useAuthProvider } from "../../../context/authContext"; // to get accessToken

const CreateProf = () => {
  const { createProf, loading, error } = useProf();
  const { access } = useAuthProvider(); // 👈 from your auth context
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    full_name: "",
    id_code: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createProf({
      ...formData,
      accessToken: access, // 👈 pass token from context
    });
  };

  return (
    <div className=" h-[80dvh] flex flex-col justify-center items-center">
      <div className="w-80">
        <h1 className="text-xl font-bold mb-4">Create Professor</h1>

        <form onSubmit={handleSubmit} className="space-y-4 ">
          <div>
            <label className="block text-black w-[10rem]">Full Name</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
              className="w-full border p-2 text-black"
            />
          </div>

          <div>
            <label className="block text-black">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border p-2 text-black"
            />
          </div>

          <div>
            <label className="block text-black">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border p-2 text-black"
            />
          </div>

          <div>
            <label className="block text-black">Id Code</label>
            <input
              type="text"
              name="id_code"
              value={formData.id_code}
              onChange={handleChange}
              required
              className="w-full border p-2 text-black"
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-800 text-white p-2 hover:bg-gray-900"
          >
            {loading ? "Creating..." : "Create Professor"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProf;
