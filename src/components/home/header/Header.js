import React from 'react';
import { Container, Row, Col, Jumbotron } from 'reactstrap';
import './Header.css'

const Header = (props) => {
  return (
    <div className="header border-bottom">
      <Container> 
        {/* <Jumbotron> */}
          <h2>Environment Variable Generator</h2>
          <p>for Spring Boot apps</p>
          {/* <br/> */}
        {/* </Jumbotron> */}
      </Container>
    </div>
  )
}

export default Header
