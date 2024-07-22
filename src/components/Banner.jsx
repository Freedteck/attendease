import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

const BASE = "http://localhost:8080/api/v1";

const Banner = () => {
  const { token } = useFetch();
  const [info, setInfo] = useState("");

  useEffect(() => {
    const getCourses = async () => {
      await fetch(`${BASE}/general`, {
        mode: "cors",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setInfo(data);
        })
        .catch((error) => {
          console.error("Failed to fetch lecturers:", error);
        });
    };

    getCourses();
  }, [token]);
  return (
    <div className="banner">
      <h1 className="welcome">
        Welcome {info.firstname} {info.lastname}
      </h1>
    </div>
  );
};

export default Banner;
