import React from "react";
import { useState } from "react";

const SearchBar = ({ setIsLoading }) => {
  const [term, setTerm] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  const query = new URLSearchParams({
    term
  })

  console.log()

  return (
    <form
      className="search"
      id="search"
      onSubmit={async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
          const results = await fetch ( `/api/search?${query.toString()}`,{
            method: "GET",
            headers:{
              "Content-Type": "application/json",
            }
          });
          setSearchResults(results);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }}
    >
      <fieldset>
        <label htmlFor="keywords">Find your sound: </label>
        <input
          className="searchbar"
          id="keywords"
          type="text"
          placeholder="Search KamJam"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </fieldset>
      <button className="search-button">SEARCH</button>
    </form>
  );
};

export default SearchBar;
