type ObjectUploadRequestDto = {
  id: string;
  name: string;
  sizeInBytes: number;
  createdAt: Date;
  spaceId: string;
  uploadedBy: string;
  awsObjectKey: string;
};

export { type ObjectUploadRequestDto };
