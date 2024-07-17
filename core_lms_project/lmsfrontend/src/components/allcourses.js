import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const baseurl = 'http://127.0.0.1:8000';

function AllCourses() {
    const [courseData, setCourseData] = useState([]);

    useEffect(() => {
        axios.get(`${baseurl}/api/courses/`)
            .then((res) => {
                console.log('Courses fetched:', res.data);
                setCourseData(res.data);
            })
            .catch((error) => {
                console.log('Error fetching courses:', error);
            });
    }, []);

    console.log('AllCourses component is rendered');

    return (
        <div className="container mt-3">
            <h3 className="pb-1 mb-2">Latest Courses</h3>

            <div className="row">
                {courseData.map((course, index) => (
                    <div className="col-md-3 mb-4" key={index}>
                        <div className="card h-100">
                            <Link to={`/detail/${course.id}`}>
                                <img src={`${baseurl}${course.featured_img}`} className="card-img-top img-fluid" alt={course.title} style={{ height: '200px', objectFit: 'cover' }} />
                            </Link>
                            <div className="card-body">
                                <h5 className="card-title">
                                    <Link to={`/detail/${course.id}`} className="text-dark">{course.title}</Link>
                                </h5>
                                <p className="card-text">{course.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <nav aria-label="Page navigation example mt-5">
                <ul className="pagination justify-content-center">
                    <li className="page-item"><Link className="page-link" to="#">Previous</Link></li>
                    <li className="page-item"><Link className="page-link" to="#">1</Link></li>
                    <li className="page-item"><Link className="page-link" to="#">2</Link></li>
                    <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                    <li className="page-item"><Link className="page-link" to="#">Next</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default AllCourses;
