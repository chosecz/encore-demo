import { Bucket } from "encore.dev/storage/objects";

export const articlePhotosBucket = new Bucket("article-photos", {
  versioned: false,
  public: true,
});
