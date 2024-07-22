import { NavLink } from "react-router-dom";
import "../styles/menus.css";

const Menus = () => {
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
      </ul>
    </section>
  );
};

export default Menus;
