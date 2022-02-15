import ClientForm from "../../../components/ClientForm";

export default function EditClient({client}) {
    // render client form
    return (<div><ClientForm client={client} url={`${process.env.NEXT_PUBLIC_API_URL}/clients/${client.ID}`} method="PUT"></ClientForm></div>);
}

export async function getStaticPaths(){
    // get dynamic routes from api
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients`)
    const clients = await res.json()

    const paths = clients.map((client) => ({
        params: { clientID: client.ID.toString() }
    }))

    return {paths, fallback: false }
}

export async function getStaticProps({ params }){
    // get client from api
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients/${params.clientID}`)
    const client = await res.json()

    return { props: {client} }
}
