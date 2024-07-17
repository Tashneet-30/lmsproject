import React, { useState, useEffect } from 'react';
import TeacherSidebar from './teachersidebar';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseurl = 'http://127.0.0.1:8000/api';

function ProfileSetting() {
  const [teacher, setTeacher] = useState({
    full_name: '',
    email: '',
    qualification: '',
    mobile_no: '',
    skills: '',
    profile_pic: null,
  });
  const [prevProfilePic, setPrevProfilePic] = useState(null);
  const teacherId = localStorage.getItem('teacherId');

  useEffect(() => {
    axios.get(`${baseurl}/teachers/${teacherId}/`)
      .then(response => {
        setTeacher({
          ...response.data,
          profile_pic: null,
        });
        setPrevProfilePic(response.data.profile_pic);
      })
      .catch(error => {
        console.error('There was an error fetching the teacher data!', error);
      });
  }, [teacherId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacher({ ...teacher, [name]: value });
  };

  const handleFileChange = (e) => {
    setTeacher({ ...teacher, profile_pic: e.target.files[0] });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('full_name', teacher.full_name);
    formData.append('email', teacher.email);
    formData.append('qualification', teacher.qualification);
    formData.append('mobile_no', teacher.mobile_no);
    formData.append('skills', teacher.skills);
    if (teacher.profile_pic) {
      formData.append('profile_pic', teacher.profile_pic);
    }

    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
    }

    axios.put(`${baseurl}/teachers/${teacherId}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        console.log('Profile updated successfully:', response.data);
        setPrevProfilePic(response.data.profile_pic);
        Swal.fire({
          title: 'Success!',
          text: 'Profile updated successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      })
      .catch(error => {
        console.error('There was an error updating the profile!', error);
        Swal.fire({
          title: 'Error!',
          text: 'There was an error updating the profile',
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
            <h5 className="card-header">Profile Settings</h5>
            <div className="card-body">
              <form onSubmit={handleUpdate}>
                <div className="mb-3 row">
                  <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
                  <div className="col-sm-10">
                    <input
                      type="email"
                      className="form-control"
                      id="staticEmail"
                      name="email"
                      value={teacher.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label htmlFor="inputFullName" className="col-sm-2 col-form-label">Full Name</label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="inputFullName"
                      name="full_name"
                      value={teacher.full_name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label htmlFor="inputProfilePic" className="col-sm-2 col-form-label">Profile Picture</label>
                  <div className="col-sm-10">
                    {prevProfilePic && (
                      <img src={prevProfilePic} alt="Profile" className="img-thumbnail mb-2" />
                    )}
                    <input
                      type="file"
                      className="form-control"
                      id="inputProfilePic"
                      name="profile_pic"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label htmlFor="inputSkills" className="col-sm-2 col-form-label">Skills</label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="inputSkills"
                      name="skills"
                      value={teacher.skills}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label htmlFor="inputQualification" className="col-sm-2 col-form-label">Qualifications</label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="inputQualification"
                      name="qualification"
                      value={teacher.qualification}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label htmlFor="inputMobileNo" className="col-sm-2 col-form-label">Mobile No</label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="inputMobileNo"
                      name="mobile_no"
                      value={teacher.mobile_no}
                      onChange={handleChange}
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

export default ProfileSetting;
