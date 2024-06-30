import React from 'react';


import SideBar from './sidebar';
function Dashboard() {
    return (
      <div className="container mt-4">
        <div className="row">
          <aside className="col-md-3">
            <SideBar />
          </aside>
          <section className="col-md-9">
            Dashboard
          </section>
        </div>
      </div>
    );
  }
  
  export default Dashboard;