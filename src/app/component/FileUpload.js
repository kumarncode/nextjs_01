'use client';
import { useState } from 'react';

export default function FileUpload() {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                alert('File uploaded successfully');
                setFile(null);
            } else {
                alert('Upload failed');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div className='main'>
            <form style={{display:"flex",gap:"5px"}} onSubmit={handleSubmit}>
            <input style={{padding:"5px 10px",border:"1px solid #ddd",borderRadius:"5px"}} type="file" onChange={handleFileChange} />
            <button style={{padding:"5px 10px",border:"1px solid #ddd",borderRadius:"5px",backgroundColor:"blue",color:"white"}} type="submit">Submit</button>
        </form>
        </div>
    );
}