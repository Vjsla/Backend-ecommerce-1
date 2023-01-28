// import
const { array } = require('joi');
const { prods } = require('../models');
const db = require('../models');

// create main model
const Prod = db.prods;
const Detail = db.details;
const Review = db.reviews;

// main work

// 1. create Products
const addProd = async (req, res) => {
    try{
        let info =  {
            title: req.body.title,
            description: req.body.description,
        };
            const prod = await Prod.create(info);
            res.status(200).send(prod);
        }
        catch(err) {
            console.log(err);
            res.status(500).send({message: 'something went wrong : { ' + err + ' }'});
        };
};

// 2. create Detail
const addDetails = async (req, res) => {
    try{
        let data = {
            detail: req.body.detail,
            prod_id: req.body.prod_id
        };
        const detail = await Detail.create(data);
        res.status(200).send(detail);
        } 
        catch(err) {
            console.log(err);
            res.status(500).send({message: 'something went wrong : { ' + err + ' }'});
        };
};

// 3. create reviews
const addReviews = async (req, res) => {
    try{
        let data = {
            review: req.body.review,
            prod_id: req.body.prod_id
        };
        const review = await Review.create(data);
        res.status(200).send(review);
    } 
        catch(err) {
            console.log(err);
            res.status(500).send({message: 'something went wrong : { ' + err + ' }'});
        };
};

// 4. get single Product
const getProd = async  (req, res) => {
    let id = req.params.id;
    let prod = await Prod.findOne(
        { where : { id: id}, 
        attributes : {
            exclude : [
                "id",
        ]
    },
    });

    res.status(200).send(prod);
};

// 5. get all products
const getProducts = async (req, res) => {
    try {
        const prod = await Prod.findAll({
            attributes : { 
            exclude: [
                'createdAt',
                'updatedAt',
            ]},
            
            });
            res.status(200).send(prod)
            } catch (error) {
                console.log(err);
                    res.status(500).send({message: 'something went wrong : { ' + err + ' }'});
                    };
            };

// 6. connect one to many relations Product and Detail
const getProductDetail = async ( req, res ) => {
    try {
        let id = req.params.id;

        const data = await Prod.findAll({
            include: [{
                model: Detail,
                attributes: {exclude : [
                    'id',
                    'prod_id',
                    'createdAt',
                    'updatedAt',
                ]},
                as: 'Product_Details'
            }],
            attributes : {exclude: [
                'createdAt',
                'updatedAt'
            ]},
            where: { id : id}
        })
        res.status(200).send(data);

        } 
        catch(err) {
            console.log(err);
        res.status(500).send({message: 'something went wrong : { ' + err + ' }'});
        };
};

// 7. get all products + details
const getProdDetail = async (req, res) => {
    try {
        const data = await Prod.findAll({
            include: [{
                model: Detail,
                attributes: {exclude : [
                    'id',
                    'prod_id',
                    'createdAt',
                    'updatedAt',
                ]},
                as: 'Product_Details'
            }],
            order : [
                ['id', 'ASC']
            ],
            attributes : {exclude: [
                'createdAt',
                'updatedAt',
                
            ]},
        })

        res.status(200).send(data);
        
        } 
        catch(err) {
            console.log(err);
        res.status(500).send({message: 'something went wrong : { ' + err + ' }'});
        };
};


// 8. get all products + reviews
const getProdReview = async (req, res) => {
    try {
        const data = await Prod.findAll({
            include: [{
                model: Review,
                attributes: {exclude : [
                    'id',
                    'prod_id'
                ]},
                as: 'Product_Reviews'
            }],
            order : [
                ['id', 'ASC']
            ],
            attributes : {exclude: [
                'createdAt',
                'updatedAt',
                
            ]},
        })

        res.status(200).send(data);
        
        } 
        catch(err) {
            console.log(err);
        res.status(500).send({message: 'something went wrong : {' + err + ' }'});
        };
};

// 9. connect one to many relations Product and Detail
const getProductReview = async ( req, res ) => {
    try {
        let id = req.params.id;

        const data = await Prod.findAll({
            include: [{
                model: Review,
                attributes: {exclude : [
                    'id',
                    'prod_id'
                ]},
                as: 'Product_Reviews'
            }],
            attributes : {exclude: [
                'createdAt',
                'updatedAt'
            ]},
            where: { id : id}
        })
        res.status(200).send(data);

        } 
        catch(err) {
            console.log(err);
        res.status(500).send({message: 'something went wrong : {' + err + ' }'});
        };
};

// 10. update Product
const updateProd = async  (req, res) => {
    try{
        let id = req.params.id;
            await Prod.update(req.body, { where : { id : id }});
        const prod = await Prod.findOne({ where : { id: id }});
            res.status(200).send(prod);
        }
        catch(err) {
            console.log(err);
            res.status(500).send({message: 'something went wrong : {' + err + ' }'});
        };
};

// 11. delete Product
const deleteProd = async  (req, res) => {
    let id = req.params.id;
    await Prod.destroy({ where : { id: id }});
    res.status(200).send(`Product id ${id} are deleted !`);
};


module.exports = {
    addProd,
    addDetails,
    addReviews,
    getProducts,
    getProd,
    getProductDetail,
    getProdDetail,
    getProdReview,
    getProductReview,
    updateProd,
    deleteProd,
};