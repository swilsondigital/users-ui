import ClientForm from "../../components/ClientForm";

export default function CreateClient(){
    // render client creation form
    return (
        <div><ClientForm client={false} url={`${process.env.NEXT_PUBLIC_API_URL}/clients`} method="POST"></ClientForm></div>
    );
}
