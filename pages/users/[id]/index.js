function Bio({user}) {
    // parse user data for easier usage
    const skills = JSON.parse(user.skills)
    const d = new Date(Date.parse(user.since))

    // handle delete user request
    const deleteUser = async event => {
        event.preventDefault()
        // confirm the deletion
        if ( confirm('Are you sure you want to delete all users? This cannot be undone!') ) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.ID.toString()}`, {method: 'DELETE',})
            
            // check response then redirect if successful
            if (res.statusText == 'OK'){
                window.location.href = '/users'
            }
        }
    }

    return (
        <div>
            <ul>
                <li>Name: {user.fname} {user.lname}</li>
                { user.pname && <li>Goes By: {user.pname}</li> }
                <li>Email: {user.email}</li>
                <li>Experience: {user.experience} years</li>
                <li>Member Since: {d.toLocaleDateString("en-US")}</li>
                <li>Current Skill Set:
                    <ul>
                        {skills.map((value, i) => {
                            return <li key={i}>{value}</li>
                        })}
                    </ul>
                </li>
            </ul>
            <button onClick={deleteUser}>Delete User</button>
        </div>
    )
}

export async function getStaticPaths(){
    // get dynamic routes from api
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`)
    const users = await res.json()

    const paths = users.map((user) => ({
        params: { id: user.ID.toString() }
    }))

    return {paths, fallback: false }
}

export async function getStaticProps({ params }){
    // get user from api
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${params.id}`)
    const user = await res.json()

    return { props: {user} }
}

export default Bio