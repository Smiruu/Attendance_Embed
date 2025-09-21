
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/authContext.jsx";
import "./index.css";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx"

function App() {

  return (
    <>
      <div>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path='/' element={<Login/>}/>

              <Route path="/dashboard" element={<Dashboard/>}/>

            </Routes>
          </Router>
        </AuthProvider>
      </div>
    </>
  );
}

export default App;
