import { Readable } from 'stream';

export interface RetrievedFile {
  stream: Readable;
  contentType: string;
  contentLength: number;
}
