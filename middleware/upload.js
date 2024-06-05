import multer from "multer";
import path from 'path';

const tempDir = path.resolve('tmp');

const storage = multer.diskStorage({
	destination: tempDir,
	filename: (req, file, callback) => {
		const {_id} = req.user;
		const ext = path.extname(file.originalname);
		const filename = `${_id}_avatar${ext}`;
		callback(null, filename);
	},
});

const upload = multer({
	storage
});

export const uploadAvatar = upload.single('avatar');
