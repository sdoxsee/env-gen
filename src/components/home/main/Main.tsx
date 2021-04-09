import { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Alert, Label, Input, FormGroup } from 'reactstrap';
import deflate from '../../../utils/deflate'
import inputHandler from '../../../utils/inputHandler'
import outputFormatter from '../../../utils/outputFormatter'
import './Main.css'

export enum Formats {
  YAML = "Spring Boot YAML",
  PROPERTIES = "Spring Boot Properties",
  SIMPLE = "Simple Environment Variables",
  TERMINAL = "Terminal Environment Variables",
  KUBERNETES = "Kubernetes Environment Variables",
}

enum ModelType {
  ENV,
  FLAT,
}

interface Defaults {
  modelType: ModelType,
  outputType: string,
  inputValue: string
}

interface Model {
  inputModelType?: ModelType,
  value?: string
}

const DefaultsMap = new Map<string, Defaults>([
  [Formats.YAML, {
    "modelType": ModelType.FLAT,
    "outputType": Formats.SIMPLE,
    "inputValue": 'foo-bar:\n  baz:\n    - value1\n    - value2\n  enabled: true\nabcDef: value3'
  }],
  [Formats.PROPERTIES, {
    "modelType": ModelType.FLAT,
    "outputType": Formats.SIMPLE,
    "inputValue": 'foo-bar.baz[0]=value1\nfoo-bar.baz[1]=value2\nfoo-bar.enabled=true\nabcDef=value3'
  }],
  [Formats.SIMPLE, {
    "modelType": ModelType.ENV,
    "outputType": Formats.KUBERNETES,
    "inputValue": 'FOOBAR_BAZ_0_=value1\nFOOBAR_BAZ_1_=value2\nFOOBAR_ENABLED=true\nABCDEF=value3'
  }],
  [Formats.TERMINAL, {
    "modelType": ModelType.ENV,
    "outputType": Formats.SIMPLE,
    "inputValue": 'FOOBAR_BAZ_0_=value1 FOOBAR_BAZ_1_=value2 FOOBAR_ENABLED=true ABCDEF=value3'
  }],
  [Formats.KUBERNETES, {
    "modelType": ModelType.ENV,
    "outputType": Formats.SIMPLE,
    "inputValue": "- name: FOOBAR_BAZ_0_\n  value: value1\n- name: FOOBAR_BAZ_1_\n  value: value2\n- name: FOOBAR_ENABLED\n  value: true\n- name: ABCDEF\n  value: value3"
  }],
]);

const Main = () => {

  const defaultInputType = Formats.YAML
  const [inputText, setInputText] = useState(DefaultsMap.get(defaultInputType)?.inputValue);
  const [inputType, setInputType] = useState(defaultInputType);
  const defaultModel: Model = {} 
  const [model, setModel] = useState(defaultModel);
  const [outputType, setOutputType] = useState(DefaultsMap.get(defaultInputType)?.outputType);
  const [alertText, setAlertText] = useState('');

  const onDismiss = () => setAlertText('');

  const applyInputText = useCallback((type, text) => {
    try {
      setInputText(text);
      setModel({
        inputModelType: DefaultsMap.get(type)?.modelType,
        value : inputHandler(type, text)
      })
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
    setInputType(requestedInputType);
    setOutputType(DefaultsMap.get(requestedInputType)?.outputType)
    applyInputText(requestedInputType, DefaultsMap.get(requestedInputType)?.inputValue)
  };

  const onChangeOutputTypeHandler = (event: any) => {
    setOutputType(event.target.value);
  };

  // https://www.petermorlion.com/iterating-a-typescript-enum/
  function enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
    return Object.keys(obj).filter(k => Number.isNaN(+k)) as K[];
  }

  const createInputOptions = () => {
    let items = []
    let i = 0
    for (const value of enumKeys(Formats)) {  
      items.push(<option key={i} value={Formats[value]}>{Formats[value]}</option>);   
      i++
    }
    return items;
  }  

  const createOutputOptions = () => {
    const regular = [Formats.SIMPLE, Formats.TERMINAL, Formats.KUBERNETES];
    let items = []
    for (let i = 0; i < regular.length; i++) {
      if (regular[i] !== inputType) { // don't include self in options
         items.push(<option key={i} value={regular[i]}>{regular[i]}</option>);   
      }
    }
        
    if (DefaultsMap.get(inputType)?.modelType === ModelType.FLAT) {
      const newOption = inputType === Formats.YAML ? Formats.PROPERTIES : Formats.YAML
      items.push(<option key={regular.length} value={newOption}>{newOption}</option>);
    }
    return items;
  }  
 
  var outputText
  try {
    const properties = deflate(model.value) // Convert the JSON structure into an array of strings
    console.log(model.value)
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
                  {createInputOptions()}
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
                  {createOutputOptions()}
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