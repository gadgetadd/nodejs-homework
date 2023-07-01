const { Contact } = require('../../models/contact');


const updateStatusContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
    if (!result) {
        res.status(404);
        throw new Error("Not found");
    };
    res.json(result);
};

module.exports = updateStatusContact;
