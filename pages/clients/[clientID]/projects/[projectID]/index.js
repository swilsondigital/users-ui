import Link from "next/link"

export default function ViewProject({project}) {

    const projectTech = (tech) => {
        let list = tech.map(t => {
            return t.Name
        })
        return list.join(", ")
    }

    const formatDate = (datestring) => {
        if (datestring !== "") {
            let d = new Date(Date.parse(datestring))
            return d.toLocaleDateString("en-US")
        }
    } 

    // render project info
    return (
        <div>
            <Link href={`/clients/${project.Client.ID}`}>Back To Client</Link>
            <ul>
                <li>Project Name: {project.Name} { project.Private ? <span>(Private)</span> : "" }</li>
                <li>Client: {project.Client.Name}</li>
                <li>Started: {formatDate(project.Start_Date)}</li>
                <li>Delivered: {formatDate(project.Delivery_Date)}</li>
                <li>Technologies Used: {(project.Technologies !== undefined && project.Technologies !== null ) && projectTech(project.Technologies)}</li>
                <li>Portfolio Records Here</li>
            </ul>
            <Link href={`/clients/${project.Client.ID}/projects/${project.ID}/edit`}>Edit Project</Link>
        </div>
    )
}

export async function getServerSideProps(context){
    // get project from api
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${context.params.projectID}`)
    const project = await res.json()

    return { props: {project} }
}