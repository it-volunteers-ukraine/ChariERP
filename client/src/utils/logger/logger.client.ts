import log from 'loglevel';
import { ILogger } from './logger.interface';

log.setLevel(process.env.NODE_ENV === 'production' ? 'warn' : 'debug');

function sanitizeLogMessage(message: any): any {
  // Only sanitize string messages – pass other objects/values unchanged
  if (typeof message === 'string') {
    // Remove carriage return and new line characters
    return message.replace(/[\r\n]+/g, '');
  }
  return message;
}

const logger: ILogger = {
  info: (message: any, ...meta: any[]) => log.info(sanitizeLogMessage(message), ...meta),
  error: (message: any, ...meta: any[]) => log.error(sanitizeLogMessage(message), ...meta),
  warn: (message: any, ...meta: any[]) => log.warn(sanitizeLogMessage(message), ...meta),
  debug: (message: any, ...meta: any[]) => log.debug(sanitizeLogMessage(message), ...meta),
};

export default logger;
