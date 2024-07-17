import React, { useState } from 'react';
import TeacherSidebar from './teachersidebar'; // Ensure the path is correct based on your directory structure
import axios from 'axios';
import Swal from 'sweetalert2';

const baseurl = 'http://127.0.0.1:8000/api';

function ChangePassword() {
  const [formData, setFormData] = useState({
    email: '',
    current_password: '',
    new_password: '',
    confirm_password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.new_password !== formData.confirm_password) {
      Swal.fire({
        title: 'Error!',
        text: 'New passwords do not match',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    axios.post(`${baseurl}/change-password/`, formData)
      .then(response => {
        Swal.fire({
          title: 'Success!',
          text: response.data.success,
          icon: 'success',
          confirmButtonText: 'OK'
        });
      })
      .catch(error => {
        Swal.fire({
          title: 'Error!',
          text: error.response.data.error,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Change Password</h5>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3 row">
                  <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                  <div className="col-sm-10">
                    <input 
                      type="email" 
                      className="form-control" 
                      id="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label htmlFor="currentPassword" className="col-sm-2 col-form-label">Current Password</label>
                  <div className="col-sm-10">
                    <input 
                      type="password" 
                      className="form-control" 
                      id="currentPassword" 
                      name="current_password"
                      value={formData.current_password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label htmlFor="newPassword" className="col-sm-2 col-form-label">New Password</label>
                  <div className="col-sm-10">
                    <input 
                      type="password" 
                      className="form-control" 
                      id="newPassword" 
                      name="new_password"
                      value={formData.new_password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label htmlFor="confirmPassword" className="col-sm-2 col-form-label">Confirm Password</label>
                  <div className="col-sm-10">
                    <input 
                      type="password" 
                      className="form-control" 
                      id="confirmPassword" 
                      name="confirm_password"
                      value={formData.confirm_password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <hr />
                <button type="submit" className="btn btn-primary">Update</button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ChangePassword;
