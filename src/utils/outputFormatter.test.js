import outputFormatter from './outputFormatter';
import {Formats} from '../components/home/main/Main'

test('yaml format', () => {
    const input = `foo-bar.baz[0]=value1
foo-bar.baz[1]=value2
foo-bar.enabled=true
abcDef=value3
`.split("\n")

    expect(outputFormatter(Formats.YAML, input))
        .toStrictEqual(
`foo-bar:
  baz:
    - value1
    - value2
  enabled: true
abcDef: value3
`);
});

test('k8s format', () => {
    const input = `foo-bar.baz[0]=value1
foo-bar.baz[1]=value2
foo-bar.enabled=true
abcDef=value3`.split("\n")

    expect(outputFormatter(Formats.KUBERNETES, input))
        .toStrictEqual(
`- name: FOOBAR_BAZ_0_
  value: 'value1'
- name: FOOBAR_BAZ_1_
  value: 'value2'
- name: FOOBAR_ENABLED
  value: 'true'
- name: ABCDEF
  value: 'value3'
`);
});
