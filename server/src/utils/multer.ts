import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "./src/uploads/profileImages");
  },
  filename: (_, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({
  storage: storage,
});
