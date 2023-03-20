import { ConfigAggregator } from '../src';
import { BarConfigProvider } from './fixtures/bar-config.provider';
import { FooConfigProvider } from './fixtures/foo-config.provider';
import { NoopConfigProvider } from './fixtures/noop-config.provider';

test('should return an instance of ConfigAggregator', () => {
  const aggregator = new ConfigAggregator();

  expect(aggregator).toBeInstanceOf(ConfigAggregator);
});

test('should merge config when class providers', () => {
  const aggregator = new ConfigAggregator([
    BarConfigProvider,
    FooConfigProvider,
  ]);
  const config = aggregator.getMergedConfig();

  expect(config).toEqual({ bar: 'bat', foo: ['bar'] });
});

test('should merge config when instance providers', () => {
  const aggregator = new ConfigAggregator([
    new BarConfigProvider(),
    new FooConfigProvider(),
  ]);
  const config = aggregator.getMergedConfig();

  expect(config).toEqual({ bar: 'bat', foo: ['bar'] });
});

test('should merge config when noop providers', () => {
  const aggregator = new ConfigAggregator([
    BarConfigProvider,
    NoopConfigProvider,
  ]);
  const config = aggregator.getMergedConfig();

  expect(config).toEqual({ bar: 'bat' });
});

test('should merge config when function providers', () => {
  const aggregator = new ConfigAggregator([
    () => {
      return { baz: 'baz' };
    },
  ]);
  const config = aggregator.getMergedConfig();

  expect(config).toEqual({ baz: 'baz' });
});

test('should merge config when object providers', () => {
  const aggregator = new ConfigAggregator([
    { bar: 'bat' },
    { foo: ['bar'] },
    { baz: 'baz' },
  ]);
  const config = aggregator.getMergedConfig();

  expect(config).toEqual({ bar: 'bat', foo: ['bar'], baz: 'baz' });
});

test('should merge config when mix providers', () => {
  const aggregator = new ConfigAggregator([
    new BarConfigProvider(),
    FooConfigProvider,
    () => {
      return { baz: 'baz' };
    },
    { baz: 'baz' },
  ]);
  const config = aggregator.getMergedConfig();

  expect(config).toEqual({ bar: 'bat', foo: ['bar'], baz: 'baz' });
});

test('should overwrite when object providers', () => {
  const aggregator = new ConfigAggregator([
    new BarConfigProvider(),
    new BarConfigProvider(),
  ]);
  const config = aggregator.getMergedConfig();

  expect(config).toEqual({ bar: 'bat' });
});

test('should concatenate when array providers', () => {
  const aggregator = new ConfigAggregator([
    new BarConfigProvider(),
    new FooConfigProvider(),
    new FooConfigProvider(),
  ]);
  const config = aggregator.getMergedConfig();

  expect(config).toEqual({ bar: 'bat', foo: ['bar', 'bar'] });
});

test('should throw when invalid provider', () => {
  expect(() => new ConfigAggregator(['invalid-provider' as any])).toThrow();
});
