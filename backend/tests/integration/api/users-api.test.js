const request = require('supertest');
const app = require('../../../app');
var db = require('../../../dbContext');

describe('Test User API', () => {

    var user = {
        name: "test",
        email: "test@test.test",
        password: "test"
    }
    beforeAll(() => {
        return new Promise(resolve => {
            db.connect('mongodb://localhost:27017', 'authFlow-test', function (err) {
                if (err) {
                    console.log('Unable to connect to Mongo.');
                    reject();
                } else {
                    console.log('Mongo connected');
                    resolve();
                }
            });
        });
    });

    it('it should register a user', async () => {
        return request(app)
            .post('/users/register')
            .send(user)
            .then((response) => {
                expect(response.statusCode).toEqual(200);
                expect(response.body).toBeDefined();
                expect(response.body).toHaveProperty('token');
            });
    });

    it('it should failed register a user cause user already exist', async () => {
        return request(app)
            .post('/users/register')
            .send(user)
            .then((response) => {
                expect(response.statusCode).toEqual(500);
            });
    });


    it('should log a user', async () => {
        delete user.name;

        return request(app)
            .post('/users/login')
            .send(user)
            .then((response) => {
                expect(response.statusCode).toEqual(200);
                expect(response.body).toBeDefined();
                expect(response.body).toHaveProperty('token');
            });
    });


    afterAll(() => {
        var collection = db.get().collection('users');
        collection.drop()
        db.disconnect();
    });
});