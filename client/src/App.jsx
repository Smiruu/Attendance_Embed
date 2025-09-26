
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/authContext.jsx";
import "./index.css";
import Dashboard from "./pages/dashboard.jsx";
import Login from "./pages/Login.jsx"
import Admin from "./pages/Admin.jsx";
import StudentInfo from "./pages/StudentInfo.jsx";
function App() {

  return (
    <>
      <div>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path='/' element={<Login/>}/>
              <Route path='/admin' element={<Admin/>}/>
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="/student/:id/:name" element={<StudentInfo/>}/>
            </Routes>
          </Router>
        </AuthProvider>
      </div>
    </>
  );
}

export default App;
