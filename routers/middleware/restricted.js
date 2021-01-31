const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.token
        if (!token) {
            console.log('token required')
            return res.status(401).json({message: 'token required'})
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log('token invalid')
                return res.status(401).json({message: 'token invalid'})
            }
            
            req.token = decoded
            next()
        })
    } catch(err) {
    next(err)
    }
};
