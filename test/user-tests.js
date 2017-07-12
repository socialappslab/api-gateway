var should = require('should');
var assert = require('assert');
var request = require('supertest');
var express = require('express');
var dbutils = require('../lib/dbutils.js');

var app = require('../start');

describe('Routing', () => {
    var url = 'http://localhost:' + process.env.USNB_API_GATEWAY_PORT;

    before((done) => {
        dbutils.cleardb(() => {
            done();
        });
    });

    after((done) => {
        dbutils.cleardb(() => {
            done();
        });
    });

    //Create tests
    //
    describe('User', () => {
        it('should successfully create a new user', (done) => {
            var profile = {
                userId: 'user@universe.u',
                name: 'Test User'
            };
            request(url)
                .post('/users')
                .send(profile)
                .end((err, res) => {
                    if (err)
                        throw err;
                    res.should.have.property('status', 200);
                    done();
                });
        });

        it('should successfully create another new user', (done) => {
            var profile = {
                userId: 'test@elsewhere.e',
                name: 'Test User2'
            };
            request(url)
                .post('/users')
                .send(profile)
                .end((err, res) => {
                    if (err)
                        throw err;
                    res.should.have.property('status', 200);
                    done();
                });
        });

        it('should successfully create even another new user', (done) => {
            var profile = {
                userId: 'third@ss.com',
                name: 'Third One'
            };
            request(url)
                .post('/users')
                .send(profile)
                .end((err, res) => {
                    if (err)
                        throw err;
                    res.should.have.property('status', 200);
                    done();
                });
        });

        it('should not create a user with duplicate userId', (done) => {
            var profile = {
                userId: 'third@ss.com',
                name: 'Third One'
            };
            request(url)
                .post('/users')
                .send(profile)
                .end((err, res) => {
                    if (err)
                        throw err;
                    res.should.have.property('status', 500);
                    done();
                });
        });

        //Read tests
        //
        it('should return three users', (done) => {
            request(url)
                .get('/users')
                .end((err, res) => {
                    if (err)
                        throw err;
                    res.should.have.property('status', 200);
                    res.body.should.have.lengthOf(3);
                    usersArray = JSON.parse(res.text);
                    assert.equal(usersArray[0].userId, 'user@universe.u');
                    assert.equal(usersArray[1].userId, 'test@elsewhere.e');
                    assert.equal(usersArray[2].userId, 'third@ss.com');
                    done();
                });
        });
    });
});
