import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../styles/menus.css";

const Menus = () => {
  const [role, setRole] = useState(localStorage.getItem("userRoles") || []);

  useEffect(() => {
    const handleStorageChange = () => {
      setRole(localStorage.getItem("userRoles") || []);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <section className="menus">
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
        </li>
        {role.includes("ROLE_SUPER_ADMIN") && (
          <>
            <li>
              <NavLink
                to="/users"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/courses"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Courses
              </NavLink>
            </li>
          </>
        )}
        {role.includes("ROLE_LECTURER") && (
          <>
            <li>
              <NavLink
                to="/attendance"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Attendance sheet
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/students"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Students
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </section>
  );
};

export default Menus;
