function UserCreate(){
    const createUser = async event => {
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

        console.log(reqBody)

        const res = await fetch('https://fierce-taiga-67843.herokuapp.com/users/', {
            body: reqBody,
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
        })

        const result = await res.json()
        console.log(result)
    }
    return (
        <main className="main">
            <form onSubmit={createUser}>
                
                <div>
                    <label htmlFor="fname">First Name:</label>
                    <input type="text" name="fname"/>
                </div>
                <div>
                    <label htmlFor="lname">Last Name:</label>
                    <input type="text" name="lname"/>
                </div>
                <div>
                    <label htmlFor="pname">Preferred Name:</label>
                    <input type="text" name="pname"/>
                </div>
                <div>
                    <label htmlFor="email">Email Address:</label>
                    <input type="email" name="email"/>
                </div>
                <div>
                    <label htmlFor="experience">Years Experience:</label>
                    <input type="number" name="experience" min="0" max="100"/>
                </div>
                <div>
                    <label htmlFor="since">Member Since:</label>
                    <input type="date" name="since"/>
                </div>
                <div>
                    <label htmlFor="skills">Skillset:</label>
                    <textarea name="skills"></textarea>
                    <small className="block">Separate skills with commas</small>
                </div>

                <button className="bg-black text-white p-3">Submit</button>
            </form>
        </main>
    )
}

export default UserCreate