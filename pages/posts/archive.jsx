import Link from "next/link";
import Layout from "../../components/Layout";
import { getSortedPostsData } from "../../lib/posts";
import utilStyles from "../../styles/utils.module.css";
import Date from "../../components/Date";
import { useState } from "react";
import CustomSelect from "../../components/Select";
import CustomSearch from "../../components/Search";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Archive({ allPostsData }) {
  //category label select
  const [currCategory, setCurrCategory] = useState("all");
  const [currAuthor, setCurrAuthor] = useState("all");

  const selectOptions = allPostsData.map(({ label }) => {
    return { value: label, label: label };
  });

  const labelArr = allPostsData.map((data) => data.label);
  const uniqueOptions = selectOptions.filter(
    ({ label }, index) => !labelArr.includes(label, index + 1)
  );

  uniqueOptions.unshift({ value: "all", label: "all" });

  //Author select
  const authorOptions = allPostsData.map(({ author }) => {
    return { value: author, label: author };
  });
  const authorArr = allPostsData.map((data) => data.author);
  const uniqueAuthors = authorOptions.filter(
    ({ label }, index) => !authorArr.includes(label, index + 1)
  );

  uniqueAuthors.unshift({ value: "all", label: "all" });

  //fuzzysearch
  const [searchInput, setSearchInput] = useState("");

  return (
    <Layout>
      <div className={utilStyles.container}>
        <h1>Archive</h1>
        <section style={{ minWidth: "35vw" }}>
          <CustomSearch
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            searchOptions={allPostsData}
          ></CustomSearch>
          {!searchInput && (
            <section>
              <section className={utilStyles.padBottom}>
                <label htmlFor="filter">Category: </label>
                <CustomSelect
                  setCurrCategory={setCurrCategory}
                  id="filter"
                  selectOptions={uniqueOptions}
                ></CustomSelect>
              </section>

              <section className={utilStyles.padBottom}>
                <label htmlFor="filter">Author: </label>
                <CustomSelect
                  setCurrCategory={setCurrAuthor}
                  id="filter"
                  selectOptions={uniqueAuthors}
                ></CustomSelect>
              </section>

              <ul className={utilStyles.list}>
                {allPostsData.map(({ id, date, title, label, author }) =>
                  (author === currAuthor || currAuthor === "all") &&
                  (label === currCategory || currCategory === "all") ? (
                    <li className={utilStyles.listItem} key={id}>
                      <Link href={`/posts/${id}`}>
                        <a>{title}</a>
                      </Link>
                      {label !== "unset" ? (
                        <span className={utilStyles.label}>{label}</span>
                      ) : (
                        ""
                      )}
                      {author !== "unset" ? (
                        <span className={utilStyles.author}>{author}</span>
                      ) : (
                        ""
                      )}

                      <br />
                      <small className={utilStyles.lightText}>
                        <Date date={date}></Date>
                      </small>
                    </li>
                  ) : (
                    ""
                  )
                )}
              </ul>
            </section>
          )}
        </section>
      </div>
    </Layout>
  );
}
