import { PutObjectCommand, PutObjectCommandInput, S3Client } from '@aws-sdk/client-s3';

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
    accessKeyId: process.env.SPACES_KEY!,
    secretAccessKey: process.env.SPACES_SECRET!,
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
    Bucket: process.env.S3_BUCKET_ID,
    Key: `${folder}/${file.name}`,
    Body: file,
    ACL: 'private',
  } as PutObjectCommandInput;

  try {
    await s3Client.send(new PutObjectCommand(params));

    console.log(`Successfully uploaded object: ${params.Key}`);

    return `${endpoint}/${params.Key}`;
  } catch (err) {
    console.log('Error while transferring a file to S3 bucket:', err);
  }
};

export { BucketFolders, uploadFileToBucket };
