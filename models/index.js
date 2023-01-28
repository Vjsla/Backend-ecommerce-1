const dbConfig = require('../config/dbConfig.js');

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,{
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle

        }
    }
);

sequelize.authenticate()
.then(() => {
    console.log('connecting...');
})
.catch(err => {
    console.log('Error' + err);
});

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.prods = require('./productModel.js')(sequelize, DataTypes);
db.details = require('./detailModel.js')(sequelize, DataTypes);
db.reviews = require('./reviewsModel.js')(sequelize, DataTypes);

db.sequelize.sync({ force: false})
.then(() => {
    console.log('yes, re-sync done');
});


// 1. One to Many Relationship || detail to prods
db.prods.hasMany(db.details, {
    foreignKey: 'prod_id',
    as: 'Product_Details'
});

db.details.belongsTo(db.prods, {
    foreignKey: 'prod_id',
    as: 'product'
});

// 2. One to Many Relationship || reviews to prods
db.prods.hasMany(db.reviews, {
    foreignKey: 'prod_id',
    as: 'Product_Reviews'
});

db.reviews.belongsTo(db.prods, {
    foreignKey: 'prod_id',
    as: 'product'
});

module.exports = db;