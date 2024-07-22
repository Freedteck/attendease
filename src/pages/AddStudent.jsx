import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const BASE = "http://localhost:8080/api/v1";

const AddStudent = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [error, setError] = useState(""); // Added for error handling
  const { token } = useFetch();

  useEffect(() => {
    const getCourses = async () => {
      await fetch(`${BASE}/attendance/mySubjects`, {
        mode: "cors",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((data) => {
          setCourses(data.data);
        })
        .catch((error) => {
          console.error("Failed to fetch courses:", error);
        });
    };

    getCourses();
  }, [token]);

  const addStudent = async () => {
    await fetch(
      `${BASE}/attendance/add?studentId=${studentId}&subjectCode=${subjectCode}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          studentId,
          subjectCode,
        }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Student not found");
        }
        response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const handleClick = (e) => {
    e.preventDefault();
    setError("");
    addStudent();
    navigate(-1);
  };
  return (
    <div className="layout">
      <h2>Add Student</h2>
      <form onSubmit={handleClick}>
        <fieldset>
          <legend>Add a Student</legend>
          <label htmlFor="student-id">Student Id</label>
          <input
            type="text"
            name="student-id"
            id="student-id"
            required
            placeholder="Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
          <select
            name="course"
            id="course"
            required
            defaultValue=""
            onChange={(e) => setSubjectCode(e.target.value)}
          >
            <option value="" disabled>
              Select course
            </option>
            {courses.map((course, index) => (
              <option value={course.subjectId} key={`${course}${index}`}>
                {course.subjectId}
              </option>
            ))}
          </select>
          {error && <p className="error">{error}</p>} <button>Add Now</button>
        </fieldset>
      </form>
    </div>
  );
};

export default AddStudent;
