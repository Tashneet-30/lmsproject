import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import TeacherSidebar from './teachersidebar'; // Adjust the import path based on your file structure
import axios from 'axios';
import Swal from 'sweetalert2';

const baseurl = 'http://127.0.0.1:8000/api';

function AllChapters() {
  const [chapterData, setChapterData] = useState([]);
  const [totalResult, setTotalResult] = useState(0);
  const { course_id } = useParams();

  useEffect(() => {
    axios.get(`${baseurl}/course-chapters/${course_id}/`)
      .then((res) => {
        setTotalResult(res.data.length);
        setChapterData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [course_id]);

  const handleDeleteClick = (chapterId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${baseurl}/chapters/${chapterId}/`)
          .then((response) => {
            // Remove deleted chapter from state
            setChapterData(chapterData.filter(chapter => chapter.id !== chapterId));
            Swal.fire(
              'Deleted!',
              'The chapter has been deleted.',
              'success'
            );
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">All Chapters ({totalResult})</h5>
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
                      <td>
                        <Link to={`/edit-chapters/${chapter.id}`}>{chapter.title}</Link>
                      </td>
                      <td>
                        {chapter.video ? (
                          <video controls width="100%">
                            <source src={chapter.video} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          'No video available'
                        )}
                      </td>
                      <td>{chapter.remarks}</td>
                      <td>
                        <Link to={`/edit-chapters/${chapter.id}`} className="btn btn-sm btn-info">
                          <i className="bi bi-pencil-square"></i>
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(chapter.id)}
                          className="btn btn-sm btn-danger ms-2"
                        >
                          <i className="bi bi-trash-fill"></i>
                        </button>
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
