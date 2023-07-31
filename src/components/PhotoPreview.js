import "./PhotoPreview.css"
import CONSTANTS from "../constants"
import { GrClose } from "react-icons/gr";
import { FiArrowLeft } from "react-icons/fi"
import { FiArrowRight } from "react-icons/fi"
import { useEffect, useState } from "react";

const PhotoPreview = ({photoUrl, handlePhotoPreview, categoryPhotos}) => {
    const [index, setIndex] = useState(0)
    
    const findIndexOfClickedPhoto = categoryPhotos.findIndex(photo => {
        if (photo.fullpath === photoUrl) {
            return true
        }
        return false
    })

    useEffect(() => {
        setIndex(findIndexOfClickedPhoto)
    }, [findIndexOfClickedPhoto])

    useEffect(() => {   
        const handleKeyDown = (e) => {
            if (e.code === "ArrowLeft") {
                changePicBackwards()
            } else if (e.code === "ArrowRight") {
                changePicForwards()
            }
        }

        console.log("event runs")

        document.addEventListener("keydown", handleKeyDown)
        return () => document.removeEventListener("keydown", handleKeyDown)
    })

    const changePicForwards = () => {
        let i = index
        if (i === categoryPhotos.length - 1) {
            i = 0
        } else {
            i++
        }

        setIndex(i)
    }

    const changePicBackwards = () => {
        let i = index
        if (i === 0) {
            i = categoryPhotos.length - 1
        } else {
            i--
        }

        setIndex(i)
    }

    console.log("najdeny index " + findIndexOfClickedPhoto)
    return (
        <div className="photo">
            <img src={CONSTANTS.FULL_IMAGES_URL + categoryPhotos[index].fullpath} alt="" />
            <GrClose className="close-photo-icon" onClick={handlePhotoPreview} />
            <div className="arrows">
                <FiArrowLeft className="arrow-left-icon arrow" onClick={changePicBackwards} />
                <FiArrowRight className="arrow-right-icon arrow" onClick={changePicForwards} />
            </div>
        </div>
    )
}

export default PhotoPreview