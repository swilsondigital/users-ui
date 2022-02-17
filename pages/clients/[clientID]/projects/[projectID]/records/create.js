import PortfolioRecordForm from "../../../../../../components/PortfolioRecordForm";

export default function CreateProjectPortfolioRecord({project}) {
    // render project portfolio record form
    return (<div><PortfolioRecordForm record={false} project={project} url={`${process.env.NEXT_PUBLIC_API_URL}/records/`} method="POST"></PortfolioRecordForm></div>);
}

export async function getServerSideProps(context){
    // get project from api
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${context.params.projectID}`)
    const project = await res.json()

    return { props: {project} }
}