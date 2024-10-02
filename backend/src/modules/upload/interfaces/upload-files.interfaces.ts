export declare interface UploadFilesRequest {
    file: [Express.Multer.File];
    destination: string;
  }

  export declare interface UploadFilesResponse {
    message: string;
    imageUrl: string;
  }