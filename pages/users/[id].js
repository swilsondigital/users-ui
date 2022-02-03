function Bio({user}) {
    const skills = JSON.parse(user.skills)
    const d = new Date(Date.parse(user.since))
    return (
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
    )
}

export async function getStaticPaths(){

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`)
    const users = await res.json()

    const paths = users.map((user) => ({
        params: { id: user.ID.toString() }
    }))

    return {paths, fallback: false }
}

export async function getStaticProps({ params }){
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${params.id}`)
    const user = await res.json()

    return { props: {user} }
}

export default Bio