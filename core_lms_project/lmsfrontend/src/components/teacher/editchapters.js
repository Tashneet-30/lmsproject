import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TeacherSidebar from './teachersidebar';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert

const baseurl = 'http://localhost:8000/api';

function EditChapters() {
  const { chapter_id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState(null);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');
  const [remarks, setRemarks] = useState('');
  const [course, setCourse] = useState('');
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch courses
    axios.get(`${baseurl}/courses/`)
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error("Error fetching courses:", error);
      });

    // Fetch chapter data
    axios.get(`${baseurl}/chapters/${chapter_id}/`)
      .then(response => {
        const chapter = response.data;
        setTitle(chapter.title);
        setDescription(chapter.description);
        setRemarks(chapter.remarks);
        setCourse(chapter.course);
        if (chapter.video) {
          setCurrentVideoUrl(chapter.video);
        }
      })
      .catch(error => {
        console.error("Error fetching chapter data:", error);
      });
  }, [chapter_id]);

  const handleFileChange = (event) => {
    setVideo(event.target.files[0]);
  };

  const formSubmit = (event) => {
    event.preventDefault();

    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to update this chapter?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('remarks', remarks);
        formData.append('course', course);

        if (video) {
          formData.append('video', video);
        }

        axios.put(`${baseurl}/chapters/${chapter_id}/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          console.log("Chapter updated successfully:", response.data);
          Swal.fire(
            'Updated!',
            'The chapter has been updated.',
            'success'
          );
        })
        .catch(error => {
          if (error.response) {
            console.error("Error updating chapter:", error.response.data);
          } else {
            console.error("Error updating chapter:", error.message);
          }
        });
      }
    });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <div className="col-9">
          <div className="card">
            <h5 className="card-header">Update Chapter</h5>
            <div className="card-body">
              <form onSubmit={formSubmit}>
                <div className="mb-3">
                  <label htmlFor="course" className="form-label">Course</label>
                  <select 
                    id="course" 
                    className="form-control" 
                    value={course} 
                    onChange={(e) => setCourse(e.target.value)}
                  >
                    <option value="">Select Course</option>
                    {courses.map(course => (
                      <option key={course.id} value={course.id}>{course.title}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" id="title" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="video" className="form-label">Video</label>
                  {currentVideoUrl && !video && (
                    <div>
                      <video controls width="100%">
                        <source src={currentVideoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                  <input type="file" className="form-control" id="video" onChange={handleFileChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="remarks" className="form-label">Remarks</label>
                  <textarea className="form-control" id="remarks" value={remarks} onChange={(e) => setRemarks(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditChapters;
