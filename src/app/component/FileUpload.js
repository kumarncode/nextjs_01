'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersApi, removeUser } from '../redux/slice';

export default function FileUpload() {
    const userdata = useSelector((state) => state);
    const dispatch = useDispatch();
    const [file, setFile] = useState(null);
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
useEffect(() => {
    dispatch(fetchUsersApi());
}, []);
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
            <h2>User API DATA</h2>
            <div>
                {userdata && userdata?.userApiData?.map((u) => (
                    <p key={u._id} style={{marginBottom:"10px"}}>{u.name} - {u.email} - {u.designation}</p>
                ))}
                <button>Load Users</button>
            </div>
         <div className='ds'>
                {/* {userdata && userdata?.length > 0 && ( */}
                    <div style={{border:"1px solid #eee",borderRadius:"5px",padding:"5px",marginBottom:"10px"}}>
                        <h2 className='text-lg font-bold mb-2'>Users in Redux Store:</h2>
                        <ul className='list-disc list-inside'>
                            {userdata.users?.map((u) => (
                                <li key={u.id}>{u.name} - {u.email} - {u.designation} <button onClick={()=>dispatch(removeUser(u.id))}>Remove</button></li>
                            ))}
                        </ul>
                    </div>
                {/* )} */}
            </div>

            <form style={{display:"flex",gap:"5px"}} onSubmit={handleSubmit}>
            <input style={{padding:"5px 10px",border:"1px solid #ddd",borderRadius:"5px"}} type="file" onChange={handleFileChange} />
            <button style={{padding:"5px 10px",border:"1px solid #ddd",borderRadius:"5px",backgroundColor:"blue",color:"white"}} type="submit">Submit</button>
        </form>
        </div>
    );
}