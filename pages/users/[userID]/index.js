import Image from "next/image"

export default function ViewUser({user}) {
    // parse user data for easier usage
    
    const d = ( user.Profile && user.Profile.MemberSince ? new Date(Date.parse(user.Profile.MemberSince)) : false)

    // handle delete user request
    const deleteUser = async event => {
        event.preventDefault()
        // confirm the deletion
        if ( confirm('Are you sure you want to delete this user? This cannot be undone!') ) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.ID.toString()}`, {method: 'DELETE',})
            
            // check response then redirect if successful
            if (res.statusText == 'OK'){
                window.location.href = '/users'
            }
        }
    }

    // render user info, Technologies, Portfolio Records
    return (
        <div>
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
                    ?  <ul>
                        <li>Experience: {user.Profile.YearsExperience} years</li>
                        <li>Member Since: {( d ? d.toLocaleDateString("en-US") : '' )}</li>
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
                        {
                            user.PortfolioRecords.length > 0 ?
                            <li>Portfolio Records Here</li>
                            : ""
                        }
                        </ul>
                    : ""
                }
                
            <button onClick={deleteUser}>Delete User</button>
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