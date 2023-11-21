import "./Navbar.scss";
import { ChangeEvent, useState } from "react";
import logo from "../assets/logo.png";
import logosmall from "../assets/logo-small.png";
import { useNavigate } from "react-router";
import SearchIcon from '@mui/icons-material/Search';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import ClearIcon from '@mui/icons-material/Clear';
import { useSearch } from "../hooks/searchContext";

export default function Navbar() {
    const [query, setQuery] = useState<string>("");
    const { searchQuery, setSearchQuery } = useSearch();

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const navigate = useNavigate();

    const handleSearchClick = async () => {
        if (query.trim() !== "") {
        setSearchQuery(query);
        }
      };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && query.trim() !== "") {
        setSearchQuery(query);
    }
    };


    const handleLogoClick = () => {
        navigate("/project2/");
    }

    const handleRemoveSearch = () => {
        setQuery('');
        setSearchQuery('');
    }

    return (
        <nav className="navbar-container">
            <img onClick={handleLogoClick} className="logo" src={logo} alt="logo" />
            <img onClick={handleLogoClick} className="logo-small" src={logosmall} alt="logo" />
            <div className="search-bar">
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={handleInputChange}
                    onKeyUp={handleKeyPress}

                />
                {searchQuery ? (
                <button className="navbar-button" onClick={handleRemoveSearch} style={{ marginLeft: 0 }}>
                    <ClearIcon />
                </button>
            ) : null}
                <button className="navbar-button" onClick={handleSearchClick}>
                    <SearchIcon />
                    <span className="navbar-button-label">Search</span>
                </button>
            </div>
            <button className="navbar-button">
                <BookmarksIcon />
                <span className="navbar-button-label">Readlist</span>
            </button>
        </nav>
    );
}
