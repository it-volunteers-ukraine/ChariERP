import { createLogger, format, transports } from 'winston';
import { ILogger } from './logger.interface';

const winstonLogger = createLogger({
  level: 'info',
  format: format.combine(format.errors({ stack: true }), format.timestamp(), format.json()),
  transports: [new transports.Console()],
});

const logger: ILogger = {
  info: (message: any, ...meta: any[]) => winstonLogger.info(message, ...meta),
  error: (message: any, ...meta: any[]) => winstonLogger.error(message, ...meta),
  warn: (message: any, ...meta: any[]) => winstonLogger.warn(message, ...meta),
  debug: (message: any, ...meta: any[]) => winstonLogger.debug(message, ...meta),
};

export default logger;
