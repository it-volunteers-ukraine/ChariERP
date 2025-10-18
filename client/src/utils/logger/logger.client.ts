import log from 'loglevel';
import { ILogger } from './logger.interface';

log.setLevel(process.env.NODE_ENV === 'production' ? 'warn' : 'debug');

const logger: ILogger = {
  info: (message: any, ...meta: any[]) => log.info(message, ...meta),
  error: (message: any, ...meta: any[]) => log.error(message, ...meta),
  warn: (message: any, ...meta: any[]) => log.warn(message, ...meta),
  debug: (message: any, ...meta: any[]) => log.debug(message, ...meta),
};

export default logger;
