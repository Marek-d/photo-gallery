import { BrowserRouter, Route, Routes } from "react-router-dom"
import Categories from "./components/Categories"
import Category from "./pages/Category"

const App = () => {

    const handleCategoryPath = (path) => {
        localStorage.setItem("categoryPath", path)
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route 
                    path="/"
                    element={<Categories handleCategoryPath={handleCategoryPath} />} 
                />
                <Route
                    path="/gallery"
                    element={<Category />}
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App