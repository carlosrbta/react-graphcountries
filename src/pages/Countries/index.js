import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useHistory } from "react-router-dom";
import { Card, Col, Row, Input } from "antd";
import "./styles.scss";

const { Meta } = Card;

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
  const history = useHistory();

  const { loading, data } = useQuery(COUNTRIES, {
    variables: { name: name || undefined },
  });

  const onClickItem = (name) => {
    history.push(name);
  };

  const list = (data && data.Country) || [];

  return (
    <div className="page-countries">
      <Row gutter={16} className="row-search">
        <Col xs={24} sm={12} md={8} lg={6} xl={4}>
          <Input
            size="large"
            placeholder="Search country..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Col>
      </Row>
      {loading ? (
        <Row gutter={16}>
          <Col key={name} xs={24} sm={12} md={8} lg={6} xl={4}>
            <Card loading={loading}>
              <Meta title="Card title" description="This is the description" />
            </Card>
          </Col>
        </Row>
      ) : (
        <Row gutter={16} className="row-list">
          <>
            {list.map(({ flag, name, capital }) => (
              <Col key={name} xs={24} sm={12} md={8} lg={6} xl={4}>
                <Card
                  loading={loading}
                  hoverable
                  onClick={() => onClickItem(name)}
                  cover={<img src={flag.svgFile} alt={name} />}
                >
                  <Meta title={name} description={capital} />
                </Card>
              </Col>
            ))}
            {list.length === 0 && (
              <Col>
                No results found for <b>{name}</b>.
              </Col>
            )}
          </>
        </Row>
      )}
    </div>
  );
};

export default Countries;
