import React from 'react';
import { Link } from 'react-router-dom';
import TeacherSidebar from './teachersidebar'; // Adjust the path based on your project structure
function TeacherMycourses() {
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
                    <tr>
                      <td>PHP Development</td>
                      <td><Link to="/">123</Link></td>
                      <td>
                        <button className="btn btn-danger btn-sm active">Delete</button>
                        <Link class ="btn btn-success btn-sm active ms-2"to="/add-chapters/2">Add chapters</Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
  
  export default TeacherMycourses;
  
