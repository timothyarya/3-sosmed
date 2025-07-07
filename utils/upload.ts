import multer from "multer";

export default multer({
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});
