import Link from "next/link"
import DeleteModelButton from "../../../../../components/DeleteModelButton"

export default function ViewProject({project}) {

    const techToString = (tech) => {
        let list = tech.map(t => {
            return t.Name
        })
        return list.join(", ")
    }

    const formatDate = (datestring) => {
        if (datestring !== null) {
            let d = new Date(Date.parse(datestring))
            return d.toLocaleDateString("en-US")
        }
    } 

    const makeExcerpt = (summary, charCount) => {
        if (summary.length > charCount) {
            summary = `${summary.substring(0, charCount)}...`
        }
        return summary
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
                <li>Technologies Used: {(project.Technologies !== undefined && project.Technologies !== null ) && techToString(project.Technologies)}</li>
            </ul>
            { project.PortfolioRecords &&
                    <table>
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Exerpt</th>
                                <th>Technologies Used</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {project.PortfolioRecords.map((r) => {
                               return <tr key={r.ID}>
                                    <td>{`${r.User.FirstName} ${r.User.LastName}`}</td>
                                    <td>{makeExcerpt(r.Summary, 30)}</td>
                                    <td>{(r.Technologies !== undefined && r.Technologies !== null ) && techToString(r.Technologies)}</td>
                                    <td><Link href={`/records/${r.ID}`}>View</Link></td>
                                </tr>
                            })}
                        </tbody>
                    </table>
            }
            <Link href={`/clients/${project.Client.ID.toString()}/projects/${project.ID.toString()}/records/create`}>Create New Record</Link>
            <DeleteModelButton modelID={project.ID} model="project" redirect={`/clients/${project.Client.ID.toString()}`}>Delete Project</DeleteModelButton>
            <button onClick={() => {window.location.href = `/clients/${project.Client.ID.toString()}/projects/${project.ID.toString()}/edit`}}>Edit Project</button>
        </div>
    )
}

export async function getServerSideProps(context){
    // get project from api
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${context.params.projectID}`)
    const project = await res.json()

    return { props: {project} }
}