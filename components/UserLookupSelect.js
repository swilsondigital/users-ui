import { useState, useEffect } from "react";
import Select from "react-select";

export default function UserLookupSelect({selected, setSelected, role}){
    const [suggestions, setSuggestions] = useState([]),
        [defaultSelected, setDefaultSelected] = useState("")

    useEffect(() => {
        const getEngineers = async () => {
            // make request
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/`),
                json = await res.json()
                // parse data
                const users = json.map(u => {return {value: u.ID.toString(), label: `${u.FirstName} ${u.LastName}`} })
                // set suggestion list
                setSuggestions(users)
                // check if engineer already selected
                if (selected !== "") {
                    const selectedUser = users.filter(u => u.value === selected) 
                    if (selectedUser){
                        setDefaultSelected(selectedUser)
                    }
                }

        }
        getEngineers()
    }, [selected, role])

    const handleSelectChange = selectedOption => {
        setSelected(selectedOption.value)
    }

    return (<div>
        <Select id="engineer-select" value={defaultSelected} instanceId="engineer-select" options={suggestions} onChange={handleSelectChange}></Select>
    </div>)
}