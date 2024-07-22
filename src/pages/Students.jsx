import { useNavigate } from "react-router-dom";
import StudentsList from "../components/StudentsList";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

const BASE = "http://localhost:8080/api/v1";

const Students = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  const { token } = useFetch();

  useEffect(() => {
    const getLecturers = async () => {
      await fetch(`${BASE}/attendance?subjectCode=MAT101`, {
        mode: "cors",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((data) => {
          setStudents(data.students);
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
        <h2>Students</h2>
        <button onClick={handleClick}>Add Student</button>
      </div>
      <StudentsList students={students} />
    </div>
  );
};

export default Students;
