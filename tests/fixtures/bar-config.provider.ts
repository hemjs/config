import type { Module } from '@hemtypes/hem';

export class BarConfigProvider implements Module {
  register() {
    return { bar: 'bat' };
  }
}
