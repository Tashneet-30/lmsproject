import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TeacherSidebar from './teachersidebar'; // Adjust the import path based on your file structure

const baseurl = 'http://127.0.0.1:8000/api';

const EditCourse = () => {
  const { course_id } = useParams();
  const [course, setCourse] = useState({
    id: '',
    title: '',
    description: '',
    featured_img: '',
    techs: '',
    category: '',
    teacher: ''
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch categories
    axios.get(`${baseurl}/course-categories/`)
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        setError("There was an error fetching the categories!");
        console.error("There was an error fetching the categories!", error);
      });

    // Fetch course details if course_id is provided
    if (course_id) {
      axios.get(`${baseurl}/teacher-courses-detail/${course_id}/`)
        .then(response => {
          setCourse(response.data);
        })
        .catch(error => {
          setError("There was an error fetching the course details!");
          console.error("There was an error fetching the course details!", error);
        });
    }
  }, [course_id]);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', course.title);
    formData.append('description', course.description);
    formData.append('techs', course.techs);
    formData.append('category', parseInt(course.category)); // Ensure category ID is integer if needed
    formData.append('teacher', parseInt(course.teacher)); // Ensure teacher ID is integer if needed
    formData.append('featured_img', course.featured_img); // Append the file object

    axios.put(`${baseurl}/teacher-courses-detail/${course_id}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        console.log("Course updated successfully:", response.data);
        // Optionally, show a success message or redirect
      })
      .catch(error => {
        if (error.response) {
          // Server responded with an error status (4xx or 5xx)
          console.error("Server Error:", error.response.data);
        } else if (error.request) {
          // Request was made but no response was received
          console.error("No response received:", error.request);
        } else {
          // Something else happened while setting up the request
          console.error("Error setting up the request:", error.message);
        }
        setError("There was an error updating the course!");
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCourse({ ...course, [name]: value });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <div className="col-md-9">
          <div className="card">
            <h5 className="card-header">Edit Course</h5>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={course.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows="3"
                    value={course.description}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="featured_img" className="form-label">Featured Image URL</label>
                  <input
                    type="text"
                    className="form-control"
                    id="featured_img"
                    name="featured_img"
                    value={course.featured_img}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="techs" className="form-label">Technologies</label>
                  <input
                    type="text"
                    className="form-control"
                    id="techs"
                    name="techs"
                    value={course.techs}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">Category</label>
                  <select
                    className="form-control"
                    id="category"
                    name="category"
                    value={course.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="teacher" className="form-label">Teacher ID</label>
                  <input
                    type="text"
                    className="form-control"
                    id="teacher"
                    name="teacher"
                    value={course.teacher}
                    onChange={handleInputChange}
                    required
                    disabled // Assuming this is an ID and should not be edited directly
                  />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCourse;
