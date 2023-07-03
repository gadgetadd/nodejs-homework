const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app')
const { DB_HOST } = process.env;


describe('test login controller', () => {
    beforeAll(async () => {
        await mongoose.connect(DB_HOST)
    });
    afterAll(async () => {
        await mongoose.connection.close()
    });

    test("login", async () => {
        const res = await request(app)
            .post('/api/users/login')
            .send({
                "email": "example@example.com",
                "password": "examplepassword"
            });
        expect(res.statusCode).toBe(200);
        expect(res.body.token).toMatch(/^[\w-]+\.[\w-]+\.[\w-]+$/);
        expect(res.body.user).toEqual(expect.objectContaining({
            email: expect.any(String),
            subscription: expect.any(String)
        }))
    })
})

