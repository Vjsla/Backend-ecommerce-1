const db = require('../models');

// model
const Review = db.reviews;

// 1. get all reviews
const getAllReviews = async (req, res) => {
    const review = await Review.findAll({});
    res.status(200).send(review);
};

// 2. update review
const updateReview = async  (req, res) => {
    try{
        let id = req.params.id;
            await Review.update(req.body, { where : { id : id }});
        const review = await Review.findOne({ where : { id: id }});
            res.status(200).send(review);
        }
        catch(err) {
            console.log(err);
            res.status(500).send({message: 'Review not found'});
        };
};

// 3. delete Review
const deleteReview = async  (req, res) => {
    let id = req.params.id;
    await Review.destroy({ where : { id: id }});
    res.status(200).send(`Review id ${id} are deleted !`);
};

module.exports = {
    getAllReviews,
    updateReview,
    deleteReview,
};