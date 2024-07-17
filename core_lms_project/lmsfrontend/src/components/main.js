



import React from 'react';
import Header from './header'; // Adjust the path if Header.js is in a different folder
import Home from './home';
import About from './about';
import TeacherLogin from './teacher/teacherlogin';
import TeacherLogout from './teacher/teacherlogout';
import TeacherRegister from './teacher/teacherregister';
import AddCourse from './teacher/addcourse';
import EditCourse from './teacher/editcourse';
import AddChapters from './teacher/addchapters';
import AllChapters from './teacher/coursechapters';
import EditChapters from './teacher/editchapters';
import TeacherMycourses from './teacher/teachermycourses';
import StudentLogin from './user/studentlogin';
import StudentRegister from './user/studentregister';
import StudentLogout from './user/studentlogout';
import Dashboard from './user/dashboard';
import TeacherDashboard from './teacher/teacherdashboard';
import MyCourses from './user/mycourses';
import FavouriteCourses from './user/favouritecourses';
import RecommendedCourses from './user/recommendedcourses';
import ProfileSetting from './teacher/profilesetting';
import ChangePassword from './teacher/changepassword';
import Footer from './footer'; // Correct the path to import Footer
import CourseDetail from './coursedetail';
import TeacherDetail from './teacherdetail';
import AllCourses from './allcourses';
import PopularCourses from './popularcourses';
import PopularTeachers from './popularteachers';
import { Routes, Route } from 'react-router-dom';

function Main() {
  return (
    <div className="main">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/detail/:course_id" element={<CourseDetail />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/student-logout" element={<StudentLogout />} />
        <Route path="/student-register" element={<StudentRegister />} />
        <Route path="/user-dashboard" element={<Dashboard />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/favourite-courses" element={<FavouriteCourses />} />
        <Route path="/recommended-courses" element={<RecommendedCourses />} />
        <Route path="/profile-settings" element={<ProfileSetting />} />
        <Route path="/change-password" element={<ChangePassword/>} />
        <Route path="/login-teacher" element={<TeacherLogin />} />
        <Route path="/register-teacher" element={<TeacherRegister/>} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher-detail/:teacher_id" element={<TeacherDetail />} />
        <Route path="/all-courses" element={<AllCourses />} />
        <Route path="/popular-courses" element={<PopularCourses />} />
        <Route path="/popular-teachers" element={<PopularTeachers/>} />
        {/* Add other routes as necessary */}
        <Route path="/logout-teacher" element={<TeacherLogout />} />
        <Route path="/add-chapters/:course_id" element={<AddChapters />} />
        <Route path="/teachermy-courses" element={<TeacherMycourses />} />
        <Route path="/add-courses/" element={<AddCourse />} />
        <Route path="/edit-courses/:course_id" element={<EditCourse />} />
        <Route path="/all-chapters/:course_id" element={<AllChapters />} />
        <Route path="/edit-chapters/:chapter_id" element={<EditChapters />} />

      </Routes>
      <Footer />
    </div>
  );
}

export default Main;
