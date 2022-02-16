import TechnologyInput from "./TechnologyInput"
import "react-phone-number-input/style.css"
import Input from "react-phone-number-input/input"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import FormSubmissionModal from "./FormSubmissionModal"

// props = user, url, method
export default function UserForm(props){
    // set profile, date info and formats
    const profile = props.user.Profile,
        defaultDate = ( profile && profile.MemberSince != undefined ? Date.parse(profile.MemberSince) : Date.now() ),
        d = new Date(defaultDate),
        formattedDate = `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}-${('0' + (d.getDate())).slice(-2)}`,
        cancelLink = ( props.user ? `/users/${props.user.ID}` : '/users/' )
    
    // setup defaults for state
    let defaultProfileImage = "",
        defaultUserTech = [];

    if (profile !== undefined ){
        defaultProfileImage = ( profile.ProfilePhoto !== null ? profile.ProfilePhoto.Blob : "" )
        defaultUserTech = ( profile.Technologies !== [] ? profile.Technologies.map(t => { return {id: t.ID.toString(), text: t.Name}}) : [] )
    }

    // set state options and setters
    const [phoneValue, setPhoneValue] = useState(props.user.Phone),
        [imageValue, setImageValue] = useState(defaultProfileImage),
        [technologies, setTechnologies] = useState(defaultUserTech),
        [modalStatus, setModalStatus] = useState('default'),
        [modalMessage, setModalMessage] = useState('')

    const handleModal = (status, message) => {
        setModalStatus(status)
        setModalMessage(message)
    }

    // read file uploads for preview
    const readFile = (event) => {
        if (event.target.files && event.target.files[0]) {
            var FR = new FileReader();
            FR.addEventListener("load", function(e) {
                console.log(e.target.result)
                setImageValue(e.target.result)
            }); 
            FR.readAsDataURL( event.target.files[0] );
        }
    }

    // read phone changes
    const handlePhoneOnChange = (updatedValue) => {
        setPhoneValue(updatedValue)
    }

    // setup request handler
    const handleUserRequest = async event => {
        event.preventDefault()
        let req = event.target,
            tech = technologies.map((t) => {return t.text})

        let reqBody = JSON.stringify({
            FirstName: req.FirstName.value,
            LastName: req.LastName.value,
            PreferredName: req.PreferredName.value,
            Email: req.Email.value,
            Phone: phoneValue,
            YearsExperience: Number(req.YearsExperience.value),
            MemberSince: req.MemberSince.value,
            ProfilePhoto: imageValue,
            Technologies: tech
        });

        // set modal status to submitting
        handleModal("submitting", "Submitting, please wait...")

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
            handleModal("success", "Project updated successfully. Redirecting...")
        } else {
            console.log(res)
            handleModal("error", "Something went wrong. Please check the logs and try again.")
        }
    }

    return (
        <form onSubmit={handleUserRequest} encType="multipart/form-data">
            
            <div className="form-group">
                <label className="form-label" htmlFor="FirstName">First Name:</label>
                <input type="text" className="form-control" name="FirstName" defaultValue={props.user.FirstName} placeholder="Enter First Name" />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="LastName">Last Name:</label>
                <input type="text" className="form-control" name="LastName" defaultValue={props.user.LastName} placeholder="Enter Last Name"/>
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="PreferredName">Preferred Name:</label>
                <input type="text" className="form-control" name="PreferredName" defaultValue={props.user.PreferredName} placeholder="Enter Optional Preferred Name" />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="Email">Email Address:</label>
                <input type="email" className="form-control" name="Email" defaultValue={props.user.Email} placeholder="Enter Valid Email Address" />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="Phone">Phone Number:</label>
                <Input 
                    country="US"
                    placeholder="Enter phone number"
                    value={phoneValue}
                    onChange={handlePhoneOnChange}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="YearsExperience">Years Experience:</label>
                <input type="number" className="form-control" name="YearsExperience" min="0" max="100" defaultValue={(profile && profile.YearsExperience ? profile.YearsExperience : "" )} placeholder="Enter Number of Years Experience" />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="MemberSince">Member Since:</label>
                <input type="date" className="form-control" name="MemberSince" defaultValue={formattedDate} placeholder="Date of Employment" />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="skills">Skillset:</label>
                <TechnologyInput tags={technologies} setTags={setTechnologies}></TechnologyInput>
            </div>
            <div className="form-group">
                { imageValue != "" && <div className="preview-image"><Image src={imageValue} className="preview" width={200} height={200} layout="responsive" alt={props.user.FirstName +` `+ props.user.LastName +` profile photo`} /></div> }
                <label className="form-label" htmlFor="ProfilePhoto">Profile Photo:</label>
                <input type="file" className="form-control" name="ProfilePhoto" onChange={readFile}/>
            </div>

            <button className="bg-black text-white p-3">Submit</button>
            <Link href={cancelLink}>Cancel</Link>
        </form>
    )
}