export default function UserForm(props){

    // props = user, url, method

    const skillset = (props.user.skills ? JSON.parse(props.user.skills).join(',') : '')
    let defaultDate = ( props.user.since ? Date.parse(props.user.since) : Date.now() )
    const d = new Date(defaultDate),
        formattedDate = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`

    const handleUserRequest = async event => {
        event.preventDefault()
        let req = event.target,
            skills = req.skills.value.split(",")

        let reqBody = JSON.stringify({
            fname: req.fname.value,
            lname: req.lname.value,
            pname: req.pname.value,
            email: req.email.value,
            experience: Number(req.experience.value),
            since: req.since.value,
            skills: skills,
        });

        const res = await fetch(props.url, {
            body: reqBody,
            headers: {
                'Content-Type': 'application/json'
            },
            method: props.method,
        })

        const result = await res.json()
        console.log(result)
    }

    return (
        <form onSubmit={handleUserRequest}>
            
            <div>
                <label htmlFor="fname">First Name:</label>
                <input type="text" name="fname" defaultValue={props.user.fname}/>
            </div>
            <div>
                <label htmlFor="lname">Last Name:</label>
                <input type="text" name="lname" defaultValue={props.user.lname}/>
            </div>
            <div>
                <label htmlFor="pname">Preferred Name:</label>
                <input type="text" name="pname" defaultValue={props.user.pname}/>
            </div>
            <div>
                <label htmlFor="email">Email Address:</label>
                <input type="email" name="email" defaultValue={props.user.email}/>
            </div>
            <div>
                <label htmlFor="experience">Years Experience:</label>
                <input type="number" name="experience" min="0" max="100" defaultValue={props.user.experience}/>
            </div>
            <div>
                <label htmlFor="since">Member Since:</label>
                <input type="date" name="since" defaultValue={formattedDate}/>
            </div>
            <div>
                <label htmlFor="skills">Skillset:</label>
                <textarea name="skills" defaultValue={skillset}></textarea>
                <small className="block">Separate skills with commas</small>
            </div>

            <button className="bg-black text-white p-3">Submit</button>
        </form>
    )
}