import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TeacherSidebar from './teachersidebar';
const AddCourse = () => {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [featuredImage, setFeaturedImage] = useState(null);
  const [technologies, setTechnologies] = useState('');
  const [category, setCategory] = useState('');
  const [teacher, setTeacher] = useState(1); // Default teacher ID

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch categories
    axios.get('http://localhost:8000/api/course-categories/')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the categories!", error);
      });

    // Fetch courses
    axios.get('http://localhost:8000/api/courses/')
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the courses!", error);
      });
  }, []); // Empty dependency array means this effect runs once on component mount

  const handleFileChange = (event) => {
    setFeaturedImage(event.target.files[0]);
  };

  const formSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('featured_img', featuredImage);
    formData.append('techs', technologies);
    formData.append('category', category);
    formData.append('teacher', teacher); // Add teacher ID to form data

    axios.post('http://localhost:8000/api/create-course/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      console.log("Course created successfully:", response.data);
      // Update the list of courses after creating a new course
      axios.get('http://localhost:8000/api/courses/')
        .then(response => {
          setCourses(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching the courses!", error);
        });
    })
    .catch(error => {
      console.error("There was an error creating the course!", error);
    });
  };

  return (
    <div className="container mt-5">
      <h2>Add New Course</h2>
      <form onSubmit={formSubmit}>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <select className="form-control" id="category" required onChange={e => setCategory(e.target.value)}>
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="featuredImage" className="form-label">Featured Image</label>
          <input
            type="file"
            className="form-control"
            id="featuredImage"
            onChange={handleFileChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="technologies" className="form-label">Technologies</label>
          <input
            type="text"
            className="form-control"
            id="technologies"
            value={technologies}
            onChange={e => setTechnologies(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

      {/* Display list of courses */}
      <div className="mt-5">
        <h2>Course List</h2>
        <ul className="list-group">
          {courses.map(course => (
            <li key={course.id} className="list-group-item">
              <h5>{course.title}</h5>
              <p>{course.description}</p>
              <img src={`http://localhost:8000${course.featured_img}`} alt={course.title} className="img-fluid" width="80" />
              <p>Technologies: {course.techs}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddCourse;
