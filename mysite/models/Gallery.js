const { Sequelize, DataTypes } = require('sequelize');

module.exports = function(sequelize){
    // mapping
    return sequelize.define('Gallery', {
        no: {
            field: 'no',
            type: DataTypes.BIGINT(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        comment: {
            field: 'comment',
            type: DataTypes.STRING(200),
            allowNull: false
        },
        url: {
            field: 'url',
            type: DataTypes.STRING(200),
            allowNull: false
        }
    },{
        underscored: true,
        freezeTableName: true,
        timestamps: true,
        createdAt: false,
        updatedAt: false,
        tableName: 'gallery'
    });
}
