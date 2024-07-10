import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TeacherSidebar from './teachersidebar'; // Adjust the import path based on your file structure
import axios from 'axios';

const baseurl = 'http://127.0.0.1:8000/api';
const mediaUrl = 'http://127.0.0.1:8000/media'; // Base URL for media files

function TeacherMyCourses() {
  const [courseData, setCourseData] = useState([]);
  const teacherId = localStorage.getItem('teacherId'); // Ensure this matches the key used in TeacherLogin

  useEffect(() => {
    if (teacherId) {
      axios.get(`${baseurl}/courses/?teacher=${teacherId}`)
        .then((res) => {
          setCourseData(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log('No teacher ID found in localStorage');
    }
  }, [teacherId]);

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">My Courses</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Total Enrolled</th>
                    <th>Image</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {courseData.map((course, index) => (
                    <tr key={index}>
                      <td>{course.title}</td>
                      <td><Link to="/">123</Link></td>
                      <td>
                      <img src={`http://localhost:8000${course.featured_img}`} alt={course.title} className="img-fluid" width="300" />
                      </td>
                      <td>
                        <button className="btn btn-danger btn-sm active">Delete</button>
                        <Link className="btn btn-success btn-sm active ms-2" to={`/add-chapters/${course.id}`}>Add chapters</Link>
                      </td>
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

export default TeacherMyCourses;
