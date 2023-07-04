const Jimp = require("jimp");
const fs = require("fs/promises");
const path = require("path");

const avatarsDir = path.join(__dirname, '../', 'public', 'avatars');

const processImage = async (file, userID) => {
    const { path: tempImage, filename } = file;
    const [ext] = filename.split('.').reverse();
    const newImageName = `avatar-${userID}.${ext}`
    const publicImage = path.join(avatarsDir, newImageName);
    try {
        const image = await Jimp.read(tempImage);
        image.cover(250, 250).write(tempImage);
        await fs.rename(tempImage, publicImage);
    } catch {
        await fs.unlink(tempImage);
        throw new Error('Image processing error')
    };
    const publicLink = path.join('avatars', newImageName);
    return publicLink;
};

module.exports = processImage;