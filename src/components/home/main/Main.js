import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Code from '../../code/Code'

const Main = (props) => {
  return (
    <Container>
      <Row>
        <Col><Code title="YAML"/></Col>
      </Row>
      <Row>
        <Col><Code title="Environment Variables"/></Col>
      </Row>
    </Container>
  );
}

export default Main;