import { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Alert, Label, Input, FormGroup } from 'reactstrap';
import yaml from 'js-yaml';
import deflate from '../../../utils/deflate'
import outputFormatter from '../../../utils/outputFormatter'
import './Main.css'

const Main = (props) => {

  const [yamlText, setYamlText] = useState('foo-bar:\n  baz:\n    - value1\n    - value2\n  enabled: true\nabcDef: value3');
  const [outputType, setOutputType] = useState('Simple');
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

  const onChangeOutputTypeHandler = event => {
    setOutputType(`${event.target.value}`);
  };
 
  var result
  try {
    result = properties ? outputFormatter(outputType, properties) : ''
  } catch (e) {
    console.log(e)
    result = ''
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
            <FormGroup row>
              <Label for="exampleSelect" sm={2}>Output</Label>
              <Col sm={10}>
                <Input type="select" name="select" id="exampleSelect" onChange={onChangeOutputTypeHandler}>
                  <option>Simple</option>
                  <option>Shell</option>
                  <option>Kubernetes</option>
                  <option>Properties</option>
                </Input>
              </Col>
            </FormGroup>
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