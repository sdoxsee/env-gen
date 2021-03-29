import React from 'react';
import { Container } from 'reactstrap';
import { ReactComponent as Logo } from '../../../assets/logo.svg'
import './Header.css'

const Header = (props) => {
  return (
    <div className="header border-bottom">
      <Container> 
      {Logo} <h2>Environment Variable Generator</h2>
          <p>for Spring Boot apps</p>
      </Container>
    </div>
  )
}

export default Header
