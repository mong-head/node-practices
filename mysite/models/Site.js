const { Sequelize, DataTypes } = require('sequelize');

module.exports = function(sequelize){
    // mapping
    const Site = sequelize.define('Site', {
        title: {
            field: 'title',
            type: DataTypes.STRING(50),
            allowNull: false
        },
        welcome: {
            field: 'welcome',
            type: DataTypes.STRING(200),
            allowNull: false
        },
        image: {
            field: 'image',
            type: DataTypes.STRING(200),
            allowNull: false
        },
        description: {
            field: 'description',
            type: DataTypes.TEXT,
            allowNull: false
        },
    },{
        underscored: true,
        freezeTableName: true,
        timestamps: true,
        createdAt: false,
        updatedAt: false,
        tableName: 'site'
    })
    Site.removeAttribute('id');
    return Site;
}
