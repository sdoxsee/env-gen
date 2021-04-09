import deflate from './deflate';

test('deflates json', () => {
    expect(deflate({ 'foo-bar': { baz: [{ biz: ['value1', 'value2'] }] } }, ''))
        .toStrictEqual(["foo-bar.baz[0].biz[0]=value1", "foo-bar.baz[0].biz[1]=value2"]);
});

test('deflates large json', () => {
    expect(deflate({
        "cloud": {
            "gateway": {
                "routes": [
                    {
                        "id": "after_route",
                        "uri": "https://example.org",
                        "predicates": [
                            {
                                "name": "Cookie",
                                "args": {
                                    "name": "mycookie",
                                    "regexp": "mycookievalue"
                                }
                            }
                        ]
                    }
                ]
            }
        }
    }
        , ''))
        .toStrictEqual(
            ["cloud.gateway.routes[0].id=after_route",
            "cloud.gateway.routes[0].uri=https://example.org",
            "cloud.gateway.routes[0].predicates[0].name=Cookie",
            "cloud.gateway.routes[0].predicates[0].args.name=mycookie",
            "cloud.gateway.routes[0].predicates[0].args.regexp=mycookievalue",]);
});
