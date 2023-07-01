const { Contact } = require('../../models/contact');

const getAll = async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 3, favorite } = req.query;
    const skip = (page - 1) * limit;
    const filter = { owner };
    if (favorite !== undefined) filter.favorite = favorite;
    const result = await Contact.find(filter, null, { skip, limit }).populate("owner", "name email");
    res.json(result);
};

module.exports = getAll;