const db = require('../data/config');

const router = require('express').Router();

router.get('/', async (req, res, next) => {
    try {
        const plants = await db('plants')
        res.status(200).json(plants)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const plant = await db('plants').where('id', id).first()
        if (!plant) {
            return res.status(409).json({
                message: "Plant does not exist in database",
            })
        }

        res.status(200).json(plant)
    } catch (err) {
        next(err)
    }
})

router.get('/user/:id', async (req, res, next) => {
    try {
        const plants = await db('plants')
            .where('plants.user_id', req.params.id)
            .select('*')
        res.status(200).json(plants)
    } catch (err) {
        next(err)
    }
})

router.post('/new', async (req, res, next) => {
    try {
        const { nickname, species, h2oFrequency, details, last_watered, image, user_id } = req.body
        const nn = await db('plants').where({ nickname }).first()

        if (!nickname || !species || !h2oFrequency || !user_id) {
            return res.status(409).json({
                message: "nickname, species, h2oFrequency, and user_id required",
            })
        }

        if (nn) {
            return res.status(409).json({
                message: "Plant already in database",
            })
        }

        await db('plants').insert({
            nickname, 
            species, 
            h2oFrequency, 
            details,
            last_watered,
            image,
            user_id
        })

        res.status(201).json({ message: "Plant Created Successfully" })
    } catch (err) {
        next(err)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const { nickname, species, h2oFrequency, details, last_watered, image, user_id } = req.body
        const plant = await db('plants').where({ id }).first()

        if (!plant) {
            return res.status(409).json({
                message: "This plant does not exist in our database",
            })
        }

        await db('plants').where({ id }).update({
            nickname, 
            species, 
            h2oFrequency, 
            details,
            last_watered,
            image,
            user_id
        })

        const updatedPlant = await db('plants').where({ id }).first()

        res.status(201).json({updatedPlant, message: "Plant Updated Successfully"})
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        await db('plants').where({ id }).del()

        res.status(204).end()
    } catch (err) {
        next(err)
    }
})

module.exports = router
