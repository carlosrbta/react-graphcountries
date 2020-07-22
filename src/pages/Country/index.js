import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useHistory } from "react-router-dom";
import { Button, Row, Col, Typography } from "antd";
import Loading from "../../components/Loading";
import NoResults from "../../components/NoResults";
import "./styles.scss";

const { Title, Text } = Typography;

export const COUNTRY = gql`
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
  const history = useHistory();
  const { name } = match.params;

  const { loading, data } = useQuery(COUNTRY, {
    variables: { name },
  });

  const country = data ? data.Country[0] : {};
  const emptyData = data && data.Country.length === 0;

  if (loading) return <Loading />;

  if (emptyData) {
    return (
      <div className="page-country">
        <NoResults backlink="/" name={name} />
      </div>
    );
  }

  return (
    <div className="page-country">
      <Row gutter={16} className="details-country">
        <Col flex="207px">
          <img src={country.flag.svgFile} alt={country.name} />
        </Col>

        <Col xs={24} sm={12} md={8} lg={6} xl={4}>
          <Title level={4}>{country.name}</Title>
          <Text strong>
            Capital: <Text>{country.capital}</Text>
          </Text>
          <Text strong>
            Area: <Text>{country.area}</Text>
          </Text>
          <Text strong>
            Population: <Text>{country.population}</Text>
          </Text>
          <Text strong>
            Top-level Domain:{" "}
            {country.topLevelDomains.map((lv) => (
              <Text key={lv.name}>{lv.name}</Text>
            ))}
          </Text>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={12} md={8} lg={6} xl={4} className="footer-btn">
          <Button onClick={() => history.push(`/${country.name}/edit`)}>
            Edit
          </Button>
          <Button onClick={() => history.push("/")}>Back</Button>
        </Col>
      </Row>
    </div>
  );
};

export default Country;
