import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useHistory } from "react-router-dom";
import { Button, Row, Col, Typography, Form, Input } from "antd";
import Loading from "../../components/Loading";
import NoResults from "../../components/NoResults";
import "./styles.scss";

const { Title } = Typography;

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
  const history = useHistory();
  const { name } = match.params;

  const { loading, data, updateQuery } = useQuery(COUNTRY, {
    variables: { name },
  });

  const country = data
    ? data.Country[0]
    : { flag: {}, topLevelDomains: [], distanceToOtherCountries: [] };

  const onFinish = async (values) => {
    const { area, capital, population, topLevelDomains } = values;

    await updateQuery((prevData) => {
      return {
        Country: [
          {
            ...prevData.Country[0],
            area,
            capital,
            population,
            topLevelDomains: Array.isArray(topLevelDomains)
              ? topLevelDomains
              : topLevelDomains.split(","),
          },
        ],
      };
    });

    setTimeout(() => {
      history.push(`/${country.name}`);
    }, 400);
  };

  // useEffect(() => {}, [data]);

  if (loading) return <Loading />;

  if (data && data.Country.length === 0) {
    return (
      <div class="page-country">
        <NoResults backlink="/" name={name} />
      </div>
    );
  }

  const initialValues = {
    capital: country.capital,
    area: country.area,
    population: country.population,
    topLevelDomains: country.topLevelDomains.map((t) => t.name),
  };

  return (
    <div className="page-edit-country">
      <Row gutter={16} className="details-country">
        <Col flex="207px">
          <img src={country.flag.svgFile} alt={country.name} />
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Title level={4}>{country.name}</Title>

          <Form
            name="basic"
            layout="vertical"
            initialValues={initialValues}
            onFinish={onFinish}
            wrapperCol={{ sm: { span: 24 }, md: { span: 12 }, lg: { span: 6 } }}
          >
            <Form.Item
              label="Capital"
              name="capital"
              rules={[{ required: true, message: "Capital is required!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Area"
              name="area"
              rules={[{ required: true, message: "Area is required!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Population"
              name="population"
              rules={[{ required: true, message: "Population is required!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Top-level Domain (comma split)"
              name="topLevelDomains"
              rules={[
                { required: true, message: "Top-level Domain is required!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item className="form-footer">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>

              <Button onClick={() => history.push(`/${country.name}`)}>
                Back
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Country;
