import Image from "next/image";
import Link from "next/link";
import DeleteModelButton from "../../../components/DeleteModelButton";

export default function ViewClient({client}) {

    const projects = client.Projects

    const renderAddress = (addr) => {
        return <p style={{whiteSpace: 'pre-line', lineHeight: '1rem'}}>{`
            ${addr.Address_1}${"\n"}
            ${(addr.Address_2 ? addr.Address_2 + "\n" : "" )}
            ${addr.City}, ${addr.State_Province} ${addr.Postal_Code}${"\n"}
            ${addr.Country}
            `}</p> 
    }

    const renderContact = (contact) => {
        return <ul>
                 <li>Name: {contact.FirstName} {contact.LastName}</li>
                { contact.PreferredName && <li>Goes By: {contact.PreferredName}</li> }
                <li>Email: {contact.Email}</li>
                <li>Phone Number: {contact.Phone}</li>
        </ul>
    }

    const projectTech = (tech) => {
        let list = tech.map(t => {
            return t.Name
        })
        return list.join(", ")
    }

    const projectEngineers = (engineers) => {
        let list = engineers.map(e => {
            return `${e.User.FirstName} ${e.User.LastName}`
        })
        return list.join(", ")
    }

    const formatDate = (datestring) => {
        if (datestring !== null) {
            let d = new Date(Date.parse(datestring))
            return d.toLocaleDateString("en-US")
        }
    } 


    // render client info, contacts, projects with first few technologies & engineers images
    return (
        <div>
            <Link href="/clients/">Back To Client List</Link>
            <h2>{client.Name}</h2>
            {
                (client.Logo !== undefined && client.Logo !== null) &&
                <div className="preview-image"><Image src={client.Logo.Blob} className="profile-image" width={200} height={200} layout="responsive" alt={`${client.Name} logo`} /></div>
            }
            <ul>
                { client.Phone && <li>Phone: {client.Phone}</li>}
                {
                    (client.Address !== undefined && client.Address !== null) &&
                    <li>Address:{renderAddress(client.Address)}</li>
                }
                {
                    (client.Contact !== undefined && client.Contact !== null) &&
                    <li>Contact:{renderContact(client.Contact)}</li>
                }
            </ul>
            {
                client.Projects !== [] &&
                <table>
                    <thead>
                        <tr>
                            <th>Project ID</th>
                            <th>Name</th>
                            <th>Engineers</th>
                            <th>Technologies Used</th>
                            <th>Started</th>
                            <th>Delivered</th>
                        </tr>
                    </thead>
                    <tbody>
                        { projects.map((p) => { 
                            return <tr key={p.ID}>
                                    <td>{p.ID}</td>
                                    <td><Link href={`/clients/${client.ID}/projects/${p.ID}`}>{( p.Name ? p.Name : "(unnamed)")}</Link></td>
                                    <td>{projectEngineers(p.PortfolioRecords)}</td>
                                    <td>{projectTech(p.Technologies)}</td>
                                    <td>{formatDate(p.Start_Date)}</td>
                                    <td>{formatDate(p.Delivery_Date)}</td>
                                    <td><Link href={`/clients/${client.ID}/projects/${p.ID}/edit`}>Edit</Link></td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            }
            <Link href={`/clients/${client.ID}/projects/create`}>Create New Project</Link>

            <DeleteModelButton modelID={client.ID} model="client" redirect="/clients/">Delete Client</DeleteModelButton>
            <button onClick={() => {window.location.href = `/clients/${client.ID.toString()}/edit`}}>Edit Client</button>
        </div>
    );
}

export async function getServerSideProps(context){
    // get client from api
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients/${context.params.clientID}`)
    const client = await res.json()

    return { props: {client} }
}
