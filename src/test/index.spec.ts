// import { expect } from "chai";
// import "mocha";

// // test/auth.spec.ts
// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import { describe, it, before, after } from 'mocha';
// import app from '../../index';

// chai.use(chaiHttp);
// const expect = chai.expect;

// describe('Authentication API', () => {
//   it('should register a user', (done) => {
//     chai
//       .request(app)
//       .post('/auth/register')
//       .send({ username: 'testuser', password: 'testpassword' })
//       .end((err, res) => {
//         expect(res).to.have.status(201);
//         expect(res.body).to.have.property('message').equal('User registered successfully');
//         expect(res.body).to.have.property('token');
//         done();
//       });
//   });

//   it('should login a user', (done) => {
//     chai
//       .request(app)
//       .post('/auth/login')
//       .send({ username: 'testuser', password: 'testpassword' })
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res.body).to.have.property('message').equal('Login successful');
//         expect(res.body).to.have.property('token');
//         done();
//       });
//   });
// });
