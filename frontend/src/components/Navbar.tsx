import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthMenu from "./AuthMenu";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const navigate = useNavigate();
  function handleSubmit(event) {
    event.preventDefault();
    const encodedQuery = encodeURIComponent(query);
    navigate(`/search?q=${encodedQuery}`);
  }
  return (
    <nav className="navbar">
      {!isSearchActive ? (
        <div className="navbar__normal">
          <Link
            to="/"
            className="navbar__home link"
          >
            Home
          </Link>
          <form
            onSubmit={handleSubmit}
            className="navbar__search"
          >
            <input
              type="search"
              name="searchBox"
              id=""
              onChange={(e) => setQuery(e.target.value)}
              className="navbar__search-input"
            />
            <button
              type="submit"
              className="navbar__search-submit  button"
            >Search</button>
          </form>
          <button
            type="button"
            className="navbar__search-trigger button"
            onClick={() => setIsSearchActive(true)}
          >
            Search
          </button>

          <AuthMenu />
        </div>
      ) : (
        <>
          <form
            onSubmit={handleSubmit}
            className="navbar__active-search"
          >
            <input
              type="search"
              name="searchBox"
              id=""
              onChange={(e) => setQuery(e.target.value)}
              className="navbar__search-input"
            />

            <button
              type="submit"
              className="navbar__search-submit button"
            >Search</button>
          </form>
          <button
            type="button"
            className="navbar__search-close button"
            onClick={() => setIsSearchActive(false)}
          >
            Close
          </button>
        </>
      )}
    </nav>
  );
}
