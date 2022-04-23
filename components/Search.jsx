import Link from "next/link";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Fuse from "fuse.js";
import { borderRadius } from "@mui/system";

const CustomSearch = ({ searchOptions, searchInput, setSearchInput }) => {
  const options = {
    includeScore: true,
    keys: ["title", "author", "label"],
  };

  const fuse = new Fuse(searchOptions, options);

  const fuzzySearchResult = fuse.search(searchInput);

  return (
    <>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <FaSearch style={{ marginTop: "3px" }} />
        <label for="fuzzySearch">Search</label>
        <input
          style={{ border: "1px solid hsl(0deg 0% 80%)", borderRadius: "3px" }}
          name="fuzzySearch"
          type="text"
          value={searchInput}
          onInput={(e) => setSearchInput(e.target.value)}
        />
      </div>

      <ul>
        {fuzzySearchResult
          .map((fuzzyResult) => fuzzyResult.item)
          .map(({ title, id }) => (
            <li key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
            </li>
          ))}
      </ul>
      {fuzzySearchResult.length === 0 && searchInput ? (
        <p>no search results found 😓</p>
      ) : (
        ""
      )}
    </>
  );
};

export default CustomSearch;
