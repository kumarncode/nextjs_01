'use client';
import { useState } from 'react';
import API_BASE_URL from '../utils/config';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/slice';

export default function AddUserPage({ user }) {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        ...(user && { _id: user?._id || '' }),
        name: user?.name || '',
        email: user?.email || '',
        designation: user?.designation || '',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
//console.log("user in add user page", user);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        dispatch(addUser(formData)); // Update Redux store immediately
      // console.log("formData", formData);
        try {
            const url = user ? `${API_BASE_URL.TOMCAT_URL}/users/${formData._id}` : `${API_BASE_URL.TOMCAT_URL}/users`;
            const response = await fetch(url, {
                method: user ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
        const res = await response.json();
        if(user){
           if (res.success) {
                setMessage("Updated user successfully");
                setFormData({ name: '', email: '', designation: '' });
            } else {
                setMessage('Failed to update user');
            }
        }else{
          if (response.ok) {
                setMessage(res.message || 'User added successfully');
                setFormData({ name: '', email: '', designation: '' });
            } else {
                setMessage('Failed to add user');
            }
        }
           
        } catch (error) {
            setMessage('Error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="main p-6 max-w-md mx-auto">
            <Link href="/users" className='link my-2'>Back to Users</Link>    
            &nbsp; | &nbsp;
            <Link href="/" className='link my-2'>Back to Home</Link>    
            <h1 style={{margin:"20px 0px"}}>Add User</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="inp"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="inp"
                />
                <input
                    type="text"
                    name="designation"
                    placeholder="Designation"
                    value={formData.designation}
                    onChange={handleChange}
                    required
                    className="inp"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="primary-btn inp"
                >
                    {user && loading ? 'Updating...' : user ? 'Update User' : 'Add User'}
                </button>
            </form>
            {message && <p className="mt-4 text-center text-sm">{message}</p>}

           
        </div>
    );
}