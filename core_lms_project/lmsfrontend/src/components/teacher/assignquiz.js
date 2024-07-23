import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import TeacherSidebar from './teachersidebar'; // Adjust import based on your file structure
import axios from 'axios';
import Swal from 'sweetalert2';

const baseurl = 'http://127.0.0.1:8000/api';

function AssignQuiz() {
  const [quizData, setQuizData] = useState([]);
  const [courseData, setCourseData] = useState({});
  const teacherId = localStorage.getItem('teacherId');
  const { course_id } = useParams();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        if (teacherId) {
          const response = await axios.get(`${baseurl}/teacher-quiz/${teacherId}/`);
          const assignedQuizzesResponse = await axios.get(`${baseurl}/courses/${course_id}`);
          
          // Ensure course_quizzes and quiz data are defined and are arrays
          const courseQuizzes = assignedQuizzesResponse.data?.course_quizzes || [];
          const assignedQuizIds = new Set(courseQuizzes.map(q => q.quiz.id || null));

          // Map quizzes with safety checks
          const quizzes = response.data?.map(quiz => ({
            ...quiz,
            assigned: assignedQuizIds.has(quiz.id),
          })) || [];

          setQuizData(quizzes);
        } else {
          console.log('No teacher ID found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    const fetchCourse = async () => {
      try {
        const response = await axios.get(`${baseurl}/courses/${course_id}`);
        setCourseData(response.data || {});
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    fetchQuizzes();
    fetchCourse();
  }, [teacherId, course_id]);

  const assignQuiz = async (quiz_id) => {
    try {
      const response = await axios.post(`${baseurl}/assign-quiz/`, { quiz_id, course_id, teacher_id: teacherId });
      Swal.fire('Assigned!', 'The quiz has been assigned to the course.', 'success');
      setQuizData(quizData.map(quiz => {
        if (quiz.id === quiz_id) {
          return { ...quiz, assigned: true };
        }
        return quiz;
      }));
    } catch (error) {
      console.error('Error assigning quiz:', error);
      Swal.fire('Error!', 'There was an error assigning the quiz.', 'error');
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Assign Quizzes to {courseData.title}</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {quizData.length > 0 ? (
                    quizData.map((quiz) => (
                      <tr key={quiz.id}>
                        <td>
                          {quiz.assigned ? (
                            <>
                              {quiz.title} <span className="badge bg-success">Assigned</span>
                            </>
                          ) : (
                            <Link to={`/quiz-questions/${quiz.id}`}>{quiz.title}</Link>
                          )}
                        </td>
                        <td>
                          {!quiz.assigned && (
                            <button onClick={() => assignQuiz(quiz.id)} className="btn btn-sm btn-success ms-2">
                              <i className="bi bi-check-circle-fill"></i> Assign
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2">No quizzes available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AssignQuiz;
