
import "./Navbar.css";
import { ChangeEvent, useState } from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router";

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
                <button className="navbar-button" onClick={handleSearchClick}>Search</button>
            </div >
        </nav>
    );
}
