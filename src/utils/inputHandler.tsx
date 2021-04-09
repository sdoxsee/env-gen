// @ts-ignore
import yaml from 'js-yaml';
// @ts-ignore
import _ from 'lodash';
import {Formats} from '../components/home/main/Main'

const inputHandler = (type: Formats, text: string) => {
  var data
  if (type === Formats.YAML) {
    // https://github.com/jusufazer/yaml2properties/blob/master/src/scripts/processor.js
    data = yaml.load(text);
    if (typeof data !== 'object') {
      throw new Error("I could be wrong, but YAML doesn't seem valid.")
    }
  } else if (type === Formats.PROPERTIES) {
    // const flattened = deflated.join("\r\n")
    data = text
      .split("\n") //divides lines
      .filter(Boolean) //removes empty lines
      .reduce((acc: any, line: any) => {
        _.set(acc, ...line.split("="));
        return acc;
      }, {})
  } else if (type === Formats.SIMPLE) {
    data = text
      .split("\n") //divides lines
      .filter(Boolean) //removes empty lines
      .reduce((acc: any, line: any) => {
        _.set(acc, ...line.split("="));
        return acc;
      }, {})
  } else if (type === Formats.TERMINAL) {
    data = text
      .split(" ") //divides lines
      .filter(Boolean) //removes empty lines
      .reduce((acc: any, line: any) => {
        _.set(acc, ...line.split("="));
        return acc;
      }, {})
  } else if (type === Formats.KUBERNETES) {
    // https://stackoverflow.com/a/10805198/1098564
    data = text
      .replace(/(\r\n|\n|\r)/gm, "")
      .trim()
      .split("- name: ") //divides lines
      .filter(Boolean) //removes empty lines
      .reduce((acc: any, line: any) => {
        _.set(acc, ...line.split("  value: "));
        return acc;
      }, {})  
  } else {
    throw new Error("Unsupported input type")
  }
  return data
}

export default inputHandler;
