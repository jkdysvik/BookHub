
import "./Navbar.css";
import { ChangeEvent, useState } from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router";

export default function Navbar() {
    const [query, setQuery] = useState<string>("");

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const Navigate = useNavigate();

    const handleSearch = (query: string) => {
        Navigate("/book/" + query);
    };

    const handleSearchClick = () => {
        if (query.trim() !== "") {
            handleSearch(query);
        }
    };



    return (
        <nav className="navbar-container">
            <img className="logo" src={logo} alt="logo" />
            <button className="navbar-button">Categories</button>
            <button className="navbar-button">Readlist</button>
            <div className="search-bar">
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={handleInputChange}
                />
                <button className="navbar-button" onClick={handleSearchClick}>Search</button>
            </div >
        </nav>
    );
}
