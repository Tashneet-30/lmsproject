import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const baseurl = 'http://127.0.0.1:8000';

function Home() {
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

    console.log('Home component is rendered');

    return (
        <div className="container mt-3">
            <h3 className="pb-1 mb-4 mt-5">Latest Courses <Link to="/all-courses" className="float-end">See All</Link></h3>
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

            <h3 className="pb-1 mb-4 mt-5">Featured Courses <Link to="/" className="float-end">See All</Link></h3>
            <div className="row">
                {/* Sample Featured Courses */}
                <div className="col-md-3">
                    <div className="card">
                        <Link to="#"><img src="logo512.png" className="card-img-top" alt="Course" /></Link>
                        <div className="card-body">
                            <h5 className="card-title"><Link to="#">Course Title</Link></h5>
                        </div>
                        <div className="card-footer">
                            <div className="title">
                                <span>Rating: 4.5/5</span>
                                <span className="float-end">Views: 76890</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Repeat similar structure for other featured courses */}
            </div>

            <h3 className="pb-1 mb-4 mt-5">Featured Teachers <Link to="/popular-teachers" className="float-end">See All</Link></h3>
            <div className="row">
                {/* Sample Featured Teachers */}
                <div className="col-md-3">
                    <div className="card">
                        <Link to="#"><img src="logo512.png" className="card-img-top" alt="Teacher" /></Link>
                        <div className="card-body">
                            <h5 className="card-title"><Link to="#">Teacher Name</Link></h5>
                        </div>
                    </div>
                </div>
                {/* Repeat similar structure for other featured teachers */}
            </div>

            <h3 className="pb-1 mb-4 mt-5">Student Testimonials</h3>
            {/* Carousel for Student Testimonials */}
            <div id="carouselExampleIndicators" className="carousel slide bg-dark py-5 text-white">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    {/* Sample Carousel Items */}
                    <div className="carousel-item active">
                        <figure className="text-center">
                            <blockquote className="blockquote">
                                <p>A well-known quote, contained in a blockquote element.</p>
                            </blockquote>
                            <figcaption className="blockquote-footer">
                                Someone famous in <cite title="Source Title">Source Title</cite>
                            </figcaption>
                        </figure>
                    </div>
                    {/* Repeat similar structure for other carousel items */}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}

export default Home;
