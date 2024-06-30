import React from 'react';
import TeacherSidebar from './teachersidebar';

function AddChapters() {
    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <div className="col-9">
                    <div className="card">
                        <h5 className="card-header">Add Chapters</h5>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" id="title" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea className="form-control" id="description" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="video" className="form-label">Video</label>
                                    <input type="file" className="form-control" id="video" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="techs" className="form-label">Rearks</label>
                                    <textarea placeholder="This videos is focused on basic introduction"className="form-control" id="techs" />
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
