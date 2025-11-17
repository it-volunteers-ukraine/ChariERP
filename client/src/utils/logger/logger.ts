/* eslint-disable no-console */

import { ILogger } from './logger.interface';

const createLogger = (): ILogger => {
  const consoleLogger: ILogger = {
    info: console.info.bind(console),
    error: console.error.bind(console),
    warn: console.warn.bind(console),
    debug: console.debug.bind(console),
  };

  if (typeof window === 'undefined') {
    // Server-side: try to use Winston, fallback to console
    try {
      const serverLogger = require('./logger.server');

      return serverLogger.default || consoleLogger;
    } catch {
      return consoleLogger;
    }
  } else {
    // Client-side: try to use loglevel, fallback to console
    try {
      const clientLogger = require('./logger.client');

      return clientLogger.default || consoleLogger;
    } catch {
      return consoleLogger;
    }
  }
};

const logger = createLogger();

export default logger;
