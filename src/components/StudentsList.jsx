import { useState } from "react";

const StudentsList = ({ students }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to filter students based on search query
  const filteredStudents = students.filter((student) => {
    const fullName = `${student.firstname} ${student.lastname}`.toLowerCase();
    return (
      fullName.includes(searchQuery.toLowerCase()) ||
      student.studentId.toString().includes(searchQuery)
    );
  });

  return (
    <section className="tables">
      <div className="caption">
        <h3>Current Students</h3>
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Student Name</th>
            {/* <th>Email</th> */}
            <th>Student ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr key={`${student[0]}${index}${student[1]}`}>
              <td>{index + 1}</td>
              <td>{student.firstname + " " + student.lastname}</td>
              {/* <td>{student.email}</td> */}
              <td>{student.studentId}</td>
              <td className="table-btn">
                <button>Suspend</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default StudentsList;
