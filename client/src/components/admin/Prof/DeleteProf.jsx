import { useState } from "react";
import { useProf } from "../../../hooks/admin/useProf";
import { useAuthProvider } from "../../../context/authContext";

const DeleteProf = () => {
  const { deleteProf, loading, error } = useProf(); // 👈 from your hook
  const { access } = useAuthProvider(); // 👈 get token
  const [profId, setProfId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!profId) return;
    await deleteProf(profId, access); // 👈 pass id + token
    setProfId(""); // clear field after
  };

  return (
    <div className=" h-[80dvh] flex flex-col justify-center items-center">
      <div className="w-80">
        <h1 className="text-xl font-bold mb-4">Delete Professor</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-black">Professor ID</label>
            <input
              type="text"
              name="profId"
              value={profId}
              onChange={(e) => setProfId(e.target.value)}
              required
              className="w-full border p-2 text-black"
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white p-2 hover:bg-red-700"
          >
            {loading ? "Deleting..." : "Delete Professor"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeleteProf;
