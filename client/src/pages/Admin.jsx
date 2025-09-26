import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthProvider } from "../context/authContext.jsx";
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
  const navigate = useNavigate();
  
  // Use auth context
  const { logout, isAuthenticated, hasRole, authLoading, isInitialized } = useAuthProvider();

  // Check if user is authenticated and has admin role
  useEffect(() => {
    if (isInitialized && !authLoading) {
      if (!isAuthenticated()) {
        navigate('/');
      } else if (!hasRole('admin')) {
        // Redirect non-admin users to dashboard or appropriate page
        navigate('/dashboard');
      }
    }
  }, [isInitialized, authLoading, isAuthenticated, hasRole, navigate]);

  const handleLogout = async () => {
    await logout();
    // Navigation is handled in the logout function
  };

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
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <button
            onClick={handleLogout}
            disabled={authLoading}
            className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 px-3 py-1 rounded text-sm transition-colors duration-200"
            title="Logout"
          >
            {authLoading ? '...' : 
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
              </svg>
            }
            </button>
        </div>

        <div className="flex-1">
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