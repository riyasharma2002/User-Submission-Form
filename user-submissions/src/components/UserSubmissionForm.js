import React, { useState } from 'react';
import axios from 'axios';

const UserSubmissionForm = () => {
    const [name, setName] = useState('');
    const [socialMediaHandle, setSocialMediaHandle] = useState('');
    const [images, setImages] = useState([]); // State for selected images

    // This function will be triggered when the user selects images
    const handleFileChange = (e) => {
        setImages(e.target.files); // Store the selected files in state
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const formData = new FormData();
        formData.append('name', name);
        formData.append('socialMediaHandle', socialMediaHandle);

        // Append each image file to FormData
        Array.from(images).forEach((image) => {
            formData.append('images', image);
        });

        try {
            const response = await axios.post('https://backend-mivkgqd2h-riya-sharmas-projects-58bc816f.vercel.app/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Submission successful:', response.data);
         
            setName('');
            setSocialMediaHandle('');
            setImages([]);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="form-container">
            <h2>User Submission Form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Social Media Handle</label>
                    <input
                        type="text"
                        value={socialMediaHandle}
                        onChange={(e) => setSocialMediaHandle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Upload Images</label>
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange} 
                        required
                    />
                </div>
                <div>
                    <label>Selected Images:</label>
                    <ul>
                        {Array.from(images).map((image, idx) => (
                            <li key={idx}>{image.name}</li>
                        ))}
                    </ul>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default UserSubmissionForm;
