const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//User Modeli
const User = require('../../models/user');

router.post('/register', (req, res) => {        //Kayıt olma operasyonu
    const { userName, password } = req.body;
    bcrypt.hash(password, 10).then(hash => {
        const user = {
            userName,
            password: hash
        }
        User.create(user).then(result => {
            res.send(result)
        })
    })
})

router.post('/authenticate', (req, res) => {   //Giriş yapma operasyonu
    const { userName, password } = req.body;
    User.findAll({ where: { userName: userName } }).then((result) => {
        if (result.length) {
            const user = result[0]
            bcrypt.compare(password, user.password).then((status) => {
                if (!status) {
                    res.json({
                        status,
                        message: "Authentication failed, wrong password"
                    })
                } else {
                    const payload = {
                        userName
                    };
                    const token = jwt.sign(payload, req.app.get('api_secret_key'), {
                        expiresIn: 120 //120 saniyelik token (2 dakika)
                    })
                    res.json({
                        status,
                        token,
                        message: "Authentication success"
                    })
                }
            })
        } else {
            res.json({
                status: false,
                message: 'Authentication failed, user not found.'
            })
        }
    })
})

module.exports = router