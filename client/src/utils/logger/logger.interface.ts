export interface ILogger {
  info: (message: any, ...meta: any[]) => void;
  error: (message: any, ...meta: any[]) => void;
  warn: (message: any, ...meta: any[]) => void;
  debug: (message: any, ...meta: any[]) => void;
}
