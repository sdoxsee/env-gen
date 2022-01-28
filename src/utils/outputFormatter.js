import yaml from 'js-yaml';
import _ from 'lodash';
import {Formats} from '../components/home/main/Main'

const outputFormatter = (outputType, properties) => {
    if (outputType === Formats.SIMPLE) {
        return simpleFormatter(properties)
    } else if (outputType === Formats.TERMINAL) {
        return terminalFormatter(properties)
    } else if (outputType === Formats.KUBERNETES) {
        return kubernetesFormatter(properties)
    } else if (outputType === Formats.PROPERTIES) {
        return propertiesFormatter(properties)
    } else if (outputType === Formats.YAML) {
        return yamlFormatter(properties)
    } else {
        throw new Error("outputType " + outputType + "not supported");
    }
}

// see https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-external-config-relaxed-binding-from-environment-variables
const getName = property => (
    property
        .split("=")[0]
        .toUpperCase()
        .replaceAll("-", "")
        .replaceAll("].", "_") // don't do double underscore after list element
        .replaceAll(".", "_")
        .replaceAll("[", "_")
        .replaceAll("]", "_")
)

const getValue = property => ((property.split("=")[1])
    .replace(/^["'](.+(?=["']$))["']$/, '$1') // https://stackoverflow.com/a/19156197/1098564
)

const simpleFormatter = (properties) => {
    var result = "";
    properties.forEach((property) => {
        result = result
            .concat(getName(property))
            .concat("=")
            .concat(getValue(property))
            .concat('\n')       
    })
    return result;
}

const terminalFormatter = (properties) => {
    var result = "";
    properties.forEach((property) => {
        result = result
            .concat(getName(property))
            .concat("=")
            .concat(getValue(property))
            .concat(' ')       
    })
    return result;
}

const kubernetesFormatter = (properties) => {
    var result = "";
    properties.forEach((property) => {
        result = result
            .concat('- name: ')
            .concat(getName(property))
            // .concat('\n  value: \'')
            .concat('\n  value: ')
            .concat("'" + getValue(property) + "'")
            // .concat('\'\n')       
            .concat('\n')       
    })
    return result;
}

const propertiesFormatter = (properties) => {
    var result = "";
    properties.forEach((property) => {
        result = result
            .concat(property.split("=")[0])
            .concat('=')
            .concat(property.split("=")[1])
            .concat('\n')       
    })
    return result;
}

const yamlFormatter = (properties) => {
    var result = properties
    .filter(Boolean) //removes empty lines
    .reduce((acc, line) => {
        var pair = line.split("=")
        if (pair[1]) {
            if (pair[1] === 'true') {
                pair[1] = true;
            } else if (pair[1] === 'false') {
                pair[1] = false;
            }
        }
        _.set(acc, ...pair);
        return acc;
    }, {})
    return yaml.dump(result);
}

export default outputFormatter;
