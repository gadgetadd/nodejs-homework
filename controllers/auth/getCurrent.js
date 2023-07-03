const getCurrent = async (req, res) => {
    const { email, subscription, avatarURL } = req.user
    res.json({ email, avatarURL, subscription })
};

module.exports = getCurrent;
