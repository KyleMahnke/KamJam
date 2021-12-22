import React from "react";
import { useState } from "react";
import { useHistory } from "react-router";

const SearchBar = ({ setIsLoading }) => {
  const [term, setTerm] = useState("");
  const history = useHistory();

  const query = new URLSearchParams({
    term,
  });

  return (
    <form
      className="search"
      id="search"
      onSubmit={async (event) => {
        event.preventDefault();
        history.push(`/search?${query.toString()}`);
      }}
    >
      <fieldset>
        <label className="search-label search-components search" htmlFor="keywords">
          Find your groove:{" "}
        </label>
        <input
          className="searchbar search-components search"
          id="keywords"
          type="text"
          placeholder="Search KamJam"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </fieldset>
      <button
        className="utility-links search-components search"
        onClick={() => {
          history.push(`/search?term=${term}`);
        }}
      >
        SEARCH
      </button>
    </form>
  );
};

export default SearchBar;
