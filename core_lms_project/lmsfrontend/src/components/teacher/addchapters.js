import React, { useState, useEffect } from 'react';
import TeacherSidebar from './teachersidebar';
import axios from 'axios';

function AddChapters() {
    const [courses, setCourses] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [video, setVideo] = useState(null);
    const [remarks, setRemarks] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');

    useEffect(() => {
        // Fetch courses
        axios.get('http://localhost:8000/api/courses/')
            .then(response => {
                setCourses(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the courses!", error);
            });
    }, []);

    const handleFileChange = (event) => {
        setVideo(event.target.files[0]);
    };

    const formSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('video', video);
        formData.append('remarks', remarks);
        formData.append('course', selectedCourse);

        axios.post('http://localhost:8000/api/chapters/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            console.log("Chapter added successfully:", response.data);
            // Reset form fields
            setTitle('');
            setDescription('');
            setVideo(null);
            setRemarks('');
            setSelectedCourse('');
        })
        .catch(error => {
            console.error("There was an error adding the chapter!", error);
        });
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <div className="col-9">
                    <div className="card">
                        <h5 className="card-header">Add Chapter</h5>
                        <div className="card-body">
                            <form onSubmit={formSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="course" className="form-label">Course</label>
                                    <select id="course" className="form-control" value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
                                        <option value="">Select Course</option>
                                        {courses.map(course => (
                                            <option key={course.id} value={course.id}>{course.title}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" id="title" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="video" className="form-label">Video</label>
                                    <input type="file" className="form-control" id="video" onChange={handleFileChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="remarks" className="form-label">Remarks</label>
                                    <textarea className="form-control" id="remarks" value={remarks} onChange={(e) => setRemarks(e.target.value)} />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddChapters;
