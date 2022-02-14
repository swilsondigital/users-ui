import Link from "next/link"
import { useEffect, useState } from "react";

export default function ListUsers() {
    const [users, setUsers] = useState(null)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch('api/users')
            .then((res) => res.json())
            .then((users) => {
                setUsers(users)
                setLoading(false)
            })
    },[])

    if (isLoading) return <p>Loading...</p>
    if (!users) return <p>No Users</p>

    // Render list of users and link to create new user
    return (
        <div>
            <Link href="/users/create">Create New User</Link>
            <div>
                <ul>
                    {users.map((user) => {
                        return <li key={user.ID}><Link href={`/users/${user.ID.toString()}`}>{`${user.FirstName} ${user.LastName}`}</Link></li>
                    })}
                </ul>
            </div> 
        </div>
    );
}
