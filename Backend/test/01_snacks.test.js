process.env.NODE_ENV = "test";
process.env.PORT = 3001;

const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../src/app");
const knex = require("../db/knex");


chai.use(chaiHttp);

describe("Snacks", () => {
  before("Clear the database...", (done) => {
    knex.migrate.rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex.seed.run())
    .then(() => done())
  });

  after((done) => {
    knex.destroy()
    .then(() => done())
  })

  describe("GET all", function(){
    before(function(done){
      chai.request(server)
        .get('/auth/token')
        .send({username: 'abs', password:'sdf'})
        .end((err, res) => {
          this.token = 'khsdflkjsdflksdlkjsdf'
          done()
        })
    })

    it("should return an array", function(done){
      console.log(this.token)
      chai.request(server)
        .get("/api/snacks/")
        .set('Authorization', `Bearer: ${this.token}`)
        .end((err, res) => {
          const { body, status } = res;
          assert.equal(status, 200)

          done();
        });
    });
  });
});
