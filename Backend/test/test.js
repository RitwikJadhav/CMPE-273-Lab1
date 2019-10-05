var chai = require('chai');
var chaiHttp = require('chai-http');
var should = require('chai').should();
chai.use(chaiHttp);
var inputPassword = "123";
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync(inputPassword,salt);
var encPassword = hash;

var app = 'http://localhost:3001';


var assert = require('assert');
var expect = chai.expect;

describe('Grubhub Test Cases', function() {
    this.timeout(15000);
    it("Test Case 1 : Signup Owner", function(done) {

        const data = {
            "firstName" : "RitwikJ",
            "lastName" : "Jadhav",
            "email" : "a@b.com",
            "password" : "123",
            "restaurantName" : "abc",
            "restaurantZipCode" : "1233",
            "owner" : "Owner"
        }

        chai.request(app)
        .post('/OwnerSignup')
        .send(data)
        .end(function(err,res) {
            expect(res).to.have.status(200);
            done();
        });
    })

    it("Test Case 2 : Item Add Page", function(done) {

        const data = {
            "itemName" : "Pizza",
            "itemDesc" : "Cheesy",
            "itemPrice" : "12",
            "itemSection" : "Lunch",
            "restaurantName" : "LA VIC"
        }

        chai.request(app)
        .post('/ItemAddPage')
        .send(data)
        .end(function(err,res) {
            expect(res).to.have.status(200);
            done();
        });
    })

    it("Test Case 3 : Section Add Page", function(done) {

        const data = {
            "sectionName" : "Dinner",
            "sectionDesc" : "Creamy",
            "restaurantName" : "LA VIC"
        }

        chai.request(app)
        .post('/SectionAddPage')
        .send(data)
        .end(function(err,res) {
            expect(res).to.have.status(200);
            done();
        });
    })

    it("Test Case 4 : Section Remove Page", function(done) {

        const data = {
            "itemToRemove" : "Dinner",
        }

        chai.request(app)
        .post('/ItemRemovePage')
        .send(data)
        .end(function(err,res) {
            expect(res).to.have.status(200);
            done();
        });
    })

    it("Test Case 5 : Search Page", function(done) {

        const data = {
            "searchItem" : "Pizza",
        }

        chai.request(app)
        .post('/SearchResults')
        .send(data)
        .end(function(err,res) {
            expect(res).to.have.status(200);
            done();
        });
    })
})