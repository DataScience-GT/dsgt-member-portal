import app from "../../app";
import supertest from "supertest";

import bearer from "../bearer";
require("dotenv").config();

describe("Test /api", () => {
  console.log("api_key", process.env.API_KEY);
  test("GET /api/", (done) => {
    supertest(app)
      .get("/api")
      .expect(200)
      .then((res) => {
        expect(res.text).toEqual("welcome to the api!");
        done();
      })
      .catch(done);
  });
  test("/api/auth without auth", (done) => {
    supertest(app)
      .get("/api/auth")
      .expect(400)
      .then((res) => {
        expect(res.body.ok).toBe(0);
        expect(res.body.error).toBe("missing authorization header");
        done();
      })
      .catch(done);
  });
  test("/api/auth with invalid auth", (done) => {
    supertest(app)
      .get("/api/auth")
      .set("Authorization", "Bearer sdkfl")
      .expect(401)
      .then((res) => {
        expect(res.body.ok).toBe(0);
        expect(res.body.error).toBe("invalid bearer token");
        done();
      })
      .catch(done);
  });
  test("/api/auth with auth", (done) => {
    supertest(app)
      .get("/api/auth")
      .set("Authorization", bearer)
      .expect(200)
      .then((res) => {
        expect(res.body.ok).toBe(1);
        done();
      })
      .catch(done);
  });
});
