import React, { useState } from 'react';
import axios from 'axios';
import TeacherSidebar from './teachersidebar'; // Adjust import path as per your file structure

const AddQuiz = () => {
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');

  const formSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/quiz/', {
        title,
        detail
      });

      console.log('Quiz created successfully:', response.data);
      // Reset form fields after successful submission
      setTitle('');
      setDetail('');
    } catch (error) {
      console.error('Error creating quiz:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <div className="col-md-9">
          <div className="card">
            <h5 className="card-header">Add Quiz</h5>
            <div className="card-body">
              <form onSubmit={formSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="detail" className="form-label">Detail</label>
                  <textarea
                    className="form-control"
                    id="detail"
                    rows="3"
                    value={detail}
                    onChange={(e) => setDetail(e.target.value)}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Add Quiz</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddQuiz;

