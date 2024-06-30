import React from 'react';
import { Link } from 'react-router-dom';
import{useEffect,useState} from 'react';
import axios from'axios';

const baseurl='http://127.0.0.1:8000/api/';
function PopularTeachers() {
    const[teacher,setTeacher]=useState(null);
    useEffect(()=>{
        axios.get(baseurl+'/teacher/').then((response)=>{
            setTeacher();
        });

    },[]);
   
    return (
        <div className="container mt-3">
            <h3 className="pb-1 mb-2">Popular Teachers</h3>

            {/* First Row of Courses */}
            <div className="row mb-3">
                <div className="col-md-3 mb-4">
                    <div className="card">
                        <Link to="/detail/1"><img src="logo512.png" className="card-img-top" alt="Course" /></Link>
                        <div className="card-body">
                            <h5 className="card-title"><Link to="/teacher-detail/1">John Doe</Link></h5>
                        </div>
                        <div className="card-footer">
                            <div className="title">
                                <span>Rating: 4.5/5</span>
                               
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="card">
                        <Link to="#"><img src="logo512.png" className="card-img-top" alt="Course" /></Link>
                        <div className="card-body">
                            <h5 className="card-title"><Link to="#">Teacher Name</Link></h5>
                        </div>
                        <div className="card-footer">
                            <div className="title">
                                <span>Rating: 4.5/5</span>
                               
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="card">
                        <Link to="#"><img src="logo512.png" className="card-img-top" alt="Course" /></Link>
                        <div className="card-body">
                            <h5 className="card-title"><Link to="#">Course Title</Link></h5>
                        </div>
                        <div className="card-footer">
                            <div className="title">
                                <span>Rating: 4.5/5</span>
                              
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="card">
                        <Link to="#"><img src="logo512.png" className="card-img-top" alt="Course" /></Link>
                        <div className="card-body">
                            <h5 className="card-title"><Link to="#">Course Title</Link></h5>
                        </div>
                        <div className="card-footer">
                            <div className="title">
                                <span>Rating: 4.5/5</span>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Second Row of Courses */}
            <div className="row mb-3">
                <div className="col-md-3 mb-4">
                    <div className="card">
                        <Link to="#"><img src="logo512.png" className="card-img-top" alt="Course" /></Link>
                        <div className="card-body">
                            <h5 className="card-title"><Link to="#">Course Title</Link></h5>
                        </div>
                        <div className="card-footer">
                            <div className="title">
                                <span>Rating: 4.5/5</span>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="card">
                        <Link to="#"><img src="logo512.png" className="card-img-top" alt="Course" /></Link>
                        <div className="card-body">
                            <h5 className="card-title"><Link to="#">Course Title</Link></h5>
                        </div>
                        <div className="card-footer">
                            <div className="title">
                                <span>Rating: 4.5/5</span>
                           
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="card">
                        <Link to="#"><img src="logo512.png" className="card-img-top" alt="Course" /></Link>
                        <div className="card-body">
                            <h5 className="card-title"><Link to="#">Course Title</Link></h5>
                        </div>
                        <div className="card-footer">
                            <div className="title">
                                <span>Rating: 4.5/5</span>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="card">
                        <Link to="#"><img src="logo512.png" className="card-img-top" alt="Course" /></Link>
                        <div className="card-body">
                            <h5 className="card-title"><Link to="#">Course Title</Link></h5>
                        </div>
                        <div className="card-footer">
                            <div className="title">
                                <span>Rating: 4.5/5</span>
                               
                            </div>
                        </div>
                    </div>
                </div>
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

export default PopularTeachers;
