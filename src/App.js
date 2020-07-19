import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import "./App.css";

const COUNTRIES = gql`
  query {
    Country {
      name
      nativeName
      capital
      flag {
        emoji
        emojiUnicode
        svgFile
      }
    }
  }
`;

const App = () => {
  const { loading, error, data } = useQuery(COUNTRIES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const renderList = (list) => (
    <ul>
      {list.map(({ flag, name, capital }) => (
        <li>
          <img src={flag.svgFile} />
          {name} - {capital}
        </li>
      ))}
    </ul>
  );
  return renderList(data.Country);
};

export default App;
