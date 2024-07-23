
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SideBar from './sidebar'; // Adjust the import path based on your file structure
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const baseurl = 'http://127.0.0.1:8000/api';

function StudentAssignment() {
  const [assignmentData, setAssignmentData] = useState([]);
  const [assignmentStatus, setAssignmentStatus] = useState('');

  useEffect(() => {
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

  const markAsDone = async (assignmentId) => {
    try {
      const response = await axios.post(`${baseurl}/update-assignment/${assignmentId}/`);
      if (response.status === 200) {
        setAssignmentStatus('success');

        // Update the specific assignment's status in the state
        setAssignmentData((prevData) =>
          prevData.map((assignment) =>
            assignment.id === assignmentId
              ? { ...assignment, status: 'completed' }
              : assignment
          )
        );

        MySwal.fire({
          icon: 'success',
          title: 'Marked as Done',
          text: 'The assignment has been marked as done.',
        });
      }
    } catch (error) {
      console.error('Error marking assignment as done:', error);
      setAssignmentStatus('error');

      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: 'There was an error marking the assignment as done.',
      });
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
                      <th>Added Time</th>
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
                          {assignment.status !== 'completed' ? (
                            <button
                              onClick={() => markAsDone(assignment.id)}
                              className="btn btn-success btn-sm active ms-2"
                            >
                              Mark as Done
                            </button>
                          ) : (
                            <button className="btn btn-secondary btn-sm active ms-2" disabled>
                              Completed
                            </button>
                          )}
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
