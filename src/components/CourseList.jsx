const CourseList = ({ courses }) => {
  return (
    <section className="tables">
      <div className="caption">
        <h3>Current Courses</h3>
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search..."
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Course Code</th>
            <th>Course Title</th>
            {/* <th>Lecturer Name</th> */}
            <th>Lecturer ID</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={`${course[0]}${index}${course[1]}`}>
              <td>{index + 1}</td>
              <td>{course.subject_code}</td>
              <td>{course.subject_title}</td>
              <td>{course.id_lecturer_in_charge}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default CourseList;
