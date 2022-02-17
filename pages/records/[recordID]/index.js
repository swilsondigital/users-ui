export default function ViewPortfolioRecord({record}){
    
    return (
        <div></div>
    )

}

export async function getServerSideProps(context){
    // get record from api
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/records/${context.params.recordID}`)
    const record = await res.json()

    return { props: {record} }
}
