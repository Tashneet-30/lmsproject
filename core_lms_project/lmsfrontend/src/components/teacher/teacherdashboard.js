import React from 'react';


import TeachersideBar from './teachersidebar';
function TeacherDashboard() {
    return (
      <div className="container mt-4">
        <div className="row">
          <aside className="col-md-3">
            <TeachersideBar />
          </aside>
          <section className="col-md-9">
            Dashboard
          </section>
        </div>
      </div>
    );
  }
  
  export default TeacherDashboard;