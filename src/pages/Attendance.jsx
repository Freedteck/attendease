import { useEffect, useState } from "react";
import AttendanceSheet from "../components/AttendanceSheet";
import useFetch from "../hooks/useFetch";
import { saveAs } from "file-saver";

const Attendance = ({ BASE }) => {
  const [sheetDisplayed, setSheetDisplayed] = useState(false);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [subjectCode, setSubjectCode] = useState("");
  const [sortId, setSortId] = useState(0);
  const [date, setDate] = useState("");
  const [allDates, setAllDates] = useState([]);
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
          if (data.data.length > 0 && !subjectCode) {
            setSubjectCode(data.data[0].subjectId);
          }
        })
        .catch((error) => {
          console.error("Failed to fetch courses:", error);
        });
    };

    getCourses();
  }, [token, BASE, subjectCode]);

  useEffect(() => {
    const getDates = async () => {
      await fetch(
        `${BASE}/attendance/available-records?subjectCode=${subjectCode}`,
        {
          mode: "cors",
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((response) => {
          if (response.status !== 200) {
            setDate(new Date().toISOString().slice(0, 10));
            throw new Error("Failed to fetch  dates, No attendance for today");
          }
          return response.json();
        })
        .then((data) => {
          setAllDates(data.data);

          data.data.length > 0
            ? setDate(data.data[0].date)
            : setDate(new Date().toISOString().slice(0, 10));
        })
        .catch((error) => {
          console.error("Failed to fetch lecturers:", error);
        });
    };
    if (subjectCode) {
      getDates();
    }
  }, [token, subjectCode, BASE]);

  useEffect(() => {
    const getSheet = async () => {
      await fetch(
        `${BASE}/attendance/record?subjectCode=${subjectCode}&sort_id=${sortId}&date=${date}`,
        {
          mode: "cors",
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setStudents(data.META_DATA);
        })
        .catch((error) => {
          console.error("Failed to fetch sheet:", error);
        });
    };

    if (date) {
      getSheet();
    }
  }, [token, subjectCode, date, sortId, BASE]);

  const printAttendance = async () => {
    await fetch(
      `${BASE}/attendance/print?subjectCode=${subjectCode}&sort_id=${sortId}&date=${date}`,
      {
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.blob()) // Get the response as a Blob
      .then((blob) => {
        saveAs(blob, "attendance.xlsx"); // Save the Blob as a file
      })
      .catch((error) => {
        console.error("Failed to print attendance:", error);
      });
  };

  const handleClick = () => {
    setSheetDisplayed(true);
  };

  return (
    <div className="attendance layout">
      <h2>Attendance</h2>
      <section className="selections">
        <label>
          Subject
          <select
            name="subject"
            value={subjectCode}
            onChange={(e) => setSubjectCode(e.target.value)}
          >
            {courses.map((course, index) => (
              <option value={course.subjectId} key={`${course}${index}`}>
                {course.subjectId}
              </option>
            ))}
          </select>
        </label>

        <label>
          Date
          <select
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          >
            {allDates.length > 0 ? (
              allDates.map((date, index) => (
                <option value={date.date} key={`${date}${index}`}>
                  {date.date}
                </option>
              ))
            ) : (
              <option value={date}>{date}</option>
            )}
          </select>
        </label>
        <button onClick={handleClick}>Generate Sheet</button>
      </section>
      {sheetDisplayed && (
        <AttendanceSheet students={students} setSortID={setSortId} />
      )}
      <button onClick={printAttendance} className="print">
        Print Attendance
      </button>
    </div>
  );
};

export default Attendance;
