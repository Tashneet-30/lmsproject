import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import TeachersideBar from './teachersidebar';

const baseurl = 'http://127.0.0.1:8000/api';

function EnrolledStudents() {
  const { course_id } = useParams();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get(`${baseurl}/fetch-enrolled-students/${course_id}/`)
      .then((res) => {
        setStudents(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [course_id]);

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeachersideBar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Enrolled Students</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Interest</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((enrollment, index) => (
                    <tr key={index}>
                      <td>{enrollment.student.full_name}</td>
                      <td>{enrollment.student.email}</td>
                      <td>{enrollment.student.username}</td>
                      <td>{enrollment.student.interest}</td>
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

export default EnrolledStudents;
