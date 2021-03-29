
import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import './Footer.css';

const Footer = (props) => {
  return (
  <div className="footer">
    <Container>
      <Row xs="2">
        <Col>
          <p>Simple Step Solutions © {new Date().getFullYear()}</p>
        </Col>
        <Col>Column</Col>
      </Row>
    </Container>
  </div>
  )
}

export default Footer
