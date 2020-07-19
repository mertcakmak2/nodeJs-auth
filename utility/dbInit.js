const product = require('../models/product');
const user = require('../models/user');

module.exports = {
    createDbTable:function(){
        product.sequelize.sync().then(result=>{
            console.log(result)
        }).catch();
        
        user.sequelize.sync().then(result=>{
            console.log(result)
        }).catch();
    }
}

