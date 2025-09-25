import React, { useState } from "react";
import CreateProf from "../components/admin/Prof/CreateProf.jsx";
import DeleteProf from "../components/admin/Prof/DeleteProf.jsx";
import CoursesFunction from "../components/admin/Prof/CoursesFunctions.jsx";

import CreateStudent from "../components/admin/Students/CreateStudent.jsx";
import DeleteStudent from "../components/admin/Students/DeleteStudent.jsx";
import AddStudentToCourse from "../components/admin/Students/AddStudentToCourse.jsx";

const Admin = () => {
  const [selectedFunction, setSelectedFunction] = useState(null);
  const [showProfMenu, setShowProfMenu] = useState(false);
  const [showStudentMenu, setShowStudentMenu] = useState(false);

  const renderFunction = () => {
    switch (selectedFunction) {
      // Professor Functions
      case "createProf":
        return <CreateProf />;
      case "deleteProf":
        return <DeleteProf />;
      case "courses":
    
        return <CoursesFunction />;

      // Student Functions
      case "createStudent":
        return <CreateStudent />;
      case "deleteStudent":
        return <DeleteStudent />;
      case "addStudentCourse":
        return <AddStudentToCourse />;

      default:
        return (
          <p className="text-gray-500 text-lg">
            Select a function from the sidebar.
          </p>
        );
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        <h2 className="text-xl font-bold p-4 border-b border-gray-700">
          Admin Panel
        </h2>

        {/* Professor Functions */}
        <div>
          <button
            onClick={() => setShowProfMenu((prev) => !prev)}
            className="w-full text-left px-4 py-2 hover:bg-gray-700"
          >
            Professor Functions
          </button>
          {showProfMenu && (
            <div className="pl-6">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                onClick={() => setSelectedFunction("createProf")}
              >
                Create Professor
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                onClick={() => setSelectedFunction("deleteProf")}
              >
                Delete Professor
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                onClick={() => setSelectedFunction("courses")}
              >
                View Professors
              </button>
            </div>
          )}
        </div>

        {/* Student Functions */}
        <div>
          <button
            onClick={() => setShowStudentMenu((prev) => !prev)}
            className="w-full text-left px-4 py-2 hover:bg-gray-700"
          >
            Student Functions
          </button>
          {showStudentMenu && (
            <div className="pl-6">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                onClick={() => setSelectedFunction("createStudent")}
              >
                Create Student
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                onClick={() => setSelectedFunction("deleteStudent")}
              >
                Delete Student
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                onClick={() => setSelectedFunction("addStudentCourse")}
              >
                Add Student to Course
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        {renderFunction()}
      </div>
    </div>
  );
};

export default Admin;
