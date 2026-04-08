import API_BASE_URL from "@/app/utils/config";
import Link from "next/link";
import AddUserPage from "../page";

async function getUser(userid) {
    try {
        const response = await fetch(`${API_BASE_URL.TOMCAT_URL}/users/${userid}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user:', error);
        return [];
    }
}
export default async function UserPage({ params }) {
    const { userid } = await params;
    const user = await getUser(userid);
    return (
        <div className="main">
            <AddUserPage user={user} />
        </div>
    );
}