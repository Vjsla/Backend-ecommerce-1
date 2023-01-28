const db = require('../models');

// model
const Detail = db.details;

// 1. get all details
const getAllDetail = async (req, res) => {
    const detail = await Detail.findAll({});
    res.status(200).send(detail);
};

// 2. update detail
const updateDetail = async  (req, res) => {
    try{
        let id = req.params.id;
            await Detail.update(req.body, { where : { id : id }});
        const detail = await Detail.findOne({ where : { id: id }});
            res.status(200).send(detail);
        }
        catch(err) {
            console.log(err);
            res.status(500).send({message: 'Something went wrong : {' + err + '}'});
        };
};

// 3. delete Detail
const deleteDetail = async  (req, res) => {
    let id = req.params.id;
    await Detail.destroy({ where : { id: id }});
    res.status(200).send(`Detail id ${id} are deleted !`);
};

module.exports = {
    getAllDetail,
    updateDetail,
    deleteDetail,
};