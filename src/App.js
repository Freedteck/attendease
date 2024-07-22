import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Home from "./pages/Home";
import { useState, useEffect } from "react";
import MainContent from "./components/MainContent";
import Users from "./pages/Users";
import UserForm from "./components/UserForm";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import Attendance from "./pages/Attendance";
import Courses from "./pages/Courses";
import AddCourse from "./components/AddCourse";

function App() {
  const [jwtToken, setJwtToken] = useState(localStorage.getItem("jwtToken"));
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const expiryDate = new Date(localStorage.getItem("expiryDate"));

    if (token && expiryDate) {
      const now = Date.now();
      if (now > expiryDate) {
        // Token has expired
        localStorage.clear();
        setJwtToken(null);
        setIsTokenExpired(true);
      } else {
        setJwtToken(token);
        setIsTokenExpired(false);
      }
    } else {
      setJwtToken(null);
      setIsTokenExpired(true);
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Header jwtToken={jwtToken} />
        <Routes>
          {isTokenExpired ? (
            <Route
              path="/login"
              element={<Login setJwtToken={setJwtToken} />}
            />
          ) : (
            <Route path="/login" element={<Navigate to="/" />} />
          )}
          <Route
            path="/"
            element={jwtToken ? <Home /> : <Navigate to="/login" />}
          >
            <Route index element={<MainContent />} />
            <Route path="users" element={<Users />} />
            <Route path="users/add" element={<UserForm />} />
            <Route path="courses" element={<Courses />} />
            <Route path="courses/add" element={<AddCourse />} />
            <Route path="students" element={<Students />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="students/add" element={<AddStudent />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
