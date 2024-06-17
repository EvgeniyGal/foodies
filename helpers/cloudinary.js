import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config';

const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
  secure: true,
});

const uploadImage = async (imagePath, folder, dimensions) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    folder,
    transformation: [
      {
        crop: 'auto',
        gravity: 'auto',
        width: dimensions.w,
        height: dimensions.h,
      },
    ],
  };

  try {
    const result = await cloudinary.uploader.upload(imagePath, options);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const extractPublicId = url => {
  const parts = url.split('/');
  const lastPart = parts.pop();
  const [publicId] = lastPart.split('.');
  return publicId;
};

const deleteImageByUrl = async (url, folder) => {
  const publicId = `${folder}/${extractPublicId(url)}`;
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export default { uploadImage, deleteImageByUrl };
