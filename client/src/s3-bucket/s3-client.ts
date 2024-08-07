import {
  GetObjectCommand,
  GetObjectCommandInput,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';

const region = 'fra1';
const endpoint = `https://${region}.digitaloceanspaces.com`;

enum BucketFolders {
  CertificateOfRegister = 'organization-signup-certificates',
  UserProfileImages = 'user-profile-images',
}

const s3Client = new S3Client({
  forcePathStyle: false, // Configures to use subdomain/virtual calling format.
  endpoint: endpoint,
  region,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_SPACES_KEY!,
    secretAccessKey: process.env.NEXT_PUBLIC_SPACES_SECRET!,
  },
});

/**
 * Uploads received file to AWS S3 bucket into a specified folder
 * @param folder name of the folder to upload the file
 * @param file the content file to be uploaded
 * @returns URL of uploaded file
 */
const uploadFileToBucket = async (folder: BucketFolders, file: File) => {
  const params = {
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_ID,
    Key: `${folder}/${file.name}`,
    Body: file,
    ACL: 'private',
  } as PutObjectCommandInput;

  try {
    await s3Client.send(new PutObjectCommand(params));

    console.log(`Successfully uploaded object: ${params.Key}`);

    return params.Key;
  } catch (err) {
    console.log('Error while transferring a file to S3 bucket:', err);
  }
};

const downloadFileFromBucket = async (fileName: string) => {
  const params = {
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_ID,
    Key: fileName,
  } as GetObjectCommandInput;

  try {
    const downloadedFile = await s3Client.send(new GetObjectCommand(params));

    console.log(`Successfully downloaded object: ${params.Key}`);

    return downloadedFile.Body;
  } catch (err) {
    console.log('Error while downloading a file from S3 bucket:', err);
  }
};

export { BucketFolders, downloadFileFromBucket, uploadFileToBucket };
