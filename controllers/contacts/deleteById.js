const { Contact } = require('../../models/contact');


const deleteById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
        res.status(404);
        throw new Error("Not found");
    };
    res.json({
        message: "contact deleted"
    })
};

module.exports = deleteById;

