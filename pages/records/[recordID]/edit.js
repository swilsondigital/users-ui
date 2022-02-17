import PortfolioRecordForm from "../../../components/PortfolioRecordForm";


export default function EditProjectPortfolioRecord({record}) {
    // render project portfolio record form
    return (<div><PortfolioRecordForm record={record} project={record.Project} url={`${process.env.NEXT_PUBLIC_API_URL}/projects/${record.ID}`} method="PUT"></PortfolioRecordForm></div>);
}

export async function getServerSideProps(context){
    // get record from api
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/records/${context.params.recordID}`)
    const record = await res.json()

    return { props: {record} }
}