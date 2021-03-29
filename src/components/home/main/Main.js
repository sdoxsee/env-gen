import { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Alert, Label, Input } from 'reactstrap';
import yaml from 'js-yaml';
import deflate from '../../../utils/deflate'
import './Main.css'

const Main = (props) => {

  const [yamlText, setYamlText] = useState('foo: bar');
  const [properties, setProperties] = useState();
  const [alertText, setAlertText] = useState('');

  const onDismiss = () => setAlertText('');

  const applyYamlText = useCallback((yamlText) => {
    try {
      setYamlText(yamlText);
      // https://github.com/jusufazer/yaml2properties/blob/master/src/scripts/processor.js
      const data = yaml.load(yamlText);
      if (typeof data !== 'object') {
        throw new Error("I could be wrong, but YAML doesn't seem valid.")
      }
      setAlertText('');
      setProperties(deflate(data)); // Convert the JSON structure into an array of strings
    } catch (e) {
      setAlertText(e.message);
      setProperties([]);
    }

  }, []);

  useEffect(() => {
    applyYamlText(yamlText);
  }, [yamlText, applyYamlText]);

  const onChangeHandler = event => {
    applyYamlText(`${event.target.value}`);
  };

  var result = "";
  if (properties) {

    properties.forEach((property) => (
      result = result.concat(property.split("=")[0].toUpperCase().replaceAll("-", "").replaceAll(".", "_")).concat("=").concat(property.split("=")[1]).concat('\n')
    ))
  }

  return (
    <div className="main">
    <Container>
      <Row>
        <Col>
          <div className="code-area">
              <Label for="exampleText">YAML</Label>
              <Input type="textarea" name="text" id="exampleText" 
              value={yamlText}
              onChange={onChangeHandler}/>
              <Alert color="danger" isOpen={alertText} toggle={onDismiss}>
                {alertText}
              </Alert>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="code-area">
            <Label for="exampleText">Environment Variables</Label>
            <Input type="textarea" name="text" id="exampleText" 
            value={result}
            onChange={onChangeHandler}/>
            <br/>
          </div>
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default Main;