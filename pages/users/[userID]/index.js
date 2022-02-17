import Image from "next/image"
import Link from "next/link"
import DeleteModelButton from "../../../components/DeleteModelButton"

export default function ViewUser({user}) {
    // parse user data for easier usage
    
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

    // render user info, Technologies, Portfolio Records
    return (
        <div>
            <Link href="/users/">Back to User List</Link>
            <ul>
                { (user.Profile != undefined && user.Profile.ProfilePhoto !== null ) && 
                    <li><Image src={user.Profile.ProfilePhoto.Blob} className="profile-image" width={200} height={200} layout="responsive" alt={user.FirstName +` `+ user.LastName +` profile photo`} /></li>
                }
                <li>Name: {user.FirstName} {user.LastName}</li>
                { user.PreferredName && <li>Goes By: {user.PreferredName}</li> }
                <li>Email: {user.Email}</li>
                <li>Phone Number: {user.Phone}</li>
            </ul>
           
                {user.Profile != undefined
                    ?  <div>
                        <ul>
                        <li>Experience: {user.Profile.YearsExperience} years</li>
                        <li>Member Since: {(user.Profile.MemberSince ? formatDate(user.Profile.MemberSince) : "" )}</li>
                            { user.Profile.Technologies.length > 0 ?
                                    <li>Current Skill Set: 
                                        <ul>
                                        {user.Profile.Technologies.map((tech) => {
                                            return <li key={tech.ID}>{tech.Name}</li>
                                        })}
                                        </ul>
                                    </li>
                                    
                                : ""
                            }
                        </ul>
                        { user.PortfolioRecords &&
                            <table>
                                <thead>
                                    <tr>
                                        <th>Client</th>
                                        <th>Project</th>
                                        <th>Exerpt</th>
                                        <th>Technologies Used</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {user.PortfolioRecords.map((r) => {
                                       return <tr key={r.ID}>
                                            <td><Link href={`/clients/${r.Project.Client.ID}`}>{r.Project.Client.Name}</Link></td>
                                            <td><Link href={`/clients/${r.Project.Client.ID}/projects/${r.Project.ID}`}>{( r.Project.Name ? r.Project.Name : "(unnamed)" )}</Link></td>
                                            <td>{makeExcerpt(r.Summary, 30)}</td>
                                            <td>{(r.Technologies !== undefined && r.Technologies !== null ) && techToString(r.Technologies)}</td>
                                            <td><Link href={`/records/${r.ID}`}>View</Link></td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        }
                    </div>
                    : ""
                }
            <DeleteModelButton modelID={user.ID} model="user" redirect="/users/">Delete User</DeleteModelButton>
            <button onClick={() => {window.location.href = `/users/${user.ID.toString()}/edit`}}>Edit User</button>
        </div>
    )
}

export async function getServerSideProps(context){
    // get user from api
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${context.params.userID}`)
    const user = await res.json()

    return { props: {user} }
}