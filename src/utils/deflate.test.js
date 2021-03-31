import deflate from './deflate';

test('deflates json', () => {
  expect(deflate({'foo-bar': {baz: ['value1', 'value2']}}, ''))
    .toStrictEqual(["foo-bar.baz[0]=value1", "foo-bar.baz[1]=value2"]);
});
