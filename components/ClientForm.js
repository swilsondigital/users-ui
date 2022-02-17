import "react-phone-number-input/style.css"
import Input from "react-phone-number-input/input"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import FormSubmissionModal from "./FormSubmissionModal"

export default function ClientForm(props){
    const cancelLink = ( props.client ? `/clients/${props.client.ID}` : `/clients/` ),
        address = (props.client && props.client.Address !== null ? props.client.Address : false ),
        contact = (props.client && props.client.Contact !== null ? props.client.Contact : false )

    // setup defaults for state
    let defaultLogo = "",
        defaultContactPhone = "",
        defaultIsPrivate = false

    if ( props.client ) {
        defaultLogo = ( props.client.Logo !== null ? props.client.Logo.Blob : "" )
        defaultIsPrivate = props.client.Private

        if ( props.client.Contact !== null ){
            defaultContactPhone = ( contact.Phone !== "" ? contact.Phone : "" )
        }
    }

    // set state options and setters
    const [clientPhoneValue, setClientPhoneValue] = useState(props.client.Phone),
        [contactPhoneValue, setContactPhoneValue] = useState(defaultContactPhone),
        [imageValue, setImageValue] = useState(defaultLogo),
        [isPrivate, setIsPrivate] = useState(defaultIsPrivate),
        [modalStatus, setModalStatus] = useState('default'),
        [modalMessage, setModalMessage] = useState('')

    const handleModal = (status, message) => {
        setModalStatus(status)
        setModalMessage(message)
    }

    const updateIsPrivate = () => {
        setIsPrivate(!isPrivate)
    }

    // check if array values are empty strings (with exceptions)
    const jsonArrayEmptyCheck = (arr) => {
        return arr.every((current, index) => {
            if (index == 5 && current == 'United States') {
                return true
            }
            return current == ''
        })
    }
    
    const handleRequest = async event => {
        event.preventDefault()
        let req = event.target,
            contactData = {
                FirstName: req.ContactFirstName.value,
                LastName: req.ContactLastName.value,
                PreferredName: req.ContactPreferredName.value,
                Email: req.ContactEmail.value,
                Phone: contactPhoneValue,
            },
            addressData = {
                Address_1: req.Address_1.value,
                Address_2: req.Address_2.value,
                City: req.City.value,
                State_Province: req.State_Province.value,
                Postal_Code: req.Postal_Code.value,
                Country: req.Country.value,
            },
            contactArr = Object.values(contactData),
            addressArr = Object.values(addressData)

        let reqBody = JSON.stringify({
            Name: req.Name.value,
            Phone: clientPhoneValue,
            Private: isPrivate,
            Address: (jsonArrayEmptyCheck(addressArr) ? {} : addressData ),
            Contact: (jsonArrayEmptyCheck(contactArr) ? {} : contactData ),
            Logo: imageValue
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
            handleModal("success", "Client updated successfully. Redirecting...")
        } else {
            console.log(res)
            handleModal("error", "Something went wrong. Please check the logs and try again.")
        }
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
    const handleClientPhoneChange = (updatedValue) => { setClientPhoneValue(updatedValue)},
         handleContactPhoneChange = (updatedValue) => { setContactPhoneValue(updatedValue)}
    

    // render form
    return (
        <div>
            <FormSubmissionModal status={modalStatus} setStatus={setModalStatus} message={modalMessage} setMessage={setModalMessage} redirect={cancelLink}></FormSubmissionModal>
        <form onSubmit={handleRequest} encType="multipart/form-data">
            <div className="form-group">
                <label className="form-label" htmlFor="Name">Client Name:</label>
                <input type="text" className="form-control" name="Name" defaultValue={props.client.Name} placeholder="Enter Client Name" required />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="Phone">Phone Number:</label>
                <Input 
                    country="US"
                    placeholder="Enter phone number"
                    value={clientPhoneValue}
                    onChange={handleClientPhoneChange}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label className="form-check-label">
                    <input type="checkbox" className="form-check-input" name="Private" defaultChecked={isPrivate} onChange={updateIsPrivate} />
                    Client Is Private
                </label>
            </div>
            <div className="row">
                <p>Client Address</p>
                <div className="form-group">
                    <label className="form-label" htmlFor="Address_1">Address:</label>
                    <input type="text" className="form-control" name="Address_1" defaultValue={address.Address_1} placeholder="1234 Main Street" />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="Address_2">Address 2:</label>
                    <input type="text" className="form-control" name="Address_2" defaultValue={address.Address_2} placeholder="Suite 123" />
                </div>
                <div className="form-group col-md-6">
                    <label className="form-label" htmlFor="City">City:</label>
                    <input type="text" className="form-control" name="City" defaultValue={address.City} placeholder="Irvine" />
                </div>
                <div className="form-group col-md-4">
                    <label className="form-label" htmlFor="State_Province">State/Province:</label>
                    <input type="text" className="form-control" name="State_Province" defaultValue={address.State_Province} placeholder="CA" />
                </div>
                <div className="form-group col-md-2">
                    <label className="form-label" htmlFor="Postal_Code">Zip/Postal Code:</label>
                    <input type="text" className="form-control" name="Postal_Code" defaultValue={address.Postal_Code} placeholder="12345" />
                </div>
                <input type="hidden" value="United States" name="Country" />
            </div>
            <div className="row">
                <p>Client Contact</p>
                <div className="form-group col-md-4">
                    <label className="form-label" htmlFor="ContactFirstName">First Name:</label>
                    <input type="text" className="form-control" name="ContactFirstName" defaultValue={contact.FirstName} placeholder="John" />
                </div>
                <div className="form-group col-md-4">
                    <label className="form-label" htmlFor="ContactLastName">Last Name:</label>
                    <input type="text" className="form-control" name="ContactLastName" defaultValue={contact.LastName} placeholder="Doe" />
                </div>
                <div className="form-group col-md-4">
                    <label className="form-label" htmlFor="ContactPreferredName">Goes By:</label>
                    <input type="text" className="form-control" name="ContactPreferredName" defaultValue={contact.PreferredName} placeholder="Preferred Name" />
                </div>
                <div className="form-group col-md-6">
                    <label className="form-label" htmlFor="ContactEmail">Email:</label>
                    <input type="email" className="form-control" name="ContactEmail" defaultValue={contact.Email} placeholder="johndoe@example.com" />
                </div>
                <div className="form-group col-md-6">
                    <label className="form-label" htmlFor="ContactPhone">Phone:</label>
                    <Input 
                        country="US"
                        placeholder="Enter phone number"
                        value={contactPhoneValue}
                        onChange={handleContactPhoneChange}
                        className="form-control"
                    />
                </div>
            </div>

            <div className="form-group">
                { imageValue != "" && <div className="preview-image"><Image src={imageValue} className="preview" width={200} height={200} layout="responsive" alt={`${props.client} logo`} /></div> }
                <label className="form-label" htmlFor="Logo">Logo:</label>
                <input type="file" className="form-control" name="Logo" onChange={readFile}/>
            </div>

            <button className="bg-black text-white p-3">Submit</button>
            <Link href={cancelLink}>Cancel</Link>
        </form>
        </div>
    )
}