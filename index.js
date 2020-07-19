const express = require('express');
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json({limit: '50mb'}));

//Config(secret key)
const config = require('./config')
app.set('api_secret_key', config.api_secret_key)

//verifyToken Middleware
const verifyToken = require('./middleware/verifyToken')

//Sequelize Connection
const initDb = require('./utility/dbInit')
initDb.createDbTable()

//Route's
const session = require('./routes/api/session')
const product = require('./routes/api/product')

//Api's
app.use('/', session)
// app.use('/api', verifyToken)
app.use('/api/product', verifyToken, product);

app.listen(5000, () => {
    console.log("Server workingg..")
})