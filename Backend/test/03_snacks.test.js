process.env.NODE_ENV = "test";
process.env.PORT = 3001;

const chai = require("chai");
const chaiHttp = require("chai-http");

const assert = chai.assert;

const server = require("../src/app");
const snacks = require("../db/data/snacks.json");
const { reseedDatabase, killDatabase } = require("./test-utilities");

chai.use(chaiHttp);

describe("Snacks", () => {
  before(done => {
    chai.request(server)
      .post('/auth/login')
      .send({
        email: 'nolan.hellyer@gmail.com',
        password:'password'
      })
      .end((err, res) => {
        this.token = res.body.token;

        done();
      });
  });
  // before("Restart the database", reseedDatabase);

  describe("GET all", function() {

    before(done => {
      chai.request(server)
        .post('/auth/login')
        .send({
          email: 'nolan.hellyer@gmail.com',
          password:'password'
        })
        .end((err, res) => {
          // const { body } = res;
          this.token = res.body.token;

          done();
        });
    });

    it("should return a status of 200", done => {
      chai.request(server)
        .get("/api/snacks")
        .set("Authorization", "Bearer " + this.token)
        .end((err, res) => {
          const { status } = res;
          assert.isNull(err);
          assert.equal(status, 200);

          done();
        });
    });

    it("should return data as an array", done => {
      chai.request(server)
        .get("/api/snacks")
        .set("Authorization", "Bearer " + this.token)
        .end((err, res) => {
          const { body } = res;
          assert.isNull(err);
          assert.isArray(body);

          done();
        });
    });

    it("should return a status of 401 without a valid token", done => {
      chai.request(server)
        .get("/api/snacks")
        .set("Authorization", "Bearer: BAD_TOKEN")
        .end((err, res) => {
          const { status } = res;
          assert.isNull(err);
          assert.equal(status, 401);

          done();
        });
    });
  });

    describe("GET one", () => {
      before(done => {
        chai.request(server)
        .post("/auth/login")
        .send({
          email: "nolan.hellyer@gmail.com",
          password: "password"
        })
        .end((err, res) => {
          const { body: { token }} = res;

          this.token = token;

          console.log(token);

          done();
        });
      });

      it("should return a status of 200", done => {
        const snackId = 1;

        chai.request(server)
          .get("/api/snacks/" + snackId)
          .set("Authorization", "Bearer" + this.token)
          .end((err, res) => {
            const { status } = res;

            console.log(this.token);

            assert.equal(status, 200);

            done();
          });
      });

      it("should return an object representing the correct snack", done => {
        const snackId = 1;

        chai.request(server)
          .get("/api/snacks/" + snackId)
          .end((err, res) => {
            const { body } = res;
            const expected = { id: snackId, ...snacks };

            assert.deepEqual(body, expected);

            done();
          });
      });
    });
});
