const request = require('supertest');
const { expect } = require('chai');
const app = require('../app'); // Adjust the path based on where `app.js` is located

describe('Express Application', () => {

    // Test: Homepage rendering
    it('GET / should render the index page', (done) => {
        request(app)
            .get('/')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.text).to.include('<!DOCTYPE html>'); // Basic HTML structure
                done();
            });
    });

    // Test: Login endpoint
    it('POST /logpass should handle login with valid credentials', (done) => {
        request(app)
            .post('/logpass')
            .send({
                emails: 'test@example.com',
                password: 'testpassword'
            })
            .expect(302) // Redirect status
            .end((err, res) => {
                if (err) return done(err);
                expect(res.headers.location).to.include('/adminindex');
                done();
            });
    });

    // Test: Admin page access
    it('GET /adminindex should redirect to login if not logged in', (done) => {
        request(app)
            .get('/adminindex')
            .expect(302) // Redirect status
            .end((err, res) => {
                if (err) return done(err);
                expect(res.headers.location).to.include('/login');
                done();
            });
    });

    // Test: Image upload error handling
    it('POST /adminindex should return an error if no file is uploaded', (done) => {
        request(app)
            .post('/adminindex')
            .expect(200) // Ensure the page renders
            .end((err, res) => {
                if (err) return done(err);
                expect(res.text).to.include('No file selected!');
                done();
            });
    });

    // Test: Logout
    it('GET /logout should clear the session and cookies', (done) => {
        request(app)
            .get('/logout')
            .expect(302) // Redirect status
            .end((err, res) => {
                if (err) return done(err);
                expect(res.headers.location).to.equal('/');
                done();
            });
    });
});
