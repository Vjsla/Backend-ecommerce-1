// imported controller
const productController = require('../controllers/productsController');
const reviewController = require('../controllers/reviewController');
const detailController = require('../controllers/detailController');

// router
const router = require('express').Router();

// use router

// create
router.post('/products/add-product', productController.addProd);

router.post('/products/add-detail', productController.addDetails);

router.post('/products/add-reviews', productController.addReviews);


// read

//  product controller
    // view one Product
    router.get('/products/:id', productController.getProd);

    // view products
    router.get('/products/', productController.getProducts);

    // Product Details
    router.get('/details/',productController.getProdDetail);

    router.get('/products/product-detail/:id',productController.getProductDetail);
    
    // Product Reviews
    router.get('/reviews/', productController.getProdReview);
    
    router.get('/products/product-review/:id', productController.getProductReview);

// details controller
    // detail url and controller
    router.get('/details/details', detailController.getAllDetail);

// reviews controller
    // reviews url and controller
    router.get('/reviews/reviews', reviewController.getAllReviews);



// update

router.put('/products/:id', productController.updateProd);

router.put('/details/:id', detailController.updateDetail);

router.put('/reviews/:id', reviewController.updateReview);


// delete

router.delete('/product/:id', productController.deleteProd);

router.delete('/detail/:id', detailController.deleteDetail);

router.delete('/review/:id', reviewController.deleteReview);


module.exports = router;