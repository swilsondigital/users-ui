import Link from "next/link"
import DeleteModelButton from "../../../components/DeleteModelButton"

export default function ViewPortfolioRecord({record}){

    const clientURL = `/clients/${record.Project.Client.ID.toString()}`,
        projectURL = `${clientURL}/projects/${record.Project.ID}`,
        userURL = `/users/${record.User.ID}`
    
    return (
        <div>
            <Link href={projectURL}>Back to Project</Link>
            <h2>Project Record</h2>
            <ul>
                <li>Project: <Link href={projectURL}>{record.Project.Name}</Link></li>
                <li>Client: <Link href={clientURL}>{record.Project.Client.Name}</Link></li>
                <li>User: <Link href={userURL}>{`${record.User.FirstName} ${record.User.LastName}`}</Link></li>
                <li>Summary: {record.Summary}</li>
                { record.Technologies !== null &&
                    <li>Technologies Used: 
                        <ul>
                        {record.Technologies.map((tech) => {
                            return <li key={tech.ID}>{tech.Name}</li>
                        })}
                        </ul>
                    </li>
                }
            </ul>
            <DeleteModelButton modelID={record.ID} model="record" redirect={`/clients/${record.Project.Client.ID.toString()}/projects/${record.Project.ID.toString()}`}>Delete Record</DeleteModelButton>
            <button onClick={() => {window.location.href = `/records/${record.ID.toString()}/edit`}}>Edit Record</button>
        </div>
    )

}

export async function getServerSideProps(context){
    // get record from api
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/records/${context.params.recordID}`)
    const record = await res.json()

    return { props: {record} }
}
