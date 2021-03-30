import { Container, Row, Col } from 'reactstrap';
import { ReactComponent as Logo } from '../../../assets/logo.svg'
import intellij from '../../../assets/intellij.png'
import stephen from '../../../assets/stephen-larger.jpeg'
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons' 


const Footer = (props) => {

  const twitter = <FontAwesomeIcon icon={faTwitter} />
  const linkedIn = <FontAwesomeIcon icon={faLinkedin} />
  const github = <FontAwesomeIcon icon={faGithub} />

  return (
  <div className="footer">
    <Container>
      <Row lg="2">
        <Col>
          <h3>About</h3>
          <p>I ❤ using <a href="https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-external-config-relaxed-binding-from-environment-variables">environment variable support</a> to override and set Spring Boot configuration. I got tired of creating them by hand, so I made this.</p> 
          <p>Why use environment variables?</p>
          <ul>
            <li>
              avoid code changes
            </li>
            <li>
              prevent accidental commits of unwanted configuration
            </li>
            <li>
              leverage their <i>higher priority</i> over application <a alt="Spring Boot Reference Documentation" href="https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-external-config">config data</a>
            </li>
            <li>ease of use
              <ul>
                <li>
                  <p>IntelliJ and other IDEs. (e.g. paste into IntelliJ run configuration)</p>
                </li>
              </ul>
              <img width="400px" alt="IntelliJ Run Configuration using Environment Variables" src={intellij}/>              
              <ul>
                <li>
                  <p>Terminal</p>
                  <p><div className="code">FOO=bar mvn spring-boot:run</div></p>
                </li>
                <li>
                  <p>Kubernetes manifests, etc.</p>
                </li>
              </ul>
            </li>
          </ul>
        </Col>        
        <Col>
        <p>Suggestions? Bugs? {github} <a alt="Github Repository" href="https://github.com/sdoxsee/env-gen">Pull Requests</a> are welcome :)</p>
          <p><img width="400px" alt="Created by Stephen Doxsee" src={stephen}/></p>
          <p>
          Created by Stephen Doxsee
            <div className="footer-icons">
              <p>
              <a href="https://twitter.com/doxsees">{twitter}</a>
              <a href="https://www.linkedin.com/in/sdoxsee">{linkedIn}</a>
              <a href="https://sdoxsee.github.com"><Logo style={{height: '20px', width: '20px'}}/></a>
              </p>
            </div>
          </p>
          <h3>Disclaimer</h3>
          <p>No guarantees about the accuracy of the results. Google Analytics may track traffic but no other data is stored. Use at your own risk.</p>
        </Col>
      </Row>
    </Container>
    <br/>
    <p className="copyright"><Logo style={{height: '50px', width: '50px'}}/>&nbsp;<a alt="Simple Step Solutions" href="https://simplestep.ca">Simple Step Solutions</a> © {new Date().getFullYear()}</p>
    <br/>
  </div>
  )
}

export default Footer
