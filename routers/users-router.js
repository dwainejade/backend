const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../data/config');

const router = require('express').Router();

router.get('/list', async (req, res, next) => {
    try {
        const userList = await db('users')
        res.status(200).json(userList)
    } catch (err) {
        next(err)
    }
})

router.post('/register', async (req, res, next) => {
    try {
        const { username, password, email } = req.body
        const user = await db('users').where({ username }).first()

        if (!username || !password || !email) {
            return res.status(409).json({
                message: "username, password, and email required",
            })
        }

        if (user) {
            return res.status(409).json({
                message: "username taken",
            })
        }

        await db('users').insert({
            username,
            password: await bcrypt.hash(password, 14),
            email
        })

        const createdUser = await db('users').where({ username }).first()

        const token = jwt.sign({
            username: createdUser.username,
            password: createdUser.password,
        }, process.env.JWT_SECRET)

        res.cookie('token', token)

        res.status(201).json({
            message: `Welcome, ${createdUser.username}`,
            token
        })
    } catch (err) {
        next(err)
    }
})

router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await db('users').where({ username }).first()

        const passwordValid = await bcrypt.compare(password, user.password)

        if (!username || !password) {
            return res.status(409).json({
                message: "username and password required",
            })
        }

        if (!user || !passwordValid) {
            return res.status(401).json({
                message: "Invalid credentials",
            })
        }

        const token = jwt.sign({
            username: user.username,
            password: user.password,
        }, process.env.JWT_SECRET)

        res.cookie('token', token)

        res.json({
            message: `Welcome, ${user.username}`,
            token
        })
    } catch (err) {
        next(err)
    }
})

module.exports = router
