import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const teacherLoginStatus = localStorage.getItem('teacherLoginStatus');

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Guru Kashi University</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            <a className="nav-link" href="#">Courses</a>
            <div className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Teacher
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {teacherLoginStatus !== 'true' ? (
                  <>
                    <li><Link className="dropdown-item" to="/teacher-login">Login</Link></li>
                    <li><Link className="dropdown-item" to="/teacher-register">Register</Link></li>
                  </>
                ) : (
                  <>
                    <li><Link className="dropdown-item" to="/teacher-dashboard">Dashboard</Link></li>
                    <li><Link className="dropdown-item" to="/teacher-logout">Logout</Link></li>
                  </>
                )}
              </ul>
            </div>
            <div className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                User
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/user-login">Login</Link></li>
                <li><Link className="dropdown-item" to="/user-register">Register</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="/user-dashboard">Dashboard</Link></li>
                <li><a className="dropdown-item" href="#">Logout</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;