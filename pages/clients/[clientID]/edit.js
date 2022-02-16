import ClientForm from "../../../components/ClientForm";

export default function EditClient({client}) {
    // render client form
    return (<div><ClientForm client={client} url={`${process.env.NEXT_PUBLIC_API_URL}/clients/${client.ID}`} method="PUT"></ClientForm></div>);
}

export async function getServerSideProps(context){
    // get client from api
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients/${context.params.clientID}`)
    const client = await res.json()

    return { props: {client} }
}
