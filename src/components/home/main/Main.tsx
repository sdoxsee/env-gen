import { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Alert, Label, Input, FormGroup } from 'reactstrap';
// @ts-ignore
import yaml from 'js-yaml';
// @ts-ignore
import _ from 'lodash';
import deflate from '../../../utils/deflate'
import outputFormatter from '../../../utils/outputFormatter'
import './Main.css'

enum Inputs {
  YAML = "YAML",
  PROPERTIES = "Properties",
  SIMPLE = "Simple",
  TERMINAL = "Terminal",
  KUBERNETES = "Kubernetes",
}

export enum Outputs {
  YAML = "YAML",
  PROPERTIES = "Properties",
  SIMPLE = "Simple",
  TERMINAL = "Terminal",
  KUBERNETES = "Kubernetes",
}

const Main = () => {

  const defaultInputType = Inputs.YAML
  const defaultOutputType = Outputs.SIMPLE

  interface Defaults {
    outputType: string,
    inputValue: string
  }

  const DefaultsMap = new Map<string, Defaults>([
    [Inputs.YAML, {
      "outputType": Outputs.SIMPLE,
      "inputValue": 'foo-bar:\n  baz:\n    - value1\n    - value2\n  enabled: true\nabcDef: value3'
    }],
    [Inputs.PROPERTIES, {
      "outputType": Outputs.SIMPLE,
      "inputValue": 'foo-bar.baz[0]=value1\nfoo-bar.baz[1]=value2\nfoo-bar.enabled=true\nabcDef=value3'
    }],
    // [Inputs.SIMPLE, Outputs.KUBERNETES],
    // [Inputs.TERMINAL, Outputs.SIMPLE],
    // [Inputs.KUBERNETES, Outputs.SIMPLE],
  ]);

  const [inputText, setInputText] = useState(DefaultsMap.get(defaultInputType)?.inputValue);
  const [inputType, setInputType] = useState(defaultInputType);
  const [model, setModel] = useState({});
  const [outputType, setOutputType] = useState(defaultOutputType);
  const [alertText, setAlertText] = useState('');

  const onDismiss = () => setAlertText('');

  const applyInputText = useCallback((type, text) => {
    try {
      setInputText(text);
      // var deflated
      if (type === Inputs.YAML) {
        // https://github.com/jusufazer/yaml2properties/blob/master/src/scripts/processor.js
        const data = yaml.load(text);
        if (typeof data !== 'object') {
          throw new Error("I could be wrong, but YAML doesn't seem valid.")
        }
        setModel(data)
      } else if (type === Inputs.PROPERTIES) {
        // const flattened = deflated.join("\r\n")
        var result = text.split("\n") //divides lines
        .filter(Boolean) //removes empty lines
        .reduce((acc: any, line: any) => {
          _.set(acc, ...line.split("="));
          return acc;
        }, {})
        setModel(result)
      // console.log(result)
      // const data2 = yaml.dump(result);
      } else {
        throw new Error("Unsupported input type")
      }
        // setModel(data)
      setAlertText('');
    } catch (e) {
      setAlertText(e.message);
      // setProperties([]);
      setModel({})
    }

  }, []);

  useEffect(() => {
    applyInputText(inputType, inputText);
  }, [inputType, inputText, applyInputText]);

  const onChangeHandler = (event: any) => {
    applyInputText(inputType, `${event.target.value}`);
  };

  const onChangeInputTypeHandler = (event: any) => {
    const requestedInputType = event.target.value
    // setInputText(requestedInputType === 'YAML' ? defaultYaml : defaultProperties)
    setInputType(requestedInputType);
    setOutputType(defaultOutputType)
    applyInputText(requestedInputType, DefaultsMap.get(requestedInputType)?.inputValue)
  };

  const onChangeOutputTypeHandler = (event: any) => {
    setOutputType(event.target.value);
  };

  const createSelectItems = () => {
    const regular = ['Simple', 'Terminal', 'Kubernetes'];
    let items = []
    for (let i = 0; i < regular.length; i++) {       
         items.push(<option key={i} value={regular[i]}>{regular[i]}</option>);   
         //here I will be creating my options dynamically based on
         //what props are currently passed to the parent component
    }
    const newOption = inputType === 'YAML' ? 'Properties' : 'YAML'
    items.push(<option key={regular.length} value={newOption}>{newOption}</option>);
    return items;
  }  
 
  var outputText
  try {
    const properties = deflate(model) // Convert the JSON structure into an array of strings
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
            <FormGroup row>
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
            <Alert color="danger" isOpen={!!alertText.trim()} toggle={onDismiss}>
              {alertText}
            </Alert>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="code-area">
            <FormGroup row>
              <Label for="outputSelect" sm={2}>Output</Label>
              <Col sm={10}>
                <Input type="select" value={outputType} name="select2" id="outputSelect" onChange={onChangeOutputTypeHandler}>
                  {createSelectItems()}
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