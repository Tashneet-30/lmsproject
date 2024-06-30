import React from 'react';
import { Link } from 'react-router-dom';

function TeacherDetail() {
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-4">
          <img src="/logo512.png" className="img-thumbnail" alt="Teacher Image" />
        </div>
        <div className="col-8">
          <h3>John Doe</h3>
          <p>
            Using a combination of grid and utility classes, cards can be made horizontal in a mobile-friendly and responsive way. In the example below, we remove the grid gutters with .g-0 and use .col-md-* classes to make the card horizontal at the md breakpoint. Further adjustments may be needed depending on your card content.
          </p>
          <p className="fw-bold">Skills: 
            <Link to="/teacher-detail/1"> PHP</Link>,
            <Link to="/teacher-detail/1"> C++</Link>,
            <Link to="/teacher-detail/1"> JS</Link>,
            <Link to="/teacher-detail/1"> Python</Link>
          </p>
          <p className="fw-bold">Recent Course: <Link to="/teacher-detail/1">ReactJs Course</Link></p>
          <p className="fw-bold">Rating: 4/5</p>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header">
          <h4>Course List</h4>
        </div>
        <div className="list-group list-group-flush">
          <Link to="/detail/1" class="list-group-item list-group-item-action">PHP Course 1</Link>
          <Link to="/detail/1" class="list-group-item list-group-item-action">PHP Course 2</Link>
          <Link to="/detail/1" class="list-group-item list-group-item-action">PHP Course 3</Link>
          <Link to="/detail/1" class="list-group-item list-group-item-action">PHP Course 4</Link>
          <Link to="/detail/1" class="list-group-item list-group-item-action">PHP Course 5</Link>
        </div>
      </div>
    </div>
  );
}

export default TeacherDetail;
