import React from "react";
import { Button, Row, Col } from "antd";
import { useHistory } from "react-router-dom";

const NoResults = ({ backlink, name }) => {
  const history = useHistory();
  return (
    <Row gutter={16} className="row-list">
      <Col>
        No results found for <b>{name}</b>.
        {backlink && (
          <Button type="link" onClick={() => history.push(backlink)}>
            Go Back.
          </Button>
        )}
      </Col>
    </Row>
  );
};
export default NoResults;
