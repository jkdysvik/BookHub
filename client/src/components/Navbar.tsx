
import "./Navbar.css";
import { ChangeEvent, useState } from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router";
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
            <button className="navbar-button">Categories</button>
            <button className="navbar-button">Readlist</button>
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
                    <button className="navbar-button" onClick={handleRemoveSearch}> remove search</button>
                ) : null}
                <button className="navbar-button" onClick={handleSearchClick}>Search</button>   
            </div >
        </nav>
    );
}
