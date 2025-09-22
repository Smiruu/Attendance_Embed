import React, { useState } from "react";
import CreateProf from "../components/admin/CreateProf.jsx";
// import UpdateProf from "../components/admin/UpdateProf.jsx";
import DeleteProf from "../components/admin/DeleteProf.jsx";
import CoursesFunction from "../components/admin/CoursesFunctions.jsx"; // 👈 import

const Admin = () => {
  const [selectedFunction, setSelectedFunction] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  const renderFunction = () => {
    switch (selectedFunction) {
      case "create":
        return <CreateProf />;
      case "delete":
        return <DeleteProf />;
      case "courses": // 👈 added
        return <CoursesFunction />;
      default:
        return null;
    }
  };

  return (
    <div className="text-black p-4">
      <h1 className="text-xl font-bold mb-4">Admin</h1>

      {/* Dropdown-like button */}
      <div className="relative">
        <button
          onClick={() => setShowMenu((prev) => !prev)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Professor Functions
        </button>

        {showMenu && (
          <div className="absolute mt-2 w-48 bg-white border rounded shadow-md">
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                setSelectedFunction("create");
                setShowMenu(false);
              }}
            >
              Create Professor
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                setSelectedFunction("delete");
                setShowMenu(false);
              }}
            >
              Delete Professor
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                setSelectedFunction("courses"); // 👈 trigger CoursesFunction
                setShowMenu(false);
              }}
            >
              View Professors
            </button>
          </div>
        )}
      </div>

      {/* Render selected component */}
      <div className="mt-6">{renderFunction()}</div>
    </div>
  );
};

export default Admin;
