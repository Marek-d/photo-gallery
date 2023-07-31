import "./AddCategory.css"
import { GrClose } from "react-icons/gr";
import { useState } from "react";
import CONSTANTS from "../constants";

const AddCategory = ({handleAddCategory}) => {
    const [categoryName, setCategoryName] = useState("")
    const [error, setError] = useState(null)
    
    const createNewCategory = (e) => {
        e.preventDefault()
        fetch(CONSTANTS.URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'name': categoryName})
        }).then((response) => {
            if (!response.ok) {
                if (response.status === 409)
                    throw Error("Gallery with this name already exists!")
                else if (response.status === 400)
                    throw Error("Invalid request. The request doesn't conform to the schema.")
                else
                    throw Error("Unknow error.")
            }
            return response.json()
        }).then((data) => {
            console.log("data" + data)
            handleAddCategory()
        }).catch((error) => {
            setError(error.message)
        })
    }
    
    return (
        <div className="add-category-container">
            <div className="add-category-heading">
                <h3>Pridať kategóriu</h3>
                <GrClose className="close-icon" onClick={handleAddCategory} />
            </div>
            { error && <p className="error-message">{error}</p> }
            <span>Názov kategórie *</span>
            <form>
                <input
                    className="input-text"
                    type="text"
                    value={categoryName}
                    autoFocus={true}
                    onChange={(e) => {setCategoryName(e.target.value)}}
                />
                <input type="submit" value="Pridať" onClick={createNewCategory} />
            </form>
        </div>
    )
}

export default AddCategory