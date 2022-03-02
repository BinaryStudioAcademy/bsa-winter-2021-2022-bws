import { File } from './bs-object-upload-payload.type';

type UploadPayload = {
  token: string;
  file: File;
  id: string;
};

export { type UploadPayload };
