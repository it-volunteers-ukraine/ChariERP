/* eslint-disable no-console */

import { ILogger } from './logger.interface';

const createLogger = (): ILogger => {
  if (globalThis.window === undefined) {
    // Server-side: try to use Winston, fallback to console
    try {
      return eval('require')('./logger.server').default;
    } catch {
      return {
        info: console.info.bind(console),
        error: console.error.bind(console),
        warn: console.warn.bind(console),
        debug: console.debug.bind(console),
      };
    }
  } else {
    // Client-side: try to use loglevel, fallback to console
    try {
      return require('./logger.client').default;
    } catch {
      return {
        info: console.info.bind(console),
        error: console.error.bind(console),
        warn: console.warn.bind(console),
        debug: console.debug.bind(console),
      };
    }
  }
};

const logger = createLogger();

export default logger;
