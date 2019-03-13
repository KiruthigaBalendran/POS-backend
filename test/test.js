'use strict';

const chai = require('chai');
const expect = require('chai').expect;
var should = chai.should();

chai.use(require('chai-http'));

const app = require('../server'); // Our app

describe('/GET orderList', function() {
  this.timeout(5000); // How long to wait for a response (ms)
  // GET - List all orders
  it('should return all orderlists', function() {
    return chai.request('http://localhost:8080')
      .get('/orderList')
      .then(function(res){
        res.should.have.status(200);
      })
  });

});