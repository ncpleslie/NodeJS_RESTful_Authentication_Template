const expect = require('chai').expect;
const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../src/middleware/is-auth');

const res = {};
const next = () => {};

describe('Auth Middleware', () => {
    it('should throw an error if no auth header is present', () => {
        // Arrange
        const req = {
            get: () => {
                return null;
            }
        };

        const errorMsg = 'Not authenticated';
        // Act
        const authMW = authMiddleware.bind(this, req, res, next);
        // Assert
        expect(authMW).to.throw(errorMsg);
    });

    it('should throw error if auth header is one string', () => {
        // Arrange
        const req = {
            get: () => {
                return 'abc';
            }
        };
        // Act
        const authMW = authMiddleware.bind(this, req, res, next);
        // Assert
        expect(authMW).to.throw();
    })

    it('should have a userId after decoding the token', () => {
        // Arrange
        const req = {
            get: () => {
                return 'Bearer testCodeHere';
            }
        };
        const userId = 'abc';

        sinon.stub(jwt, 'verify');
        jwt.verify.returns({
            userId: userId
        });
        // Act
        authMiddleware(req, res, next);
        // Assert
        expect(req).to.have.property('userId');
        expect(req).to.have.property('userId', userId);
        expect(jwt.verify.called).to.be.true;
        // Return stub
        jwt.verify.restore();
    })

    it('should throw an error if jwt fails to verify', () => {
        // Arrange
        const errorMsg = 'Not authenticated';
        const req = {
            get: () => {
                return 'Bearer testCodeHere';
            }
        };
        sinon.stub(jwt, 'verify');
        jwt.verify.returns();
        // Act
        const authMW = authMiddleware.bind(this, req, res, next);
        // Assert
        expect(authMW).to.throw(errorMsg);
        // Return stub
        jwt.verify.restore();
    })
})