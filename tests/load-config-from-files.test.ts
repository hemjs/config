import { join } from 'path';
import { loadConfigFromFiles } from '../src';

test('should load and merge config from files', () => {
  const config = loadConfigFromFiles(
    join(__dirname, 'fixtures', 'autoload/{{,*.}global,{,*.}local}.+(j|t)s'),
  );

  expect(config).toEqual({ foo: 'bar', bar: 'bat' });
});
