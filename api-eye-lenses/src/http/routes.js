const db = require('../services')

const routes = (server) => {
    server.post('/auth', async (req, res, next) => {
        // const { email, password } = JSON.parse(req.body)
        const { email, password } = req.params

        try {
            res.send(await db.auth().authenticate(email, password))
        } catch (error) {
            res.send(error)
        }

        next()
    })

    server.post('/user', async (req, res, next) => {
        const { email, password } = req.params
        
        try {
            res.send(await db.users().save(email, password))
        } catch (error) {
            res.send(error)
        }

        next()
    })

    server.get('/user-lens/:id', async (req, res, next) => {
        const userId = req.params.id

        try {
            res.send(await db.lenses().allByUserId(userId))
        } catch (error) {
            res.send(error)
        }

        next()
    })

    server.get('/lens', async (_req, res, next) => {
        try {
            res.send(await db.lenses().all())
        } catch (error) {
            res.send(error)
        }

        next()
    })

    server.get('/lens/:id', async (req, res, next) => {
        const lensId = req.params.id

        try {
            res.send(await db.lenses().getById(lensId))
        } catch (error) {
            res.send(error)
        }

        next()
    })

    server.post('/lens', async (req, res, next) => {
        const { name, duration, id_user } = req.params
        
        try {
            res.send(await db.lenses().save(name, duration, id_user))
        } catch (error) {
            res.send(error)
        }

        next()
    })

    server.put('/lens', async (req, res, next) => {
        const { id, name, duration } = req.params

        try {
            res.send(await db.lenses().update(id, name, duration))
        } catch (error) {
            res.send(error)
        }

        next()
    })

    server.del('/lens/:id', async (req, res, next) => {
        const { id } = req.params

        try {
            res.send(await db.lenses().del(id))
        } catch (error) {
            res.send(error)
        }

        next()
    })

    server.get('/', (_req, res, next) => {
        res.send('Server is running')
        next()
    })
}

module.exports = routes
