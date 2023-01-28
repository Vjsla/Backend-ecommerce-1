module.exports = (sequelize, DataTypes) => {
    const Detail = sequelize.define("detail", {
        detail:{
            type: DataTypes.STRING,
            allowNull: false
        },
        prod_id : {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return Detail;
};