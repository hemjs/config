import { GlobOptions, globSync } from 'glob';
import { dynamicRequire, mergeConfig } from './utils';

/**
 * Provide a collection of (j|t)s files returning config arrays.
 *
 * @param pattern a glob pattern by which to look up config files
 * @param options optional glob options
 * @returns merged configurations object
 */
export function loadConfigFromFiles(
  pattern: string,
  options: GlobOptions = {},
) {
  let config = {};
  // Load configuration from autoload path
  const paths = globSync(pattern, options);
  // Require each file in the autoload dir and merge configurations
  paths.forEach((file: any) => {
    config = mergeConfig(config, dynamicRequire(file));
  });
  // return an object containing of merged configurations
  return config;
}
