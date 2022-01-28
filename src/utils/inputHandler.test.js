import inputHandler from './inputHandler';
import {Formats} from '../components/home/main/Main'

test('simplifies input', () => {
    const input = `            - name: SPRING_CACHE_TYPE 
    value: redis
  - name: SPRING_REDIS_SSL
    value: true`
    expect(inputHandler(Formats.KUBERNETES, input))
        .toStrictEqual({"SPRING_CACHE_TYPE": "redis", "SPRING_REDIS_SSL": "true"});
});

// https://stackoverflow.com/a/21699210/1098564
test('simplifies input quotations', () => {
  const input = `
  - name: SPRING_CACHE_TYPE 
    value: redis
  - name: >-
      SPRING_REDIS_SSL
    value: don't
  - name: >-
      SPRING_REDIS_SSL1
    value: "don't"
  - name: >-
      SPRING_REDIS_SSL2
    value: >-
      don't
      - name: >-
      SPRING_REDIS_SSL3
    value: 'redis'`

  expect(inputHandler(Formats.KUBERNETES, input))
      .toStrictEqual({"SPRING_CACHE_TYPE": "redis", "SPRING_REDIS_SSL": "don't", "SPRING_REDIS_SSL1": "don't", "SPRING_REDIS_SSL2": "don't",  "SPRING_REDIS_SSL3": "redis"});
});

// // https://stackoverflow.com/a/21699210/1098564
// test('block style chomp strip', () => {
//   const input = `
//   - name: SOME_KEY
//     value: >-
//       very "long"
//       'string' with

//       paragraph gap, \n and        
//       spaces.
//   `
//   expect(inputHandler(Formats.KUBERNETES, input))
//       .toStrictEqual({"SOME_KEY": "very \"long\" 'string' with\nparagraph gap, \\n and         spaces."});
// });

test('simplifies input properties quotes', () => {
  const input = `foo-bar.baz[0]=value1
foo-bar.baz[1]=value2
foo-bar.enabled=true
abcDef=value3
`
  expect(inputHandler(Formats.PROPERTIES, input))
      .toStrictEqual({"abcDef":"value3","foo-bar":{"baz":["value1","value2"],"enabled":"true"}});
});