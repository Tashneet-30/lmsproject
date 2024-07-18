import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import TeacherSidebar from './teachersidebar';

const baseurl = 'http://127.0.0.1:8000/api';

function UserList() {
    const [students, setStudents] = useState([]);
    const { teacher_id } = useParams();  // Get teacher_id from URL parameters

    useEffect(() => {
        axios.get(`${baseurl}/fetch-all-enrolled-students/${teacher_id}`)
            .then((res) => {
                setStudents(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [teacher_id]);

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">All Students List</h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Full Name</th>
                                        <th>Email</th>
                                        <th>Username</th>
                                        <th>Interest</th>
                                        <th>Assignment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map((enrollment, index) => (
                                        <tr key={index}>
                                            <td>{enrollment.student.full_name}</td>
                                            <td>{enrollment.student.email}</td>
                                            <td>{enrollment.student.username}</td>
                                            <td>{enrollment.student.interest}</td>
                                            <td>
                                                <Link to={`/show-assignment/${teacher_id}/${enrollment.student.id}`}className="btn btn-sm btn-warning">Assignments</Link>
                                                <Link to={`/add-assignment/${teacher_id}/${enrollment.student.id}`} className="btn btn-sm btn-success ms-2">Add Assignment</Link>
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

export default UserList;
