import Link from "next/link"

export default function ListClients({clients}) {
    // Render list of clients
    return (
        
        <div>
            <Link href="/clients/create">Create New Client</Link>
            { clients.length > 0
                ? <div>
                    <ul>
                        {clients.map((client) => {
                            return <li key={client.ID}><Link href={ `/clients/` + client.ID}>{client.Name}</Link></li>
                        })}
                    </ul>
                </div>
                : <p>No Clients</p>
            }
        <Link href="/">Back To Dashboard</Link>
        </div>
    )
}

export async function getServerSideProps(context){
    // get all clients from api
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients`)
    const clients = await res.json()

    return { props: {clients} }
}