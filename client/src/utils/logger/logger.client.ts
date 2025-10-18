import log from 'loglevel';
import { ILogger } from './logger.interface';

log.setLevel(process.env.NODE_ENV === 'production' ? 'warn' : 'debug');

function sanitizeLogMessage(message: any): any {
  if (typeof message === 'string') {
    return message.replaceAll(/[\r\n]+/g, '');
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
