
import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { ReactComponent as Logo } from '../../../assets/logo.svg'
import './Footer.css';

const Footer = (props) => {
  return (
  <div className="footer">
    <Container>
      <Row xs="2">
        <Col>
          <p><Logo style={{height: '50px', width: '50px'}}/>&nbsp;<a href="https://simplestep.ca">Simple Step Solutions</a> © {new Date().getFullYear()}</p>
        </Col>
        <Col>Column</Col>
      </Row>
    </Container>
  </div>
  )
}

export default Footer
