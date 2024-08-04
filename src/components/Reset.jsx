import { useState } from "react";
import useFetch from "../hooks/useFetch";
import "../styles/initialize.css";

const BASE = "http://localhost:8080/api/v1";

const Reset = ({ handleClose }) => {
  const [old, setOld] = useState("");
  const [newP, setNewP] = useState("");
  const { token } = useFetch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${BASE}/auth/updatePassword`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        oldPassword: old,
        newPassword: newP,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        handleClose();
      })
      .catch((error) => {
        console.log("Failed to change password", error);
      });
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Change Password</legend>
          <label htmlFor="old">Old password</label>
          <input
            type="text"
            id="old"
            name="old"
            value={old}
            min={10}
            placeholder="Enter your old password"
            onChange={(e) => setOld(e.target.value)}
          />

          <label htmlFor="duration">New password</label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={newP}
            min={10}
            placeholder="Enter new password"
            onChange={(e) => setNewP(e.target.value)}
          />
          <div className="btns">
            <button type="submit">Change Now</button>
            <button type="button" onClick={handleClose}>
              Cancel
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Reset;
