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

function App() {
  const [jwtToken, setJwtToken] = useState(localStorage.getItem("jwtToken"));
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const expiryDate = localStorage.getItem("expiryDate");

    if (token && expiryDate) {
      const now = Date.now();
      if (now > parseInt(expiryDate, 10)) {
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
            <Route path="courses" element={<Users />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
