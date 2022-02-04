import UserForm from "../../components/UserForm";

function UserCreate(){
    return (
        <main className="main">
            <UserForm url={`${process.env.NEXT_PUBLIC_API_URL}/users/`} user={false} method="POST"></UserForm>
        </main>
    )
}

export default UserCreate