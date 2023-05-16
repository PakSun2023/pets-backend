import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads/');
    },
    filename: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname);
        const uniqueSuffix = Date.now() + '-' + uuidv4();
        const filename = uniqueSuffix + fileExtension;
        req.body.petImage = filename
        cb(null, uniqueSuffix + fileExtension);
    },
});

const upload = multer({ storage });

export default upload;