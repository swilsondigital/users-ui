function Users({users}){

    // handle deletion method
    const deleteAllUsers = async event => {
        event.preventDefault()
        // confirm the deletion
        if ( confirm('Are you sure you want to delete all users? This cannot be undone!') ) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/`, {method: 'DELETE',})
            
            // check response then redirect if successful
            if (res.statusText == 'OK'){
                window.location.href = '/users'
            }
        }
    }

    return (
        <div>
            <a href="/users/create">Create New User</a>
            { users.length > 0
                ? <div>
                    <ul>
                        {users.map((user) => {
                            return <li key={user.ID}><a href={ `/users/` + user.ID}>{user.fname} {user.lname}</a></li>
                        })}
                    </ul>
                    <button onClick={deleteAllUsers}>Delete Users</button>
                </div>
                : <p>No Users</p>
        }
        </div>
    )
}

export async function getStaticProps(){
    // get all users from api
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`)
    const users = await res.json()

    return { props: {users} }
}

export default Users