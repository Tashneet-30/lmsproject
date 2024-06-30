import React from 'react';
import { Link } from 'react-router-dom';
import AllCourses from './allcourses';
import {useEffect} from 'react';
function Home() {
  useEffect(()=>{
    document.title='LMS-Home';
  });
  return (
    <div className="container mt-3">
      <h3 className="pb-1 mb-4 mt-5">LatestCourses <Link to="/all-courses" className="float-end">See All</Link></h3>
      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <Link to="#"><img src="logo512.png" className="card-img-top" alt="Course" /></Link>
            <div className="card-body">
              <h5 className="card-title"><Link to="/detail/1">Course Title</Link></h5>
            </div>
          </div>

          </div>

        <div className="col-md-3">
          <div className="card">
            <Link to="#"><img src="logo512.png" className="card-img-top" alt="Course" /></Link>
            <div className="card-body">
              <h5 className="card-title"><Link to="#">Course Title</Link></h5>
            </div>
          </div>
         
          </div>

        <div className="col-md-3">
          <div className="card">
            <Link to="#"><img src="logo512.png" className="card-img-top" alt="Course" /></Link>
            <div className="card-body">
              <h5 className="card-title"><Link to="#">Course Title</Link></h5>
            </div>
          </div>
         
        </div>

        <div className="col-md-3">
          <div className="card">
            <Link to="#"><img src="logo512.png" className="card-img-top" alt="Course" /></Link>
            <div className="card-body">
              <h5 className="card-title"><Link to="#">Course Title</Link></h5>
            </div>
          </div>
        </div>

      </div>
      
      <h3 className="pb-1 mb-4 mt-5">Featured Courses <Link to="/" className="float-end">See All</Link></h3>
      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <Link to="#"><img src="logo512.png" className="card-img-top" alt="Course" /></Link>
            <div className="card-body">
              <h5 className="card-title"><Link to="#">Course Title</Link></h5>
            </div>
          </div>
          <div className="card-footer">
            <div className="title">
            <span>Rating:4.5/5</span>
            <span className="float-end">Views:76890</span>
          </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card">
            <Link to="#"><img src="logo512.png" className="card-img-top" alt="Course" /></Link>
            <div className="card-body">
              <h5 className="card-title"><Link to="#">Course Title</Link></h5>
            </div>
          </div>
          <div className="card-footer">
            <div className="title">
            <span>Rating:4.5/5</span>
            <span className="float-end">Views:76890</span>
          </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card">
            <Link to="#"><img src="logo512.png" className="card-img-top" alt="Course" /></Link>
            <div className="card-body">
              <h5 className="card-title"><Link to="#">Course Title</Link></h5>
            </div>
          </div>
          <div className="card-footer">
            <div className="title">
            <span>Rating:4.5/5</span>
            <span className="float-end">Views:76890</span>
          </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card">
            <Link to="#"><img src="logo512.png" className="card-img-top" alt="Course" /></Link>
            <div className="card-body">
              <h5 className="card-title"><Link to="#">Course Title</Link></h5>
            </div>
          </div>
        </div>

      </div>

      <h3 className="pb-1 mb-4 mt-5">Featured Teachers <Link to="/popular-teachers" className="float-end">See All</Link></h3>
      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <Link to="#"><img src="logo512.png" className="card-img-top" alt="Teacher" /></Link>
            <div className="card-body">
              <h5 className="card-title"><Link to="#">Teacher Name</Link></h5>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card">
            <Link to="#"><img src="logo512.png" className="card-img-top" alt="Teacher" /></Link>
            <div className="card-body">
              <h5 className="card-title"><Link to="#">Teacher Name</Link></h5>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card">
            <Link to="#"><img src="logo512.png" className="card-img-top" alt="Teacher" /></Link>
            <div className="card-body">
              <h5 className="card-title"><Link to="#">Teacher Name</Link></h5>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card">
            <Link to="#"><img src="logo512.png" className="card-img-top" alt="Teacher" /></Link>
            <div className="card-body">
              <h5 className="card-title"><Link to="#">Teacher Name</Link></h5>
            </div>
          </div>
        </div>
      </div>

      <h3 className="pb-1 mb-4 mt-5">Student Testimonials</h3>

      <div id="carouselExampleIndicators" className="carousel slide bg-dark py-5 textcolor-white">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
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
          <div className="carousel-item">
            <figure className="text-center">
              <blockquote className="blockquote">
                <p>A well-known quote, contained in a blockquote element.</p> 
              </blockquote>
              <figcaption className="blockquote-footer">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </figcaption>
            </figure>
          </div>
          <div className="carousel-item">
            <figure className="text-center">
              <blockquote className="blockquote">
                <p>A well-known quote, contained in a blockquote element.</p> 
              </blockquote>
              <figcaption className="blockquote-footer">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </figcaption>
            </figure>
          </div>
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
