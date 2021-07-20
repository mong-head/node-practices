const { Sequelize, DataTypes } = require('sequelize');

module.exports = function(sequelize){
    // mapping
    return sequelize.define('Board', {
        no: {
            field: 'no',
            type: DataTypes.BIGINT(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            field: 'title',
            type: DataTypes.STRING(200),
            allowNull: false
        },
        contents: {
            field: 'contents',
            type: DataTypes.TEXT,
            allowNull: false
        },
        reg_date: {
            field: 'reg_date',
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        hit: {
            field: 'hit',
            type: DataTypes.INTEGER,
            allowNull: false
        },
        group_no: {
            field: 'group_no',
            type: DataTypes.INTEGER,
            allowNull: false
        },
        order_no: {
            field: 'order_no',
            type: DataTypes.INTEGER,
            allowNull: false
        },
        depth: {
            field: 'depth',
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },{
        underscored: true,
        freezeTableName: true,
        timestamps: true,
        createdAt: false,
        updatedAt: false,
        tableName: 'board'
    });
}
