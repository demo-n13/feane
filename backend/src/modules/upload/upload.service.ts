import * as fs from 'fs/promises';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
import {
  RemoveFileRequest,
  RemoveFileResponse,
  UploadFileRequest,
  UploadFileResponse,
} from './interfaces';
import { existsSync } from 'fs';
import { Client } from 'minio';

@Injectable()
export class UploadService {
  private minioClient: Client;

  constructor() {
    this.minioClient = new Client({
      endPoint: 'localhost',
      port: 9000,
      useSSL: false,
      accessKey: 'QbiaRhUMIXgUmfzVSfR6',
      secretKey: 'aPTTPf1lhusv1e0JybHWF1bIcKjJzm1wlkJ9GEmH',
    });
  }

  async uploadFile(payload: UploadFileRequest): Promise<UploadFileResponse> {
    // GENERATE UNIQUE FILE NAME
    const extName = path.extname(payload.file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileName = payload.file.fieldname + '-' + uniqueSuffix + extName;

    // Check if bucket exists
    const isBucketExists = await this.minioClient.bucketExists(payload.bucket);

    // If bucket not exists then create it
    if (!isBucketExists) {
      await this.minioClient.makeBucket(payload.bucket);
    }

    // Upload file to minio server
    const file = await this.minioClient.putObject(
      payload.bucket,
      fileName,
      payload.file.buffer,
    );

    // CREATE IMAGE URL
    const imageUrl = `${payload.bucket}/${fileName}`;

    return {
      imageUrl,
      message: 'File written successfully',
      etag: file.etag,
    };
  }

  async removeFile(payload: RemoveFileRequest): Promise<RemoveFileResponse> {
    await this.minioClient.removeObject(
      payload.fileName.split('/')[0],
      payload.fileName.split('/')[1],
    );

    return {
      message: 'File removed successfully',
    };
  }
}
