const Sequelize = require('sequelize')

const sequelize = new Sequelize('sequelizedb', 'root', 'mertcakmak2', {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize