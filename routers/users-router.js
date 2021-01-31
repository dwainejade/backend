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
            password: await bcrypt.hash(password, 10),
            email
        })

        const createdUser = await db('users').where({ username }).first()

        const payload = {
            userId: createdUser.id,
            username: createdUser.username,
            email: createdUser.email
        }
        const token = jwt.sign({ payload }, process.env.JWT_SECRET)

        res.status(201).json({
            message: `Welcome, ${createdUser.username}`,
            token,
            payload
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
        const payload = {
            userId: user.id,
            username: user.username,
            email: user.email
        }

        const token = jwt.sign({ payload }, process.env.JWT_SECRET)

        res.json({
            message: `Welcome, ${user.username}`,
            token,
            payload
        })
    } catch (err) {
        next(err)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const { username, password, email } = req.body
        const user = await db('users').where({ id }).first()

        if (!username || !password || !email) {
            return res.status(409).json({
                message: "username, password, and email required",
            })
        }

        if (!user) {
            return res.status(409).json({
                message: "This user does not exist",
            })
        }

        await db('users').where({ id }).update({
            username,
            password: await bcrypt.hash(password, 14),
            email
        })

        const updatedUser = await db('users').where({ username }).first()

        const token = jwt.sign({
            username: updatedUser.username,
            password: updatedUser.password,
        }, process.env.JWT_SECRET)
        
        res.status(200).json({
            message: `Updated, ${updatedUser.username}`,
            token
        })
    } catch (err) {
        next(err)
    }
})

module.exports = router
