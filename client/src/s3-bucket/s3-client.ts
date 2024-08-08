import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommandInput,
  PutObjectCommandInput,
  DeleteObjectCommandInput,
} from '@aws-sdk/client-s3';

const region = 'fra1';
const endpoint = `https://${region}.digitaloceanspaces.com`;

enum BucketFolders {
  UserProfileImages = 'user-profile-images',
  CertificateOfRegister = 'registration-certificate',
}

const s3Client = new S3Client({
  region,
  endpoint: endpoint,
  forcePathStyle: false, // Configures to use subdomain/virtual calling format.
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_SPACES_KEY!,
    secretAccessKey: process.env.NEXT_PUBLIC_SPACES_SECRET!,
  },
});

/**
 * Uploads received file to AWS S3 bucket into a specified folder
 * @param organizationName official name of the organization
 * @param folder name of the folder to upload the file
 * @param file the content file to be uploaded
 * @returns URL of uploaded file
 */
const uploadFileToBucket = async (organizationName: string, folder: BucketFolders, file: File) => {
  const fileContent = await file.arrayBuffer();
  const bucketFileDestinationPath = encodeURI(`${organizationName}/${folder}/${file.name}`);
  const params = {
    Body: fileContent,
    ACL: 'private',
    Key: bucketFileDestinationPath,
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_ID,
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
    Key: fileName,
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_ID,
  } as GetObjectCommandInput;

  console.log('download params', params);

  try {
    const downloadedFile = await s3Client.send(new GetObjectCommand(params));

    console.log(`Successfully downloaded object: ${params.Key}`);

    return downloadedFile.Body;
  } catch (err) {
    console.log('Error while downloading a file from S3 bucket:', err);
  }
};

const deleteFileFromBucket = async (fileName: string) => {
  const params = {
    Key: fileName,
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_ID,
  } as DeleteObjectCommandInput;

  console.log('delete params', params);

  try {
    await s3Client.send(new DeleteObjectCommand(params));

    console.log(`Successfully deleted object: ${params.Key}`);

    return true;
  } catch (err) {
    console.log('Error while deleting a file from S3 bucket:', err);

    return false;
  }
};

export { BucketFolders, downloadFileFromBucket, uploadFileToBucket, deleteFileFromBucket };
