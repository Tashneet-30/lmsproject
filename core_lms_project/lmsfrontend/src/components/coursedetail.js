import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const baseurl = 'http://127.0.0.1:8000/api';

function CourseDetail() {
  const { course_id } = useParams();
  const [courseData, setCourseData] = useState({});
  const [chapterData, setChapterData] = useState([]);
  const [teacherData, setTeacherData] = useState({});

  useEffect(() => {
    axios.get(`${baseurl}/courses/${course_id}`)
      .then((res) => {
        console.log('Course Data:', res.data); // Log the response data
        setCourseData(res.data);
        setChapterData(res.data.course_chapters || []); // Ensure chapters are set correctly
        setTeacherData(res.data.teacher || {}); // Ensure teacher data is set correctly
      })
      .catch((error) => {
        console.log('Error fetching course data:', error);
      });
  }, [course_id]);

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-4">
          {courseData.featured_img ? (
            <img src={courseData.featured_img} className="img-thumbnail" alt="Course" />
          ) : (
            <p>No image available</p>
          )}
        </div>
        <div className="col-8">
          <h3>{courseData.title}</h3>
          <p>{courseData.description}</p>
          {teacherData.full_name && (
            <p className="fw-bold">Course By: <Link to={`/teacher-detail/${teacherData.id}`}>{teacherData.full_name}</Link></p>
          )}
          <p className="fw-bold">Course Duration: <a href="#" role="button">3 hours 30 Minutes</a></p>
          <p className="fw-bold">Total Enrolled: 370 students</p>
          <p className="fw-bold">Rating: 4/5</p>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header">
          <h4>Course Videos</h4>
        </div>
        <ul className="list-group list-group-flush">
          {chapterData.length > 0 ? (
            chapterData.map((chapter, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                {chapter.title}
                <span className="float-end">
                  {chapter.duration && <span className="me-3">{chapter.duration}</span>}
                  <button className="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target={`#videoModal${index + 1}`}>
                    <i className="bi bi-youtube bi-lg"></i>
                  </button>
                </span>
              </li>
            ))
          ) : (
            <li className="list-group-item">No chapters available.</li>
          )}
        </ul>
      </div>

      {/* Modals for videos */}
      {chapterData.map((chapter, index) => (
        <div key={index} className="modal fade" id={`videoModal${index + 1}`} tabIndex="-1" aria-labelledby={`videoModalLabel${index + 1}`} aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id={`videoModalLabel${index + 1}`}>{chapter.title}</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="ratio ratio-16x9">
                  <video controls width="100%">
                    <source src={chapter.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <h3 className="pb-1 mb-4 mt-5">Featured Courses</h3>
      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <Link to={`/detail/${courseData.id}`}><img src="/logo512.png" className="card-img-top" alt="Course" /></Link>
            <div className="card-body">
              <h5 className="card-title"><Link to="#">Course Title</Link></h5>
            </div>
          </div>
        </div>
        {/* Add more featured courses as needed */}
      </div>
    </div>
  );
}

export default CourseDetail;
