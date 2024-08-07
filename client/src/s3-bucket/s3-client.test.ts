import { BucketFolders, uploadFileToBucket } from '@/s3-bucket/s3-client';

jest.mock('@aws-sdk/client-s3');

describe('S3 bucket file upload test', () => {
  it('should upload a valid file', async () => {
    const buffer = Array.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII',
    );
    const fileName = 'certificate.jpeg';
    const fileToUpload = new File(buffer, fileName);

    const fileInBucketUrl = await uploadFileToBucket(BucketFolders.CertificateOfRegister, fileToUpload);

    expect(fileInBucketUrl).toBe(`${BucketFolders.CertificateOfRegister}/${fileName}`);
  });
});
