const request = require('supertest');
const app = require('../app');

let id;
let token;

test('POST /users', async () => {
    const body = {
        firstName: 'Mario',
        lastName: 'Bros',
        email: 'mario64@gmail.com',
        password: 'mario1234',
        phone: '123456789'
    };
    const res = await request(app).post('/users').send(body);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(body.firstName);
});

test('POST /users/login', async () => {
    const body = {
        email: 'mario64@gmail.com',
        password: 'mario1234',
    }
    const res = await request(app)
        .post(`/users/login`)
        .send(body);
    token = res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
});

test('GET /users', async () => {
    const res = await request(app)
    .get('/users')
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('PUT /users/:id', async () => {
    const body = { firstName: 'Mario Act' };
    const res = await request(app)
        .put(`/users/${id}`)
        .send(body)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName);
});

test('POST /users/login debe retornar credenciales incorrectas', async () => {
    const body = {
        email: 'incorrecto@gmail.com',
        password: 'incorrecto1234',
    }
    const res = await request(app)
        .post(`/users/login`)
        .send(body);
    expect(res.status).toBe(401);
});

test('DELETE /users/:id', async () => {
    const res = await request(app)
        .delete(`/users/${id}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});