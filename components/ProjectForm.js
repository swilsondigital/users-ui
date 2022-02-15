import Link from "next/link"
import { useState } from "react"
import TechnologyInput from "./TechnologyInput"

export default function ProjectForm(props){
    const cancelLink = ( props.project ? `/clients/${props.client.ID}/projects/${props.project.ID}` : `/clients/${props.client.ID}` )

    let defaultProjectTech = [],
        defaultIsPrivate = false
    if (props.project) {
        defaultProjectTech = (props.project.Technologies != [] ? props.project.Technologies.map(t => { return {id: t.ID.toString(), text: t.Name}}) : [])
        defaultIsPrivate = props.project.Private
    }

    // set state options and setters
    const [technologies, setTechnologies] = useState(defaultProjectTech)
    const [isPrivate, setIsPrivate] = useState(defaultIsPrivate);

    const updateIsPrivate = () => {
        setIsPrivate(!isPrivate)
    }

    const handleRequest = async event => {
        event.preventDefault()
        let req = event.target,
            tech = technologies.map((t) => {return t.text})
            
        let reqBody = JSON.stringify({
            Name: req.Name.value,
            Start_Date: req.Start_Date.value,
            Delivery_Date: req.Delivery_Date.value,
            Technologies: tech,
            ClientID: props.client.ID
        });
        const res = await fetch(props.url, {
            body: reqBody,
            headers: {
                'Content-Type': 'application/json'
            },
            method: props.method,
        })

        const result = await res.json()
        // log result
        console.log(result)
    }

    const formatDate = (datestring) => {
        if (datestring !== "") {
            let d = new Date(Date.parse(datestring))
            return `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}-${('0' + (d.getDate())).slice(-2)}`
        }
    } 

    return (
        <form onSubmit={handleRequest}>
            <div>Client: {props.client.Name}</div>
            <div className="form-group">
                <label className="form-label" htmlFor="Name">Project Name:</label>
                <input type="text" className="form-control" name="Name" defaultValue={props.project.Name} placeholder="Enter Project Name" />
            </div>
            <div className="form-group">
                <label className="form-check-label">
                    <input type="checkbox" className="form-check-input" name="Private" defaultChecked={isPrivate} onChange={updateIsPrivate} />
                    Project Is Private
                </label>
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="Start_Date">Start Date:</label>
                <input type="date" className="form-control" name="Start_Date" defaultValue={formatDate(props.project.Start_Date)} placeholder="Project Start Date" />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="Delivery_Date">Delivery Date:</label>
                <input type="date" className="form-control" name="Delivery_Date" defaultValue={formatDate(props.project.Delivery_Date)} placeholder="Project Delivery Date" />
            </div>

            <div className="form-group">
                <label className="form-label" htmlFor="techUsed">Project Technologies:</label>
                <TechnologyInput tags={technologies} setTags={setTechnologies}></TechnologyInput>
            </div>

            <button className="bg-black text-white p-3">Submit</button>
            <Link href={cancelLink}>Cancel</Link>
        </form>
    )
}