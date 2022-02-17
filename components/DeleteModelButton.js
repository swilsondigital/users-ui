export default function DeleteModelButton(props){
    // handle delete user request
    const deleteModel = async event => {
        event.preventDefault()
        // confirm the deletion
        if ( confirm(`Are you sure you want to delete this ${props.model}? This cannot be undone!`) ) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${props.model}s/${props.modelID}`, {method: 'DELETE',})
            
            // check response then redirect if successful
            if (res.statusText == 'OK'){
                window.location.href = props.redirect
            }
        }
    }

    return (
        <button onClick={deleteModel}>{props.children}</button>
    )
}