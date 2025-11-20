import {
  DeleteObjectCommand,
  DeleteObjectCommandInput,
  DeleteObjectCommandOutput,
  GetObjectCommand,
  GetObjectCommandInput,
  ListObjectsCommand,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';
import logger from '@/utils/logger/logger';

const region = 'fra1';
const endpoint = `https://${region}.digitaloceanspaces.com`;

enum BucketFolders {
  Task = 'tasks',
  Avatar = 'avatars',
  UserProfileImages = 'user-profile-images',
  CertificateOfRegister = 'registration-certificate',
}

const s3Client = new S3Client({
  region,
  endpoint: endpoint,
  forcePathStyle: false, // Configures to use subdomain/virtual calling format.
  credentials: {
    accessKeyId: process.env.SPACES_KEY!,
    secretAccessKey: process.env.SPACES_SECRET!,
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
  const bucketFileDestinationPath = `${encodeURIComponent(organizationName)}/${folder}/${file.name}`;

  const fileContent = Buffer.from(await file.arrayBuffer());
  const params = {
    Body: fileContent,
    ACL: 'private',
    Key: bucketFileDestinationPath,
    Bucket: process.env.S3_BUCKET_ID,
  } as PutObjectCommandInput;

  try {
    await s3Client.send(new PutObjectCommand(params));

    logger.info(`Successfully uploaded object: ${params.Key}`);

    return params.Key;
  } catch (error) {
    logger.error('Error while transferring a file to S3 bucket', error);

    return false;
  }
};

const downloadFileFromBucket = async (fileName: string) => {
  const params = {
    Key: fileName,
    Bucket: process.env.S3_BUCKET_ID,
  } as GetObjectCommandInput;

  try {
    const downloadedFile = await s3Client.send(new GetObjectCommand(params));

    logger.info(`Successfully downloaded object: ${params.Key}`);

    return downloadedFile.Body;
  } catch (error) {
    logger.error('Error while downloading a file from S3 bucket', error);
  }
};

const deleteFileFromBucket = async (fileName: string) => {
  const params = {
    Key: fileName,
    Bucket: process.env.S3_BUCKET_ID,
  } as DeleteObjectCommandInput;

  try {
    await s3Client.send(new DeleteObjectCommand(params));

    logger.info(`Successfully deleted object: ${params.Key}`);

    return true;
  } catch (error) {
    logger.error('Error while deleting a file from S3 bucket', error);

    return false;
  }
};

const deleteFolderFromBucket = async (folderName: string) => {
  try {
    const DeletePromises: Promise<DeleteObjectCommandOutput>[] = [];
    const { Contents } = await s3Client.send(
      new ListObjectsCommand({
        Prefix: folderName,
        Bucket: process.env.S3_BUCKET_ID,
      }),
    );

    if (!Contents) {
      return;
    }

    Contents.forEach(({ Key }) => {
      DeletePromises.push(
        s3Client.send(
          new DeleteObjectCommand({
            Key,
            Bucket: process.env.S3_BUCKET_ID,
          }),
        ),
      );
    });

    await Promise.all(DeletePromises);
    logger.info(`Successfully deleted object: ${folderName}`);

    return true;
  } catch (error) {
    logger.error('Error while deleting a folder from S3 bucket:', error);

    return false;
  }
};

export { BucketFolders, downloadFileFromBucket, uploadFileToBucket, deleteFileFromBucket, deleteFolderFromBucket };
