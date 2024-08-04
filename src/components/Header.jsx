import { useEffect, useState } from "react";
import "../styles/header.css";
import { useNavigate } from "react-router-dom";

const Header = ({ jwtToken }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!jwtToken);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/login");
  };

  useEffect(() => {
    setIsLoggedIn(!!jwtToken);
  }, [jwtToken]);

  return (
    <header>
      <div className="container">
        <div className="logo">
          <div className="icon">✓</div>
          <div className="text">AttendEase</div>
        </div>
        {!isLoggedIn && (
          <button onClick={() => navigate("/login")}>Login</button>
        )}
        {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
      </div>
    </header>
  );
};

export default Header;
