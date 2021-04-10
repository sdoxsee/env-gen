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