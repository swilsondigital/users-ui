function Users({users}){
    return (
        <ul>
            {users.map((user) => {
                return <li key={user.ID}><a href={ `/users/` + user.ID}>{user.fname} {user.lname}</a></li>
            })}
        </ul>
    )
}

export async function getStaticProps(){
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`)
    const users = await res.json()

    return { props: {users} }
}

export default Users