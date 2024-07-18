import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import TeacherSidebar from './teachersidebar'; // Adjust the import path based on your file structure
import axios from 'axios';

const baseurl = 'http://127.0.0.1:8000/api';

function ShowAssignment() {
  const [assignmentData, setAssignmentData] = useState([]);
  const [totalResult, setTotalResult] = useState(0);
  const { teacher_id, student_id } = useParams();

  const fetchAssignments = () => {
    axios.get(`${baseurl}/student-assignment/${teacher_id}/${student_id}`)
      .then((res) => {
        setTotalResult(res.data.length);
        setAssignmentData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchAssignments();
  }, [teacher_id, student_id]);

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">All Assignments ({totalResult})</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {assignmentData.map((assignment, index) => (
                    <tr key={index}>
                      <td>{assignment.title}</td>
                      <td>{assignment.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ShowAssignment;
