import "./Category.css"
import { FiArrowLeft } from "react-icons/fi"
import { VscDiffAdded } from "react-icons/vsc";
import { useEffect, useState } from "react"
import CONSTANTS from "../constants"
import { Link } from "react-router-dom";
import AddPhoto from "../components/AddPhoto";
import PhotoPreview from "../components/PhotoPreview";

const Category = () => {
    const [categoryPhotos, setCategoryPhotos] = useState([])
    const [showAddPhoto, setShowAddPhoto] = useState(false)
    const [showPhotoPreview, setShowPhotoPreview] = useState(false)

    const getCategoryPhotos = async () => {
        const response = await fetch(CONSTANTS.URL + "/" + localStorage.getItem("categoryPath"))
        const data = await response.json()
        console.log(data)

        setCategoryPhotos(data.images)
    }

    useEffect(() => {
        getCategoryPhotos()
    }, [showAddPhoto])

    useEffect(() => {
        const  handleEscapeKey = (e) => {
            if (e.code === 'Escape') {
                handleOverlay()
            }
        }
        
        document.addEventListener("keydown", handleEscapeKey)
        return () => document.removeEventListener("keydown", handleEscapeKey)
    })

    const handleAddPhoto = () => {
        setShowAddPhoto(!showAddPhoto)
    }

    const handlePhotoPreview = (photoPath) => {
        setShowPhotoPreview(!showPhotoPreview)
        localStorage.setItem("fullPhotoPath", photoPath)
        console.log(photoPath)
    }

    const handleOverlay = () => {
        setShowAddPhoto(false)
        setShowPhotoPreview(false)
    }

    // console.log(showPhotoPreview)
    return (
        <div className="gallery">
            <h2>Fotogaléria</h2>
            <Link to="/" className="go-back">
                <h5>
                    <FiArrowLeft className="arrow-left-icon" />
                    <span className="category-name">{localStorage.getItem("categoryPath")}</span>
                </h5>
            </Link>
            <span className="count-photos">Fotografie: {categoryPhotos.length}</span>
            <div className="gallery-categories">
                {
                    categoryPhotos.map((photo, index) => {
                        return (
                            <div className="one-photo" key={index} onClick={() => handlePhotoPreview(photo.fullpath)}>
                                <img src={CONSTANTS.IMAGES_URL + "/" + photo.fullpath} alt="" />
                            </div>
                        )
                    })
                }
                <div 
                    className="add-category one-photo"
                    onClick={handleAddPhoto}
                >
                    <VscDiffAdded className="add-category-icon" />
                    <p>Pridať fotky</p>
                </div>
            </div>
            {(showAddPhoto || showPhotoPreview) && <div className="overlay" onClick={handleOverlay}></div>}
            {showAddPhoto && <AddPhoto handleAddPhoto={handleAddPhoto} />}
            {showPhotoPreview && <PhotoPreview
                photoUrl={localStorage.getItem("fullPhotoPath")} 
                handlePhotoPreview={handleOverlay}
                categoryPhotos={categoryPhotos}
            />}
        </div>
    )
}

export default Category