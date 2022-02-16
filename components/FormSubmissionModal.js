import { useEffect, useState } from "react";

/**
 * Form Submission Modal and redirect
 * @param {status(string), message(string), redirect(string)} props 
 */
export default function FormSubmissionModal({status, setStatus, message, setMessage, redirect}){
    // set default state
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        // if status is updated
        if (status !== 'default'){setIsOpen(true)}

        // check for success
        if (status === 'success'){
           // redirect after 2 secs
            setTimeout(()=> {
                window.location.href = redirect
            }, 2000) 
        }
        
    }, [status, redirect])

    const handleWrapperClick = async event => {
        event.preventDefault()
        if (event.target.classList.contains("modal-wrapper")){
            closeModal()
        }
    }

    const handleButtonClick = async event => {
        event.preventDefault()

        closeModal()
    }

    const closeModal = () => {
        setIsOpen(false)
        setStatus('default')
        setMessage('')
    }

    return (
        <div className={`modal-wrapper modal-wrapper-${(isOpen ? 'open' : 'closed')}`} onClick={handleWrapperClick}>
            <div className={`modal-block modal-status-${status} ${(isOpen ? 'open' : 'closed')}`}>
                {message ? <p>{message}</p> : "" }
                {status === 'error' ? <button onClick={handleButtonClick}>Close</button> : "" }
            </div>
        </div>
    )

}