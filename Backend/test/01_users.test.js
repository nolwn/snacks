process.env.NODE_ENV = "test";
process.env.PORT = 3001;

const chai = require("chai");
const chaiHttp = require("chai-http");

const assert = chai.assert;

const server = require("../src/app");
const users = require("../db/data/users.json");
const { restartDatabase, reseedDatabase } = require("./test-utilities");

chai.use(chaiHttp);

describe("Users", () => {
  before("restart the database", restartDatabase);

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
  
  describe("GET all users", () => {

    it("should return a status of 200", done => {
      chai.request(server)
        .get("/api/users")
        .set("Authorization", "Bearer " + this.token)
        .end((err, res) => {
          const { status } = res;

          assert.equal(status, 200);

          done();
        });
    });

    it("should return an array of 3 users", done => {
      chai.request(server)
        .get("/api/users")
        .end((err, res) => {
          const { body } = res;

          assert.isArray(body);
          assert.equal(body.length, 3);
          assert.property(body[0], "id");
          assert.property(body[0], "first_name");
          assert.property(body[0], "last_name");
          assert.property(body[0], "email");

          done();
        });
    });

    it("should not return passwords", done => {
      chai.request(server)
        .get("/api/users")
        .end((err, res) => {
          const { body } = res;

          assert.notProperty(body[0], "password");

          done();
        });
    });
  });

  describe("GET one", () => {
    it("should return a status of 200", done => {
      chai.request(server)
        .get("/api/users/1")
        .end((err, res) => {
          const { status } = res;

          assert.equal(status, 200);

          done();
        })

    });

    it("should return an object representing the correct user", done => {
      const userId = 1;
      chai.request(server)
        .get("/api/users/" + userId)
        .end((err, res) => {
          const { body } = res;
          const expected = { ...users[0] };
          expected.id = userId;
          delete expected.password;

          assert.isObject(body);
          assert.deepEqual(body, expected);

          assert.equal();

          done();
        });
    });

    it("should not return a password", done => {
      const userId = 1;
      chai.request(server)
        .get("/api/users/" + userId)
        .end((err, res) => {
          const { body } = res;

          assert.isObject(body);
          assert.isNotArray(body);
          assert.notProperty(body, "password");

          done();
        });
    });

    it("should return a status of 400 if the user does not exist", done => {
      userId = users.length + 1;
      chai.request(server)
        .get("/api/users/" + userId)
        .end((err, res) => {
          const { status } = res;

          assert.equal(status, 400);

          done();
        });
    });
  });

  describe("POST", () => {
    const newUser = {
      first_name: "John",
      last_name: "Doe",
      email: "John.Doe@gmail.com",
      password: "unknown"
    };

    it("should return a status of 201", done => {
      chai.request(server)
      .post("/api/users/create")
      .send(newUser)
      .end((err, res) => {
        const { status } = res;

        assert.equal(status, 201);

        done();
      });
    });

    it("should return the created user with id", done => {
      reseedDatabase()
        .then(() => {
          chai.request(server)
          .post("/api/users/create")
          .send(newUser)
          .end((err, res) => {
            const { body } = res;
            const expectedUser = { id: users.length + 1, ...newUser };

            delete expectedUser.password;

            assert.isNotArray(body, "the response should not be an array");
            assert.isObject(body, "the response should be an object");
            assert.deepEqual(body, expectedUser);

            done();
          });
        });
    });

    it("should add the user to the database", done => {
      const postRequest = () =>
        chai.request(server)
          .post("/api/users/create")
          .send(newUser);

      const getAllRequest = () =>
        chai.request(server)
          .get("/api/users");

      const sortUsers = (first, second) => first.id > second.id;

      reseedDatabase()
        .then(() => postRequest())
        .then(() => getAllRequest())
        .then(data => {
          const actual = data.body;
          const addedUser = { id: users.length + 1, ...newUser };

          delete addedUser.password;

          const expected = users.map(user => {
            delete user.password
            return user;
          });


          expected.push(addedUser);

          assert.deepEqual(actual.sort(sortUsers), expected.sort(sortUsers));

          done();
        })
        .catch(done);
    });
  });
});
