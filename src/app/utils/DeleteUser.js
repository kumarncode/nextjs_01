'use client';
export function DeleteUser({ userId }) {
  //console.log("Deleting user with ID:", userId);
  const deleteHandle = async () => {
    try {
        const response = await fetch(`/api/users/${userId}`, {
            method: "DELETE"
        });
        const res = await response.json();
        if (!res.success) {
            throw new Error('Network response was not ok');
        }
        alert(res.result);
    } catch (error) {
        console.error('Error deleting user:', error);
    }
  };

  return(<>
  <button onClick={deleteHandle} className="primary-btn inp">Delete User</button>
  </>);
}