import UserForm from "../../../components/UserForm"

export default function EditUser({user}) {
    // render edit user form
    return (
        <UserForm url={`${process.env.NEXT_PUBLIC_API_URL}/users/${user.ID.toString()}`} user={user} method="PUT"></UserForm>
    )
}

export async function getServerSideProps(context){
    // get user from api
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${context.params.userID}`)
    const user = await res.json()

    return { props: {user} }
}