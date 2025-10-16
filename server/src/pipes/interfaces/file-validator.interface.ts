export interface FileValidator {
  validate(files: Express.Multer.File[]): void;
}
