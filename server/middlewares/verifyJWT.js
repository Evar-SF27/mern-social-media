const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.headers.Authorization
        if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401)
        const token = authHeader.split(' ')[1]
        jwt.verify(
            token,
            process.env.JWT_SECRET_KEY,
            (err, decoded) => {
                if (err) return res.sendStatus(403)
                req.user = decoded.id
                next()
            }
        )
    } catch (err) {
        res.status(500).json({ "message": err.message })
    }
}

module.exports = verifyToken