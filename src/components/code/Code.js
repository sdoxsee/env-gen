
import React from 'react';
import { Label, Input } from 'reactstrap';
import './Code.css';

const Code = (props) => {

  const { title } = props;

  return (
    <div className="code">
        <Label for="exampleText">{title}</Label>
        <Input type="textarea" name="text" id="exampleText" />
        <br/>
    </div>
    )
}

export default Code
