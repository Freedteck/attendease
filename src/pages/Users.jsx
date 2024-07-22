import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import LecturersList from "../components/LecturersList";
import "../styles/users.css";

const BASE = "http://localhost:8080/api/v1";

const Users = () => {
  const navigate = useNavigate();
  const [lecturers, setLecturers] = useState([]);
  const { token } = useFetch();

  useEffect(() => {
    const getLecturers = async () => {
      await fetch(`${BASE}/admin/instructor`, {
        mode: "cors",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((data) => {
          setLecturers(data.data);
        })
        .catch((error) => {
          console.error("Failed to fetch lecturers:", error);
        });
    };

    getLecturers();
  }, [token]);

  const handleClick = () => {
    navigate("./add");
  };

  return (
    <div className="layout">
      <div className="add">
        <h2>Lecturers</h2>
        <button onClick={handleClick}>Add User</button>
      </div>
      <LecturersList lecturers={lecturers} />
    </div>
  );
};

export default Users;
