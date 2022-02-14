export default function CreateClientProject({client}) {
    // render project creation form
    return (<div>Client Project Creation Form</div>);
}

export async function getStaticPaths(){
    // get dynamic routes from api
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients`)
    const clients = await res.json()

    const paths = clients.map((client) => ({
        params: { id: client.ID.toString() }
    }))

    return {paths, fallback: false }
}

export async function getStaticProps({ params }){
    // get client from api
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients/${params.id}`)
    const client = await res.json()

    return { props: {client} }
}