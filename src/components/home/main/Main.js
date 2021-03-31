import { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Alert, Label, Input, FormGroup } from 'reactstrap';
import yaml from 'js-yaml';
import deflate from '../../../utils/deflate'
import outputFormatter from '../../../utils/outputFormatter'
import './Main.css'

const Main = (props) => {

  const [inputText, setInputText] = useState('foo-bar:\n  baz:\n    - value1\n    - value2\n  enabled: true\nabcDef: value3');
  // const [inputType, setInputType] = useState('YAML');
  const [inputType] = useState('YAML');
  const [outputType, setOutputType] = useState('Simple');
  const [properties, setProperties] = useState();
  const [alertText, setAlertText] = useState('');

  const onDismiss = () => setAlertText('');

  const applyInputText = useCallback((type, text) => {
    try {
      setInputText(text);
      var deflated
      // if (type === 'YAML') {
        // https://github.com/jusufazer/yaml2properties/blob/master/src/scripts/processor.js
        const data = yaml.load(text);
        if (typeof data !== 'object') {
          throw new Error("I could be wrong, but YAML doesn't seem valid.")
        }
        deflated = deflate(data) // Convert the JSON structure into an array of strings
      // } else {
      //   deflated = text
      //     .split('\n')
      //     .map(s => s.trim())
      //     .filter(String);
      // }
      setProperties(deflated); 
      setAlertText('');
    } catch (e) {
      setAlertText(e.message);
      setProperties([]);
    }

  }, []);

  useEffect(() => {
    applyInputText(inputType, inputText);
  }, [inputType, inputText, applyInputText]);

  const onChangeHandler = event => {
    applyInputText(`${event.target.value}`);
  };

  // const onChangeInputTypeHandler = event => {
  //   setInputType(`${event.target.value}`);
  // };

  const onChangeOutputTypeHandler = event => {
    setOutputType(`${event.target.value}`);
  };
 
  var outputText
  try {
    outputText = properties ? outputFormatter(outputType, properties) : ''
  } catch (e) {
    console.log(e)
    outputText = ''
  }
  
  return (
    <div className="main">
    <Container>
      <Row>
        <Col>
          <div className="code-area">
            <Label for="inputSelect">YAML</Label>
            <Input type="textarea" name="select1" id="inputSelectMain" 
            value={inputText}
            onChange={onChangeHandler}/>
            <Alert color="danger" isOpen={alertText} toggle={onDismiss}>
              {alertText}
            </Alert>
        {/* <FormGroup row>
              <Label for="inputSelect" sm={2}>Input</Label>
              <Col sm={10}>
                <Input type="select" name="select1" id="inputSelect" onChange={onChangeInputTypeHandler}>
                  <option>YAML</option>
                  <option>Properties</option>
                </Input>
              </Col>
            </FormGroup>
            <Input type="textarea" name="text1" id="inputSelectMain" 
            value={inputText}
            onChange={onChangeHandler}/>
            <Alert color="danger" isOpen={alertText} toggle={onDismiss}>
              {alertText}
            </Alert> */}
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="code-area">
            <FormGroup row>
              <Label for="outputSelect" sm={2}>Output</Label>
              <Col sm={10}>
                <Input type="select" name="select2" id="outputSelect" onChange={onChangeOutputTypeHandler}>
                  <option>Simple</option>
                  <option>Shell</option>
                  <option>Kubernetes</option>
                  <option>Properties</option>
                </Input>
              </Col>
            </FormGroup>
            <Input type="textarea" name="text2" id="outputSelectMain" 
              value={outputText}
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