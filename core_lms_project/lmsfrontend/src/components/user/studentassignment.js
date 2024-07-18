import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SideBar from './sidebar'; // Adjust the import path based on your file structure
import axios from 'axios';

const baseurl = 'http://127.0.0.1:8000/api';

function StudentAssignment() {
  const [assignmentData, setAssignmentData] = useState([]);

  useEffect(() => {
    // Fetch assignments when component mounts
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const studentId = localStorage.getItem('studentId');
      if (studentId) {
        const response = await axios.get(`${baseurl}/my-assignments/${studentId}/`);
        setAssignmentData(response.data);
      } else {
        console.log('No student ID found in localStorage');
      }
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <SideBar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">My Assignments</h5>
            <div className="card-body">
              {assignmentData.length === 0 ? (
                <p>No assignments found.</p>
              ) : (
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Detail</th>
                      <th>Teacher</th>
                      <th>Add Time</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignmentData.map((assignment) => (
                      <tr key={assignment.id}>
                        <td>{assignment.title}</td>
                        <td>{assignment.detail}</td>
                        <td>{assignment.teacher.full_name}</td>
                        <td>{new Date(assignment.add_time).toLocaleString()}</td>
                        <td>
                          <Link className="btn btn-info btn-sm active ms-2" to={`/assignment-details/${assignment.id}`}>
                            View
                          </Link>
                          {/* Add more actions like Edit and Delete here */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default StudentAssignment;
