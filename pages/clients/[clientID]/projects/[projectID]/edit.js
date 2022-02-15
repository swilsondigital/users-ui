import ProjectForm from "../../../../../components/ProjectForm";

export default function EditClientProject({project}) {
    // render project Edit form
    return (<div><ProjectForm client={project.Client} project={project} url={`${process.env.NEXT_PUBLIC_API_URL}/projects/${project.ID}`} method="PUT"></ProjectForm></div>);
}

export async function getStaticPaths(){
    // get dynamic routes from api
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`)
    const projects = await res.json()

    const paths = projects.map((project) => ({
        params: { 
            projectID: project.ID.toString(),
            clientID: project.ClientID.toString(),
        }
    }))

    return {paths, fallback: false }
}

export async function getStaticProps({ params }){
    // get project from api
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${params.projectID}`)
    const project = await res.json()

    return { props: {project} }
}