import { useState, useEffect } from "react";
import { WithContext as ReactTags } from 'react-tag-input';

export default function TechnologyInput({tags, setTags}) {
    const [suggestions, setSuggestions] = useState([])

    useEffect(() => {
        const getTech = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/technology/`),
                json = await res.json()

                const tech = json.map(t => { return {id: t.ID.toString(), text: t.Name}})
                setSuggestions(tech)
        }
        getTech()
    }, [])

    const KeyCodes = {
        comma: 188,
        enter: 13
      };
      
    const delimiters = [KeyCodes.comma, KeyCodes.enter];

    const handleDelete = i => {
        setTags(tags.filter((tag, index) => index !== i));
    };

    const handleAddition = tag => {
        setTags([...tags, tag]);
    };

    return (
        <ReactTags
          tags={tags}
          suggestions={suggestions}
          delimiters={delimiters}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          allowDragDrop={false}
          inputFieldPosition="bottom"
          autocomplete
        />
    )
}