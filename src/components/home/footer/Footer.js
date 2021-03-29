
import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { ReactComponent as Logo } from '../../../assets/logo.svg'
import intellij from '../../../assets/intellij.png'
import './Footer.css';


const Footer = (props) => {
  return (
  <div className="footer">
    <Container>
      <Row md="2">
        <Col>
          <p>Find an issue? Have a suggestion? <a alt="Github Repository" href="https://github.com/sdoxsee/env-gen">Pull Requests</a> are welcome!</p>
          <p>Created by Stephen Doxsee</p>
          <p>Twitter -> @doxsees, Blogging at https://sdoxsee.github.com</p>
          
        </Col>
        <Col>
        <h3>About</h3>
        <p>Since I enjoy using <a href="https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-external-config-relaxed-binding-from-environment-variables">environment variable support</a> to override/set Spring Boot config, I got tired of creating them by hand.</p> 
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
          <li>easy of use
            <ul>
              <li>
                <p>paste into IntelliJ run configuration</p>
                <img width="400px" alt="IntelliJ Run Configuration using Environment Variables" src={intellij}/>
              </li>
              <li>
                <p>or terminal</p>
                <p><div className="code">FOO=bar mvn spring-boot:run</div></p>
              </li>
              <li>
                <p>Kubernetes manifests, etc.</p>
              </li>
            </ul>
          </li>
        </ul>
        </Col>
      </Row>
      <p className="copyright"><Logo style={{height: '50px', width: '50px'}}/>&nbsp;<a alt="Simple Step Solutions" href="https://simplestep.ca">Simple Step Solutions</a> © {new Date().getFullYear()}</p>
    </Container>
  </div>
  )
}

export default Footer
