import { useEffect, useState } from "react"
import "./Categories.css"
import "../css/responsive.css"
import noImage from "../images/no-image.png"
import { VscDiffAdded } from "react-icons/vsc";
import AddCategory from "./AddCategory";
import CONSTANTS from "../constants";
import { Link } from "react-router-dom"

const Categories = ({handleCategoryPath}) => {
    const [galleries, setGalleries] = useState([])
    const [showAddCategory, setShowAddCategory] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const getGalleries = async () => {
        const response = await fetch(CONSTANTS.URL)
        const data = await response.json()
        setGalleries(data.galleries)
        setIsLoading(false)
    }

    useEffect(() => {
        getGalleries()
        // when new category is added, showAddCategory changes state and we want to fetch data again
        // ???? always send request when modal is opened/closed ??? is it good ???
    }, [showAddCategory])

    useEffect(() => {
        // handle close modal window for adding category on ESC 
        const  handleEscapeKey = (e) => {
            if (e.code === 'Escape') {
                setShowAddCategory(false)
            }
        }
        
        document.addEventListener("keydown", handleEscapeKey)
        return () => document.removeEventListener("keydown", handleEscapeKey)
    })

    // handle close modal window for adding category
    const handleAddCategory = (e) => {
        setShowAddCategory(!showAddCategory)
    }

    return (
        <>
            <div className="gallery">
                <h2>Fotogaléria</h2>
                <h5>Kategórie</h5>
                <div className="gallery-categories">
                    { isLoading && <div>Loading...</div> }
                    {
                        galleries.map((gallery, index) => {
                            // link is equivalent to a href
                            return ( 
                                <Link 
                                    to="/gallery"
                                    key={index}
                                    className="gallery-category"
                                    onClick={() => handleCategoryPath(gallery.path)}
                                >
                                    <div className="gallery-photo">
                                        <img 
                                            src={gallery.image ? CONSTANTS.IMAGES_URL + gallery.image.fullpath : noImage}
                                            alt=""
                                        />
                                    </div>
                                    <p>{gallery.name}</p>
                                </Link>
                            )
                        })
                    }
                    <div className="gallery-category add-category" onClick={handleAddCategory}>
                        <VscDiffAdded className="add-category-icon" />
                        <p>Pridať kategóriu</p>
                    </div>
                </div>
                { showAddCategory && <div className="overlay" onClick={handleAddCategory} /> } 
                { showAddCategory && <AddCategory handleAddCategory={handleAddCategory} /> }
            </div>
            
        </>
    )
}

export default Categories