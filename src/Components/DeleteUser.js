import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

function DeleteUser() {
    const [idToDelete, setIdToDelete] = useState('');

    const handleDeleteUser = async () => {
        try {
            await axios.delete(`/api/deleteUser/${idToDelete}`);
            alert('User deleted successfully');
        } catch (error) {
            console.error('Error deleting user', error);
            alert('Error deleting user');
        }
    };

    return (
        <>
            <Navbar />
            <h4>Delete User</h4>
            <div className="container" style={{ margin: '20px 10%' }}>
                <div>
                    <input
                        type="text"
                        value={idToDelete}
                        onChange={(e) => setIdToDelete(e.target.value)}
                        placeholder="Enter User ID to delete"
                    />
                    <button onClick={handleDeleteUser}>Delete User</button>
                </div>
            </div>
        </>
    );
}

export default DeleteUser;
