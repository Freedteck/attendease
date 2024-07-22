import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const BASE = "http://localhost:8080/api/v1";

const UserForm = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [schoolEmail, setSchoolEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("instructor");
  const { token } = useFetch();

  const handleClick = (e) => {
    e.preventDefault();
    fetch(`${BASE}/admin/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        id: userId,
        firstName,
        lastName,
        schoolEmail,
        phoneNumber: phone,
        role,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        navigate(-1);
      })
      .catch((error) => {
        // Show an error message to the user
        console.error("Login failed:", error);
      });
  };
  return (
    <div className="layout">
      <h2 style={{ textAlign: "center" }}>Add User</h2>
      <form onSubmit={handleClick}>
        <fieldset>
          <legend>Add a User</legend>
          <fieldset className="radio">
            <label className="role">
              <input
                type="radio"
                name="role"
                value={"instructor"}
                checked={role === "instructor"}
                onChange={(e) => setRole(e.target.value)}
              />
              Lecturer
            </label>
            <label className="role">
              <input
                type="radio"
                name="role"
                value={"student"}
                checked={role === "student"}
                onChange={(e) => setRole(e.target.value)}
              />
              Student
            </label>
          </fieldset>
          <label htmlFor="user-id">User Id</label>
          <input
            type="text"
            name="first-name"
            placeholder="ID"
            id="user-id"
            required
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            name="first-name"
            placeholder="First name"
            id="first-name"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            name="last-name"
            placeholder="Last name"
            id="last-name"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <label htmlFor="email">School Email</label>
          <input
            type="email"
            name="school-email"
            id="email"
            required
            placeholder="School email address"
            value={schoolEmail}
            onChange={(e) => setSchoolEmail(e.target.value)}
          />
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            name="phone-number"
            placeholder="Phone number"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {/* <div className="roles">
                        <label className="role">
                            <input type="radio" name="role" />
                            Lecturer
                        </label>
                        <label className="role">
                            <input type="radio" name="role" />
                            Admin
                        </label>
                    </div> */}
          <button>Add Now</button>
        </fieldset>
      </form>
    </div>
  );
};

export default UserForm;
