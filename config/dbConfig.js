module.exports = {
// config untuk database
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: '',
    DB: 'db_ecommerce',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}