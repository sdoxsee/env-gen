import { Container } from 'reactstrap';
import './Header.css'

const Header = (props) => {
  return (
    <div className="header border-bottom">
      <Container> 
          <h2>Environment Variable Generator</h2>
          <p className="text-muted">for Spring Boot apps</p>
      </Container>
    </div>
  )
}

export default Header
