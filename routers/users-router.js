const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../data/config');

const router = require('express').Router();

router.post('/register', async (req, res, next) => {
  try {
		const { username, password, email } = req.body
    const user = await db('users').where({username}).first()

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

		res.status(201).json({message:"User Created Successfully"})
	} catch(err) {
		next(err)
	}
})

router.post('/login', async (req, res, next) => {
  try {
		const { username, password } = req.body
		const user = await db('users').where({  username  }).first()
		
    const passwordValid = await bcrypt.compare(password, user.password)
    
    if (!username || !password) {
      return res.status(409).json({
				message: "username and password required",
			})
    }

		if (!user || !passwordValid) {
			return res.status(401).json({
				message: "invalid credentials",
			})
		}
    
    const token = jwt.sign({
      username: user.username,
      password: user.password,
		}, process.env.JWT_SECRET)
        
    res.cookie('token', token)

		res.json({
			message: `welcome, ${user.username}`,
		})
	} catch(err) {
		next(err)
	}
})

module.exports = router
