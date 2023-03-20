import { join } from 'path';
import { mergeConfig } from '../src';
import { dynamicRequire } from '../src/utils';

describe('margeConfig', () => {
  it('should return empty object when absent target and absent source', () => {
    expect(mergeConfig()).toEqual({});
  });

  it('should merge object properties absent in target correctly', () => {
    expect(mergeConfig({}, { foo: 'bar' })).toEqual({ foo: 'bar' });
  });

  it('should merge array elements absent in target correctly', () => {
    expect(mergeConfig({}, { foo: ['bar'] })).toEqual({ foo: ['bar'] });
  });

  it('should override when object target and object source', () => {
    expect(mergeConfig({ foo: 'bar' }, { foo: 'baz' })).toEqual({ foo: 'baz' });
  });

  it('should concatenate when array target and array source', () => {
    expect(mergeConfig({ foo: ['bar'] }, { foo: ['baz'] })).toEqual({
      foo: ['bar', 'baz'],
    });
  });

  it('should deep override when object target and object source', () => {
    expect(
      mergeConfig({ foo: { bar: 'baz' } }, { foo: { bar: 'bat' } }),
    ).toEqual({ foo: { bar: 'bat' } });
  });

  it('should handle when three way merge', () => {
    expect(mergeConfig({ foo: 'bar' }, { foo: 'baz' }, { foo: 'bat' })).toEqual(
      { foo: 'bat' },
    );
  });

  it('should return target when undefined source', () => {
    expect(mergeConfig({ foo: 'bar' }, undefined)).toEqual({
      foo: 'bar',
    });
  });

  it('should return target when null source', () => {
    expect(mergeConfig({ foo: 'bar' }, null)).toEqual({
      foo: 'bar',
    });
  });

  it('should return target when undefined source value', () => {
    expect(mergeConfig({ foo: 'bar' }, { foo: undefined })).toEqual({
      foo: 'bar',
    });
  });

  it('should return target when null source value', () => {
    expect(mergeConfig({ foo: 'bar' }, { foo: null })).toEqual({
      foo: 'bar',
    });
  });
});

describe('dynamicRequire', () => {
  test('ESM', () => {
    const content = dynamicRequire(
      join(__dirname, 'fixtures', 'dynamic', 'esm'),
    );

    expect(content).toBeDefined();
    expect(content).toMatchObject(expect.objectContaining({ foo: 'bar' }));
  });

  test('CJS', () => {
    const content = dynamicRequire(
      join(__dirname, 'fixtures', 'dynamic', 'cjs'),
    );

    expect(content).toBeDefined();
    expect(content).toMatchObject(expect.objectContaining({ foo: 'bar' }));
  });
});
