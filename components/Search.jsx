import Link from "next/link";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const CustomSearch = ({ searchOptions }) => {
  const [input, setInput] = useState("");

  return (
    <>
      <FaSearch />
      <input
        type="text"
        value={input}
        onInput={(e) => setInput(e.target.value)}
      />

      <ul>
        {searchOptions
          .filter(({ id }) => {
            return (
              id.toLowerCase().search(input.toLowerCase()) !== -1 &&
              input.length > 0
            );
          })
          .map(({ title, id }) => (
            <li>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default CustomSearch;
