const supertest = require('supertest')
const server = require('../server')
const db = require('../data/config')

beforeEach(async () => {
    await db.seed.run()
})

afterAll(async () => {
    await db.destroy() // closes the database connection
})

describe('users integration tests', () => {
    it('gets a list of users', async () => {
        const res = await supertest(server).get('/users/list/')
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe('application/json')
        expect(res.body.length).toBeGreaterThanOrEqual(4)
        expect(res.body[0].id).toBe(1)
        expect(res.body[0].username).toBe('Dwaine')
    })

    it('registers a user', async () => {
        const res = await supertest(server)
            .post('/users/register')
            .send({
                username: "user187",
                password: "password187",
                email: "email187@email.com",
            })
        expect(res.statusCode).toBe(201)
        expect(res.type).toBe('application/json')
        expect(res.body.message).toBe('Welcome, user187')
    })

    it('returns a 409 if username is taken', async () => {
        const res = await supertest(server)
            .post('/users/register')
            .send({
                username: "Dwaine",
                password: "password",
                email: "email@email.com",
            })
        expect(res.statusCode).toBe(409)
        expect(res.type).toBe('application/json')
        expect(res.body.message).toBe('username taken')
    })

    it('makes sure the user registers with a email', async () => {
        const res = await supertest(server)
            .post('/users/register')
            .send({
                username: "user187",
                password: "password187",
            })
        expect(res.statusCode).toBe(409)
        expect(res.type).toBe('application/json')
        expect(res.body.message).toBe('username, password, and email required')
    })

    it('updates a users information', async () => {
        const res = await supertest(server)
            .put('/users/5')
            .send({
                username: "testUser",
                password: "abc123",
                email: "email1@email.com",
            })
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe('application/json')
        expect(res.body.message).toBe('Updated, testUser')
    })
})