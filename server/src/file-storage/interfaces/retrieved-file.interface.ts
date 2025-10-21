import stream from 'node:stream';

export interface RetrievedFile {
  stream: stream.Readable;
  contentType: string;
  contentLength: number;
}
