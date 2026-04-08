import Link from "next/link";
import API_BASE_URL from "../utils/config";
import { DeleteUser } from "../utils/DeleteUser";
// import { userList } from "../utils/userData";
async function fetchUsers() {
    try {
        const response = await fetch(`${API_BASE_URL.TOMCAT_URL}/users`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
}

export default async function UsersPage() {
    const users = await fetchUsers();
    console.log("users in users page", users);
    return (
        <div className="main">
            <Link href="/adduser" className='link my-2'>Create User</Link> 
            <h1 style={{margin:"20px 0"}}>Users</h1>
            <ul>
                {users.result.map(user => (
                    <li key={user._id} style={{marginBottom:"20px"}}>
                        <Link href={`/users/${user._id}`} style={{fontWeight:"bold"}}>
                            {user.name}
                        </Link>
                        <Link href={`/adduser/${user._id}`} className="link my-2" style={{marginLeft:"10px"}}>
                            Edit
                        </Link>
                        <DeleteUser userId={user._id} />
                       
                    </li>
                ))}
            </ul>
        </div>
    );
}