import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TeacherSidebar from './teachersidebar'; // Adjust the import path based on your file structure
import axios from 'axios';

const baseurl = 'http://127.0.0.1:8000/api';

function TeacherMyCourses() {
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    try {
      axios.get(baseurl + '/courses/').then((res) => {
        const filteredCourses = res.data.filter(course => course.teacher === 3);
        setCourseData(filteredCourses);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  console.log(courseData);

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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {courseData.map((course, index) => (
                    <tr key={index}>
                      <td>{course.title}</td>
                      <td><Link to="/">123</Link></td>
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
