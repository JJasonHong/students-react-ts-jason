import {useState, useEffect} from "react"; // Importing React hooks
import {Student} from "../models/Student"; // Importing Student type or model
import Config from "../config"; // Importing configuration (likely containing API URL)
import { Link } from "react-router-dom";
import List from "./List";

type Props = {
  exceptId?: number; // Defining an optional prop 'exceptId' which is a number
};

const StudentList = ({exceptId = undefined}: Props) => {
  // Declaring state: studentInfo holds the student data, setStudentInfo updates it
  const [studentInfo, setStudentInfo] = useState([]);

  // Function to fetch student data from the API
  const getData = async () => {
    // Making a GET request to fetch students from the API
    const response = await fetch(`${Config.API_BASE_URL}students/`, {
      method: "GET", // HTTP method type
      headers: {
        "Content-Type": "application/json", // Ensures JSON data is sent/received
        Accept: "application/json", // Tells server we accept JSON
      },
    });

    // Parsing the JSON response
    const jsonData = await response.json();

    // Updating state: studentInfo is set to the fetched student data
    setStudentInfo(jsonData);
  };

  useEffect(() => {
    // Fetching student data when the component mounts
    getData();

    // Logging studentInfo to console (will initially log an empty array due to async state update)
    console.log(studentInfo);
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  // Copying studentInfo into filteredStudents
  let filteredStudents = studentInfo;

  // If exceptId is provided, filter out the student with that ID
  if (exceptId !== undefined) {
    filteredStudents = studentInfo.filter(
      (p: Student) => p.StudentId !== +exceptId // Convert exceptId to number and exclude matching StudentId
    );
  }

  return (
    <div>
      <List
      //gets two parameters, items and render
        items={filteredStudents}
        render={(student: Student) => (
          <Link to={`/detail/${student.StudentId}`}>
            <h6 className="text-muted">
              {student.StudentId} {student.FirstName} {student.LastName}
            </h6>
          </Link>
        )}
      />
    </div>
  );
};

export default StudentList; // Exporting component for use in other parts of the application
