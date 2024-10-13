import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    
    const fetchSubmissions = async () => {
        try {
            const response = await axios.get('http://localhost:5000/submissions');
            setSubmissions(response.data);
            setLoading(false);
        } catch (err) {
            setError('Error fetching submissions. Please try again later.');
            setLoading(false);
        }
    };

    
    useEffect(() => {
        fetchSubmissions();
        
        const interval = setInterval(() => {
            fetchSubmissions(); 
        }, 5000);

        return () => clearInterval(interval); 
    }, []);

    if (loading) {
        return <p>Loading submissions...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (submissions.length === 0) {
        return <p>No submissions found.</p>;
    }

    return (
        <div className="dashboard-container">
            <h2>Admin Dashboard</h2>
            <div className="submissions-list">
                {submissions.map((user, index) => (
                    <div key={index} className="submission-card">
                        <h3>{user.name} ({user.socialMediaHandle})</h3>
                        <div className="submission-images">
                            {user.images.map((image, idx) => (
                                <div key={idx} className="image-thumbnail">
                                    <img 
                                        src={`http://localhost:5000/${image}`} 
                                        alt="uploaded" 
                                        className="thumbnail" 
                                    />
                                    <a href={`http://localhost:5000/${image}`} target="_blank" rel="noopener noreferrer">
                                        View Image
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;


