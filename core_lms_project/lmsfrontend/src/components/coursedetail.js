import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseurl = 'http://127.0.0.1:8000/api';

function CourseDetail() {
  const { course_id } = useParams();
  const [courseData, setCourseData] = useState({});
  const [chapterData, setChapterData] = useState([]);
  const [teacherData, setTeacherData] = useState({});
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const studentId = localStorage.getItem('studentId');

    // Fetch course data
    axios.get(`${baseurl}/courses/${course_id}`)
      .then((res) => {
        setCourseData(res.data);
        setChapterData(res.data.course_chapters || []);
        setTeacherData(res.data.teacher || {});
      })
      .catch((error) => {
        console.log('Error fetching course data:', error);
      });

    // Check if student is enrolled
    axios.get(`${baseurl}/student-enroll-course/`)
      .then((res) => {
        const enrolledCourses = res.data;
        const isEnrolled = enrolledCourses.some((enrollment) => 
          enrollment.course === parseInt(course_id) && enrollment.student === parseInt(studentId)
        );
        setIsEnrolled(isEnrolled);
      })
      .catch((error) => {
        console.log('Error checking enrollment status:', error);
      });
  }, [course_id]);

  const EnrollCourse = () => {
    const formData = new FormData();
    const studentId = localStorage.getItem('studentId');
    formData.append('course', course_id);
    formData.append('student', studentId);

    axios.post(`${baseurl}/student-enroll-course/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      Swal.fire({
        title: 'Success!',
        text: 'You have enrolled in the course successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      setIsEnrolled(true);  // Update the state to hide the enroll button
    })
    .catch(error => {
      Swal.fire({
        title: 'Error!',
        text: 'There was an error enrolling in the course.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    });
  };

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
          <p className="fw-bold">Total Enrolled: {courseData.total_enrolled_students} Student(s) </p>
          <p className="fw-bold">Rating: 4/5</p>
          {!isEnrolled && (
            <p><button onClick={EnrollCourse} className="btn btn-success">Enroll in this Course</button></p>
          )}
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
      </div>
    </div>
  );
}

export default CourseDetail;

