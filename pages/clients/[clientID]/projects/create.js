import ProjectForm from "../../../../components/ProjectForm";

export default function CreateClientProject({client}) {
    // render project creation form
    return (<div><ProjectForm client={client} project={false} url={`${process.env.NEXT_PUBLIC_API_URL}/projects/`} method="POST"></ProjectForm></div>);
}

export async function getServerSideProps(context){
    // get client from api
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients/${context.params.clientID}`)
    const client = await res.json()

    return { props: {client} }
}
