import React, { useState, useEffect } from 'react';
import TeacherSidebar from './teachersidebar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const baseurl = 'http://127.0.0.1:8000/api';

function EditQuiz() {
  const [quizData, setQuizData] = useState({
    title: '',
    detail: '',
  });

  const { quiz_id } = useParams();

  useEffect(() => {
    axios.get(`${baseurl}/teacher-quiz-detail/${quiz_id}`)
      .then((res) => {
        setQuizData({
          title: res.data.title,
          detail: res.data.detail,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [quiz_id]);

  const handleChange = (event) => {
    setQuizData({
      ...quizData,
      [event.target.name]: event.target.value,
    });
  };

  const formSubmit = (event) => {
    event.preventDefault();
    const teacherId = localStorage.getItem('teacherId');
    const formData = new FormData();
    formData.append('teacher', teacherId);
    formData.append('title', quizData.title);
    formData.append('detail', quizData.detail);

    axios.put(`${baseurl}/teacher-quiz-detail/${quiz_id}/`, formData)
      .then((response) => {
        Swal.fire({
          title: 'Success!',
          text: 'Quiz updated successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      })
      .catch((error) => {
        Swal.fire({
          title: 'Error!',
          text: 'An error occurred while updating the quiz',
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
        <div className="col-9">
          <div className="card">
            <h5 className="card-header">Update Quiz</h5>
            <div className="card-body">
              <form onSubmit={formSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="form-control"
                    value={quizData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="detail" className="form-label">Detail</label>
                  <textarea
                    className="form-control"
                    id="detail"
                    name="detail"
                    value={quizData.detail}
                    onChange={handleChange}
                    required
                  />
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

export default EditQuiz;

