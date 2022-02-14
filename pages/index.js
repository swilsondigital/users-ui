import Link from "next/link";

export default function Home() {
  return (
   <div>
     <p><Link href="/users">View Users</Link></p>
     <p><Link href="/clients">View Clients</Link></p>
   </div>
  )
}
