import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useHistory } from "react-router-dom";

const COUNTRY = gql`
  query($name: String!) {
    Country(name: $name) {
      name
      capital
      area
      population
      topLevelDomains {
        name
      }
      flag {
        svgFile
      }
    }
  }
`;

const Country = ({ match, google }) => {
  let history = useHistory();
  let { name } = match.params;

  const { loading, error, data, updateQuery } = useQuery(COUNTRY, {
    variables: { name },
  });

  const country = data
    ? data.Country[0]
    : { flag: {}, topLevelDomains: [], distanceToOtherCountries: [] };

  const updateCountry = (contry) => {
    updateQuery((prevData) => {
      return {
        Country: [{ ...prevData.Country[0], name: "TEST" }],
      };
    });
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error :</p>}
      <p>
        Flag: <img src={country.flag.svgFile} />
      </p>
      <p>Name: {country.name}</p>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <p>Population: {country.population}</p>
      <p>Top-level Domain: {country.topLevelDomains.map((lv) => lv.name)}</p>

      <button onClick={updateCountry}>Update</button>
      <button onClick={() => history.goBack()}>Back</button>
    </>
  );
};

export default Country;
