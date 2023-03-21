import type { Type } from '@hemtypes/core';
import type { Module } from '@hemtypes/hem';

export type ConfigProvider = Type<Module> | Function | Record<string, any>;
