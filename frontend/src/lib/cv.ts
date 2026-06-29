import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { readFile } from "node:fs/promises";
import path from "node:path";

export type CvContent = {
  body: Uint8Array;
  etag?: string;
  lastModified?: Date;
};

function getS3Client() {
  const region = process.env.AWS_REGION;

  if (!region) {
    return null;
  }

  const credentials =
    process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
      ? {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        }
      : undefined;

  return new S3Client({
    region,
    credentials,
  });
}

function isS3Configured() {
  return Boolean(process.env.AWS_S3_CV_BUCKET && process.env.AWS_REGION);
}

async function fetchCvFromS3(): Promise<CvContent> {
  const bucket = process.env.AWS_S3_CV_BUCKET;
  const key = process.env.AWS_S3_CV_KEY ?? "cv.pdf";
  const client = getS3Client();

  if (!bucket || !client) {
    throw new Error("S3 CV storage is not configured.");
  }

  const result = await client.send(
    new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    }),
  );

  if (!result.Body) {
    throw new Error("CV object has no body.");
  }

  const body = await result.Body.transformToByteArray();

  return {
    body,
    etag: result.ETag,
    lastModified: result.LastModified,
  };
}

async function fetchLocalCv(): Promise<CvContent> {
  const filePath = path.join(process.cwd(), "public", "cv-fallback.pdf");
  const buffer = await readFile(filePath);

  return { body: new Uint8Array(buffer) };
}

export async function fetchCvContent(): Promise<CvContent> {
  if (isS3Configured()) {
    return fetchCvFromS3();
  }

  return fetchLocalCv();
}
