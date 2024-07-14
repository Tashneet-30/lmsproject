import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import TeacherSidebar from './teachersidebar'; // Adjust the import path based on your file structure
import axios from 'axios';

const baseurl = 'http://127.0.0.1:8000/api';

function AllChapters() {
  const [chapterData, setChapterData] = useState([]);
  const { course_id } = useParams();

  useEffect(() => {
    axios.get(`${baseurl}/course-chapters/${course_id}`)
      .then((res) => {
        setChapterData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [course_id]);

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">All Chapters</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Video</th>
                    <th>Remarks</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {chapterData.map((chapter, index) => (
                    <tr key={index}>
                      <td><Link to="#">{chapter.title}</Link></td>
                      <td>
                        {chapter.video ? (
                          <video controls width="250">
                            <source src={chapter.video.url} type="video/webm" />
                            <source src={chapter.video.url} type="video/mp4" />
                            Download the
                            <a href={chapter.video.url}>WEBM</a> or
                            <a href={chapter.video.url}>MP4</a> video.
                          </video>
                        ) : (
                          'No video available'
                        )}
                      </td>
                      <td>{chapter.remarks}</td>
                      <td>
                        <button className="btn btn-danger">Delete</button>
                        <button className="btn btn-info ms-1">Edit</button>
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

export default AllChapters;
