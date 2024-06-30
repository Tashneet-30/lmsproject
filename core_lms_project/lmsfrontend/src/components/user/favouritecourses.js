import React from 'react';
import { Link } from 'react-router-dom';
import SideBar from './sidebar'; // Adjust the path based on your project structure
function FavouriteCourses() {
    return (
      <div className="container mt-4">
        <div className="row">
          <aside className="col-md-3">
            <SideBar />
          </aside>
          <section className="col-md-9">
            <div className="card">
              <h5 className="card-header">FavouriteCourses</h5>
              <div className="card-body">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Created By</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>PHP Development</td>
                      <td><Link to="/">Raj Kumar</Link></td>
                      <td>
                        <button className="btn btn-danger btn-sm active">Delete</button>
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
  
  export default FavouriteCourses;