
import React from 'react';
import { Label, Input } from 'reactstrap';
import './Code.css';

const Code = (props) => {
  return (
    <>
        <Label for="exampleText">Text Area</Label>
        <Input type="textarea" name="text" id="exampleText" />
    </>
    )
}

export default Code
