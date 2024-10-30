export declare interface UploadFileRequest {
  file: Express.Multer.File;
  bucket: string;
}

export declare interface UploadFileResponse {
  message: string;
  imageUrl: string;
  etag: string
}
