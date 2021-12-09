import React from "react";
import { useState } from "react";

export default function SearchBar() {
  const [queryString, setQueryString] = useState("");

  return (
    <form
    // id="search"
    // onSubmit={async (event) => {
    //     event.preventDefault();
    //     setIsLoading(true);
    //     try {
    //         const results = await fetchQueryResults({
    //         });
    //         setSearchResults(results);
    //     } catch (error) {
    //         console.error(error);
    //     } finally {
    //         setIsLoading(false)
    //     }
    // }}>
    >
      <fieldset>
        <label htmlFor="keywords">Find your sound:</label>
        <input
          id="keywords"
          type="text"
          placeholder="Search KamJam"
          value={queryString}
          onChange={(e) => setQueryString(e.target.value)}
        />
      </fieldset>
      <button>SEARCH</button>
    </form>
  );
}
