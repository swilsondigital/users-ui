import UserForm from "../../components/UserForm";

export default function CreateUser() {
    // render create user form
    return (
        <main className="main">
            <UserForm url={`${process.env.NEXT_PUBLIC_API_URL}/users/`} user={false} method="POST"></UserForm>
        </main>
    )
}
