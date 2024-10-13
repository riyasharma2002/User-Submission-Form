import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await axios.get('https://backend-mivkgqd2h-riya-sharmas-projects-58bc816f.vercel.app/');
                setSubmissions(response.data);
            } catch (error) {
                console.error('Error fetching submissions:', error);
            }
        };

        fetchSubmissions();
    }, []);

    return (
        <div className="dashboard-container">
            <h2>Admin Dashboard</h2>
            <div>
              
                {submissions.length > 0 ? (
                    submissions.map((user, index) => (
                        <div key={index} className="submission-card">
                            <h3>{user.name} ({user.socialMediaHandle})</h3>
                            <div className="submission-images">
                                {user.images.map((image, idx) => (
                                    <img key={idx} src={`https://your-backend-url.com/${image}`} alt="Uploaded" />
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No submissions found</p>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
