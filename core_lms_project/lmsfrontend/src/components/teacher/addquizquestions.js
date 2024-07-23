import React, { useState } from 'react';
import TeacherSidebar from './teachersidebar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function AddQuizQuestions() {
    const [questionData, setQuestionData] = useState({
        questions: '',
        ans1: '',
        ans2: '',
        ans3: '',
        ans4: '',
        right_ans: ''
    });
    const { quiz_id } = useParams();

    const handleChange = (e) => {
        setQuestionData({
            ...questionData,
            [e.target.name]: e.target.value
        });
    };

    const formSubmit = (event) => {
        event.preventDefault();
        const formData = {
            quiz: quiz_id,
            questions: questionData.questions,
            ans1: questionData.ans1,
            ans2: questionData.ans2,
            ans3: questionData.ans3,
            ans4: questionData.ans4,
            right_ans: questionData.right_ans
        };

        console.log('Form Data:', formData);  // Log the form data

        axios.post(`http://localhost:8000/api/quiz-questions/${quiz_id}/add/`, formData)
            .then(response => {
                console.log("Question added successfully:", response.data);
                Swal.fire({
                    title: 'Success',
                    text: 'Question added successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                setQuestionData({
                    questions: '',
                    ans1: '',
                    ans2: '',
                    ans3: '',
                    ans4: '',
                    right_ans: ''
                });
            })
            .catch(error => {
                console.error("There was an error adding the question!", error);
                Swal.fire({
                    title: 'Error',
                    text: 'There was an error adding the question!',
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
                        <h5 className="card-header">Add Quiz Question</h5>
                        <div className="card-body">
                            <form onSubmit={formSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="questions" className="form-label">Question</label>
                                    <textarea
                                        className="form-control"
                                        id="questions"
                                        name="questions"
                                        value={questionData.questions}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="ans1" className="form-label">Answer 1</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="ans1"
                                        name="ans1"
                                        value={questionData.ans1}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="ans2" className="form-label">Answer 2</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="ans2"
                                        name="ans2"
                                        value={questionData.ans2}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="ans3" className="form-label">Answer 3</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="ans3"
                                        name="ans3"
                                        value={questionData.ans3}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="ans4" className="form-label">Answer 4</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="ans4"
                                        name="ans4"
                                        value={questionData.ans4}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="right_ans" className="form-label">Right Answer</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="right_ans"
                                        name="right_ans"
                                        value={questionData.right_ans}
                                        onChange={handleChange}
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
}

export default AddQuizQuestions;
