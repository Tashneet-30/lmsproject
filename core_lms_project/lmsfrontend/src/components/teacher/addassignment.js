import React, { useState, useEffect } from 'react';
import TeachersideBar from './teachersidebar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const baseurl = 'http://127.0.0.1:8000/api';

function AddAssignment() {
    const { teacher_id, student_id } = useParams();
    const [title, setTitle] = useState('');
    const [detail, setDetail] = useState('');

    const formSubmit = (event) => {
        event.preventDefault();

        const assignmentData = {
            title: title,
            detail: detail
        };

        axios.post(`${baseurl}/student-assignment/${teacher_id}/${student_id}`, assignmentData)
            .then(response => {
                if (response.status === 201) {
                    Swal.fire({
                        title: 'Success',
                        text: 'Assignment added successfully',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    setTitle('');
                    setDetail('');
                }
            })
            .catch(error => {
                Swal.fire({
                    title: 'Error',
                    text: 'There was an error adding the assignment!',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                console.error("There was an error!", error);
            });
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeachersideBar />
                </aside>
                <div className="col-9">
                    <div className="card">
                        <h5 className="card-header">Add Assignment</h5>
                        <div className="card-body">
                            <form onSubmit={formSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" id="title" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="detail" className="form-label">Detail</label>
                                    <textarea className="form-control" id="detail" value={detail} onChange={(e) => setDetail(e.target.value)} />
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

export default AddAssignment;
