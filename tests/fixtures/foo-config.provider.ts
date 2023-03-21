import type { Module } from '@hemtypes/hem';

export class FooConfigProvider implements Module {
  register() {
    return { foo: ['bar'] };
  }
}
