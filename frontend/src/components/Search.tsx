import { useState, type ChangeEvent } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  return (
    <div className="searchBar">
    <input
      value={query}
      onChange={handleChange}
      />
    <p>You are searching for: {query}</p>
      </div>
  );
}
