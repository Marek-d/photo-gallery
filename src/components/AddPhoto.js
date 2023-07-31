import "./AddPhoto.css"
import { GrClose } from "react-icons/gr";
import { BsImage } from "react-icons/bs";
import { useRef, useState } from "react";
import CONSTANTS from "../constants";

const AddPhoto = ({handleAddPhoto}) => {
    const [dragActive, setDragActive] = useState(false)
    const [uploadedFiles, setUploadedFiles] = useState([])
    const [error, setError] = useState(null)
    const inputRef = useRef(null)

    const handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()
        // console.log(e.type)
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        console.log(e.dataTransfer.files)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setUploadedFiles([...uploadedFiles, ...e.dataTransfer.files])
        }
    }

    const handleChange = (e) => {
        e.preventDefault()
        if (e.target.files && e.target.files[0]) {
            setUploadedFiles([...uploadedFiles, ...e.target.files])
        }
    }

    const handleUploadButtonClick = () => {
        inputRef.current.click()
    }

    const handleAddFilesButtonClick = (e) => {
        e.preventDefault()
        for (const file of uploadedFiles) {
            const formData = new FormData()
            formData.append("image", file)
            formData.append("filename", file.name)

            console.log(CONSTANTS.URL + "/" + localStorage.getItem("categoryPath"))
            fetch(CONSTANTS.URL + "/" + localStorage.getItem("categoryPath"), {
                method: "POST",
                body: formData
            }).then(response => {
                if (!response.ok) {
                    if (response.status === 400)
                        throw Error("Invalid request - file not found.")
                    else if (response.status === 404)
                        throw Error("Gallery not found.")
                    else 
                        throw Error("Unknown error.")
                }

                return response.json()
            }).then(data => {
                console.log("uploaded data ", data)
                handleAddPhoto()
            }).catch(error => {
                setError(error.message)
                console.log(error)
            })
        }
    }
    
    return (
        <div className="add-photo-container">
            <div className="add-photo-heading">
                <h3>Pridať fotky</h3>
                <GrClose className="close-icon" onClick={handleAddPhoto} />
            </div>
            { error && <p className="error-message">{error}</p> }
            <div
                className={`choose-file ${dragActive ? "drag-active" : ""}`}
                onDragEnter={handleDrag}
            >
                <form className="form-file-upload" onSubmit={e => e.preventDefault()}>
                    <input 
                        id="input-file-upload"
                        type="file" 
                        multiple={true}
                        accept="image/*"
                        onChange={handleChange}
                        ref={inputRef}
                    />
                    <label 
                        id="label-file-upload"
                        htmlFor="input-file-upload"
                    >
                        <div>
                            <BsImage className="photo-icon" />
                            <p className="bold">Sem presuňte fotky</p>
                            <p className="gray">alebo</p>
                            <button className="upload-button" onClick={handleUploadButtonClick}>Vyberte súbory</button>
                        </div>
                    </label>
                    {dragActive && <div
                        id="drag-file-element"
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    ></div>}
                </form>
            </div>
            {uploadedFiles.length > 0 && <ul className="file-list">
                {uploadedFiles.map(file => <div>
                    <li>{file.name}</li>
                    <span className="gray">{(file.size/1000000).toFixed(2)} MB</span>
                </div>)}
            </ul>}
            <button className="add-file-btn" onClick={handleAddFilesButtonClick}>Pridať</button>
        </div>
    )
}

export default AddPhoto