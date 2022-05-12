const {User} = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('../helper/jwt')

module.exports = class {
static async createMember (req, res, next) {
    try {
        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            role:"member",
        })
        res.status(200).send({
            status: 200,
            message: 'Berhasil Registrasi Member!',
            data: user 
        })
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}

static async createAdmin (req, res, next) {
    try {
        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            role:"admin",
        })
        res.status(200).send({
            status: 200,
            message: 'Data Admin Ditambahkan!',
            data: user 
        })
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}

static async login (req, res, next) {
        try {
            const user = await User.findOne({where: {email: req.body.email}})
            if (!user) {
               res.status(404).send({
                status: 404,
                message: 'User not found!',
               }) 
            }

            const isValidPassword = await bcrypt.compare(req.body.password, user.password)

            if (!isValidPassword) {
                res.status(404).send({
                    status: 400,
                    message: 'Email and password not match!',
                   }) 
            }
            const token = jwt.generateToken({email: user.email, password: user.password})
            const secureUser = user.dataValues
            delete secureUser.password

            res.status(200).send({
                status: 200,
                message: 'User found!',
                data: {
                    user: secureUser,
                    token: token
                }
               }) 
        } catch (error) {
            console.log(error);
            res.status(500).send(error)
        }
}

static async currentUser (req, res, next) {
    try{
        res.status(200).send({
            status: 200,
            message: 'Data User Ditemukan!',
            data: req.userlogin
        })
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}
  
  
}