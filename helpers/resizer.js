import Jimp from 'jimp';

const resizer = async (path, size) => {
  const img = await Jimp.read(path);
  await img.resize(size.w, size.h).writeAsync(path);
};

export default resizer;
