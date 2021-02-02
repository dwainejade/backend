const supertest = require("supertest")
const server = require("../server")
const db = require("../data/config")

beforeEach(async () => {
    await db.seed.run()
})

afterAll(async () => {
    await db.destroy()
})

describe("intergration for plant endpoints", () => {
    it("logs user in and gets list of plants", async () => {
        const res1 = await supertest(server).post("/users/login")
            .send({
                username: "Dwaine",
                password: "abc123"
            })
        expect(res1.statusCode).toBe(200)
        expect(res1.body.message).toBe('Welcome, Dwaine')
        expect(res1.body.token).toBeDefined()

        const res2 = await supertest(server).get("/plants")
            .set("token", res1.body.token)

        expect(res2.statusCode).toBe(200)
        expect(res2.body).toBeDefined()

    })

    it("logs user in and adds new plant", async () => {
        const res1 = await supertest(server).post("/users/login")
            .send({
                username: "Dwaine",
                password: "abc123"
            })

        const res2 = await supertest(server).post("/plants/new")
            .set("token", res1.body.token)
            .send({
                nickname: "test plant",
                species: "Testarossa",
                h2oFrequency: "daily",
                user_id: 1
            })

        expect(res2.statusCode).toBe(201)
        expect(res2.body.message).toBeDefined()
    })

    it("logs user in and updates a plant", async () => {
        const res1 = await supertest(server).post("/users/login")
            .send({
                username: "Dwaine",
                password: "abc123"
            })

        const res2 = await supertest(server).put("/plants/13")
            .set("token", res1.body.token)
            .send({
                nickname: "testPlant",
                species: "testarossa",
                h2oFrequency: "daily",
                user_id: 1
            })

        expect(res2.statusCode).toBe(201)
        expect(res2.body.message).toBe("Plant Updated Successfully")
        expect(res2.body.updatedPlant.nickname).toBe("testPlant")
        expect(res2.body.updatedPlant.species).toBe("testarossa")
        expect(res2.body.updatedPlant.h2oFrequency).toBe("daily")
    })

    it("logs user in and deletes a plant", async () => {
        const res1 = await supertest(server).post("/users/login")
            .send({
                username: "Dwaine",
                password: "abc123"
            })

        const res2 = await supertest(server).delete("/plants/14")
            .set("token", res1.body.token)

        expect(res2.statusCode).toBe(201)
        expect(res2.body.message).toBe("You have successfully deleted plant 14")
    })

})