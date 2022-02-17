import Link from "next/link"
import { useState } from "react"
import UserLookupSelect from "./UserLookupSelect"
import FormSubmissionModal from "./FormSubmissionModal"
import TechnologyInput from "./TechnologyInput"

export default function PortfolioRecordForm(props){
    const cancelLink = ( props.record ? `/records/${props.record.ID}` : `/clients/${props.project.Client.ID}/projects/${props.project.ID}` )

    let defaultRecordTech = [],
        defaultUserID = ""

    if (props.record) {
        defaultRecordTech = (props.record.Technologies != null ? props.record.Technologies.map(t => { return {id: t.ID.toString(), text: t.Name}}) : []),
        defaultUserID = (props.record.UserID ? props.record.UserID.toString() : "" )
    }

    // set state options and setters
    const [technologies, setTechnologies] = useState(defaultRecordTech),
        [modalStatus, setModalStatus] = useState('default'),
        [modalMessage, setModalMessage] = useState(''),
        [selectedEngineer, setSelectedEngineer] = useState(defaultUserID)

    const handleModal = (status, message) => {
        setModalStatus(status)
        setModalMessage(message)
    }

    const handleRequest = async event => {
        event.preventDefault()

        if (selectedEngineer === "" ){
            handleModal("error", "Please select an engineer")
            return false
        }

        let req = event.target,
            tech = technologies.map((t) => {return t.text})
            
        let reqBody = JSON.stringify({
            UserID: Number(selectedEngineer),
            ProjectID: props.project.ID,
            Summary: req.Summary.value,
            Technologies: tech
        });

        // set modal status to submitting
        handleModal("submitting", "Submitting, please wait...")

        // submit form
        const res = await fetch(props.url, {
            body: reqBody,
            headers: {
                'Content-Type': 'application/json'
            },
            method: props.method,
        })
        
        if (res.status === 200 ){
            const result = await res.json()
            // set modal status to success
            console.log(result)
            // handleModal("success", "Project Record updated successfully. Redirecting...")
        } else {
            const result = await res.json()
            console.log(res, result)
            handleModal("error", "Something went wrong. Please check the logs and try again.")
            return false
        }
    }

    return (
        <div>
            <FormSubmissionModal status={modalStatus} setStatus={setModalStatus} message={modalMessage} setMessage={setModalMessage} redirect={cancelLink}></FormSubmissionModal>
            <form onSubmit={handleRequest}>
                <div>Client: {props.project.Client.Name}</div>
                <div>Project: {props.project.Name}</div>
                <hr/>
                <div className="form-group">
                    <label className="form-label">Select an Engineer</label>
                    <UserLookupSelect selected={selectedEngineer} setSelected={setSelectedEngineer}></UserLookupSelect>
                </div>
                <hr/>
                <div className="form-group">
                    <label className="form-label" htmlFor="Summary">Summary:</label>
                    <textarea name="Summary" className="form-control" placeholder="Add Project Details">{props.record.Summary}</textarea>
                </div>


                <div className="form-group">
                    <label className="form-label" htmlFor="techUsed">Project Technologies:</label>
                    <TechnologyInput tags={technologies} setTags={setTechnologies}></TechnologyInput>
                </div>

                <button className="bg-black text-white p-3">Submit</button>
                <Link href={cancelLink}>Cancel</Link>
            </form>
        </div>
    )
}