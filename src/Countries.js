import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import debounce from "lodash.debounce";
import { Link } from "react-router-dom";
import "./App.css";

const COUNTRIES = gql`
  query($name: String) {
    Country(name: $name) {
      name
      capital
      flag {
        svgFile
      }
    }
  }
`;

const Countries = () => {
  const [name, setName] = useState("");

  const { loading, error, data } = useQuery(COUNTRIES, {
    variables: { name: name || undefined },
  });

  const setSearchName = debounce((searchTerm) => {
    setName(searchTerm);
  }, 1000);

  const renderList = (list) => (
    <ul>
      {list.map(({ flag, name, capital }) => (
        <li key={name}>
          <img src={flag.svgFile} />
          {name} - {capital} - <Link to={name}>Details</Link>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {loading && <p>Loading...</p>}
      {error && <p>Error :</p>}
      {data && renderList(data.Country)}
    </>
  );
};

export default Countries;
