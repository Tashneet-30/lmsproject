import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TeacherSidebar from './teachersidebar';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseurl = 'http://127.0.0.1:8000/api';

function AllQuiz() {
  const [quizData, setQuizData] = useState([]);
  const teacherId = localStorage.getItem('teacherId');

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        if (teacherId) {
          const response = await axios.get(`${baseurl}/teacher-quiz/${teacherId}/`);
          setQuizData(response.data);
        } else {
          console.log('No teacher ID found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();
  }, [teacherId]);

  const handleDeleteClick = (quiz_id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${baseurl}/quiz/${quiz_id}/`)
          .then((response) => {
            setQuizData(quizData.filter(quiz => quiz.id !== quiz_id));
            Swal.fire('Deleted!', 'The quiz has been deleted.', 'success');
          })
          .catch((error) => {
            console.error('Error deleting quiz:', error);
            Swal.fire('Error!', 'There was an error deleting the quiz.', 'error');
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
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">All Quizzes</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Total Questions</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {quizData.map((quiz) => (
                    <tr key={quiz.id}>
                      <td>
                        <Link to={`/all-questions/${quiz.id}`}>{quiz.title}</Link>
                      </td>
                      <td>{quiz.total_questions || 'N/A'}</td>
                      <td>
                        <Link className="btn btn-info btn-sm ms-2" to={`/edit-quiz/${quiz.id}`}>Edit</Link>
                        <Link className="btn btn-success btn-sm ms-2" to={`/add-quiz-question/${quiz.id}`}>Add Questions</Link>
                        <button onClick={() => handleDeleteClick(quiz.id)} className="btn btn-sm btn-danger ms-2">
                          <i className="bi bi-trash-fill"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AllQuiz;

