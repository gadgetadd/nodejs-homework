const { User } = require('../../models/user');
const { processImage } = require('../../helpers')

const updateAvatar = async (req, res) => {
    const { _id } = req.user;
    if (!req.file) {
        res.status(400);
        throw new Error("No image for new avatar");
    }
    const avatarURL = await processImage(req.file, _id);
    const result = await User.findByIdAndUpdate(_id, { avatarURL }, { new: true });
    res.json({
        avatarURL: result.avatarURL,
    });
};

module.exports = updateAvatar;
