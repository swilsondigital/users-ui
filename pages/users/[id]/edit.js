import UserForm from "../../../components/UserForm"

function EditUser({user}){
    return (
        <UserForm url={`${process.env.NEXT_PUBLIC_API_URL}/users/${user.ID.toString()}`} user={user} method="PUT"></UserForm>
    )
}

export async function getStaticPaths(){
    // get dynamic routes from api
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/`)
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

export default EditUser