import "./Navbar.css";
import { ChangeEvent, useState } from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router";
import SearchIcon from '@mui/icons-material/Search';
import BookmarksIcon from '@mui/icons-material/Bookmarks';

export default function Navbar() {
    const [query, setQuery] = useState<string>("");

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const navigate = useNavigate();

    const handleSearchClick = () => {
        if (query.trim() !== "") {
            navigate(`/project2/search?query=${query}`);
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && query.trim() !== "") {
            navigate(`/project2/search?query=${query}`);
        }
    };

    const handleLogoClick = () => {
        navigate("/project2/");
    }

    return (
        <nav className="navbar-container">
            <img onClick={handleLogoClick} className="logo" src={logo} alt="logo" />
            <div className="search-bar">
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={handleInputChange}
                    onKeyUp={handleKeyPress}

                />
                <button className="navbar-button" onClick={handleSearchClick}>
                    <SearchIcon />
                    <span className="navbar-button-label">Search</span>
                </button>
            </div>
            <button className="navbar-button">
                <BookmarksIcon />
                <span className="navbar-button-label">Readlist</span>
            </button>
        </nav >
    );
}
