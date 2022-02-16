import ProjectForm from "../../../../../components/ProjectForm";

export default function EditClientProject({project}) {
    // render project Edit form
    return (<div><ProjectForm client={project.Client} project={project} url={`${process.env.NEXT_PUBLIC_API_URL}/projects/${project.ID}`} method="PUT"></ProjectForm></div>);
}

export async function getServerSideProps(context){
    // get project from api
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${context.params.projectID}`)
    const project = await res.json()

    return { props: {project} }
}