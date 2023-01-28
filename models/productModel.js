module.exports = (sequelize, DataTypes) => {
    const Prod = sequelize.define( "prod", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg : 'please fill the title'
                }
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Prod;
}


