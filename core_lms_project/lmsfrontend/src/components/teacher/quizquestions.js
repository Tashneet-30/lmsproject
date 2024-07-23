import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import TeacherSidebar from './teachersidebar';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseurl = 'http://127.0.0.1:8000/api';

function AllQuestions() {
  const [questionData, setQuestionData] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const { quiz_id } = useParams();

  useEffect(() => {
    axios.get(`${baseurl}/quiz-questions/${quiz_id}/`)
      .then((res) => {
        setQuestionData(res.data);
      })
      .catch((error) => {
        console.error('Error fetching quiz questions:', error);
      });
  }, [quiz_id]);

  const handleDeleteClick = (question_id) => {
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
        axios.delete(`${baseurl}/quiz-questions/${question_id}/`)
          .then((response) => {
            setQuestionData(questionData.filter(question => question.id !== question_id));
            Swal.fire('Deleted!', 'The question has been deleted.', 'success');
          })
          .catch((error) => {
            console.error('Error deleting question:', error);
            Swal.fire('Error!', 'There was an error deleting the question.', 'error');
          });
      }
    });
  };

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <div className="col-md-9">
          <div className="card">
            <h5 className="card-header">All Quiz Questions</h5>
            <div className="card-body">
              {selectedQuestion ? (
                <div>
                  <h5>Question Details</h5>
                  <p>Question: {selectedQuestion.questions}</p>
                  <p>Answer 1: {selectedQuestion.ans1}</p>
                  <p>Answer 2: {selectedQuestion.ans2}</p>
                  <p>Answer 3: {selectedQuestion.ans3}</p>
                  <p>Answer 4: {selectedQuestion.ans4}</p>
                  <p>Correct Answer: {selectedQuestion.right_ans}</p>
                  <button onClick={() => setSelectedQuestion(null)} className="btn btn-sm btn-secondary">Back</button>
                </div>
              ) : (
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Question</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {questionData.map((question, index) => (
                      <tr key={index}>
                        <td>
                          <button className="btn btn-link" onClick={() => handleQuestionClick(question)}>
                            {question.questions}
                          </button>
                        </td>
                        <td>
                          <Link to={`/edit-quiz-question/${question.id}`} className="btn btn-sm btn-info mr-2">Edit</Link>
                          <button onClick={() => handleDeleteClick(question.id)} className="btn btn-sm btn-danger">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllQuestions;
