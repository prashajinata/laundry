const express = require ("express")
const md5 = require('md5')
const login = express()
login.use(express.json())
const jwt = require("jsonwebtoken")
const secretKey = "underpresser"

const models = require("../models/index")
const user = models.users;

login.post('/',async (request,response) => {
    let newLogin = {
        username : await request.body.username,
        password : md5( await request.body.password),
    }
    let dataUser = await user.findOne({
        where : newLogin
    });

    if(dataUser){
        let payload = JSON.stringify(dataUser)
        let token = jwt.sign(payload,secretKey)
        return response.json({
            logged: true,
            token: token,
            user: dataUser,
        })
    } else {
        return response.json({
            logged: false,
            message: `Invalid username or password`
        })
    }
})


const auth = (request, response, next) => {
    let header = request.headers.authorization
    
    
    let token = header && header.split(" ")[1]

    if(token == null){
        return response.status(401).json({
            message: `Unauthorized`
        })
    }else{
        let jwtHeader = {
            algorithm: "HS256"
        }

        jwt.verify(token, secretKey, jwtHeader, error => {
            if(error){
                return response.status(401).json({
                    message: `Invalid Token`
                })
            }else{
                next()
            }
        })
    }
}
 module.exports = { login, auth }
