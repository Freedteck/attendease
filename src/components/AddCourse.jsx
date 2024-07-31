import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

const AddCourse = ({ BASE }) => {
  const navigate = useNavigate();
  const { token } = useFetch();
  const [subjectCode, setSubjectCode] = useState("");
  const [title, setTitle] = useState("");
  const [lecturerInCharge, setLecturerInCharge] = useState("");
  const [lecturers, setLecturers] = useState([]);

  const handleClick = (e) => {
    e.preventDefault();
    if (title && subjectCode && lecturerInCharge) {
      addCourse();
      navigate(-1);
    }
  };

  const addCourse = async () => {
    await fetch(`${BASE}/admin/add-subject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        subject_code: subjectCode,
        subject_title: title,
        id_lecturer_in_charge: lecturerInCharge,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

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

  return (
    <div className="layout">
      <h2>Add Course</h2>

      <form>
        <fieldset>
          <legend>Add a Course</legend>
          <label htmlFor="subject-code">Subject Code</label>
          <input
            type="text"
            name="subject-code"
            id="subject-code"
            required
            placeholder="Add Subject code"
            value={subjectCode}
            onChange={(e) => setSubjectCode(e.target.value)}
          />
          <label htmlFor="title">Subject Title</label>
          <input
            type="text"
            name="subject-title"
            id="title"
            required
            placeholder="Add Subject title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="lecturer-id">Lecturer in charge</label>
          <select
            name="lecturer-id"
            id="lecturer-id"
            defaultValue={lecturerInCharge}
            onChange={(e) => setLecturerInCharge(e.target.value)}
            required
          >
            <option value="" disabled>
              Enter ID of the Lecturer
            </option>
            {lecturers.map((lecturer) => (
              <option value={lecturer.id} key={lecturer.id}>
                {lecturer.id}
              </option>
            ))}
          </select>
          <button onClick={handleClick}>Add Now</button>
        </fieldset>
      </form>
    </div>
  );
};

export default AddCourse;
