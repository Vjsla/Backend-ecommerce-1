module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define( "review", {
        review: {
            type: DataTypes.STRING,
            allowNull: false
        },
        prod_id : {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    return Review;
}