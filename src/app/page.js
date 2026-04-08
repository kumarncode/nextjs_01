import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import FileUpload from "./component/FileUpload";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <FileUpload />
       <Link href="/users" style={{fontWeight:"bold", fontSize:"20px"}}>View Users</Link>
       <Link href="/adduser" style={{fontWeight:"bold", fontSize:"20px", marginLeft:"20px"}}>Add User</Link>
       <h1 style={{marginTop:"20px"}}>Welcome to the User Management System</h1>
       <p>This is a simple application to manage users. You can view the list of users or add new users using the links above.</p>
      </main>
    </div>
  );
}
