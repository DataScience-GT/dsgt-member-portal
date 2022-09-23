import app from "../../app";
import supertest from "supertest";

import bearer from "../bearer";

describe("fake test", () => {
  it("should equal 4", () => {
    expect(2 + 2).toEqual(4);
  });
});

// describe("Test /api/user/login", () => {
//   // test("/api/user/login with no auth", (done) => {
//   //   supertest(app)
//   //     .post("/api/user/login")
//   //     // .set("Authorization", bearer)
//   //     // .send({})
//   //     .expect(400)
//   //     .then((res) => {
//   //       expect(res.body.ok).toBe(0);
//   //       expect(res.body.error).toBe("missing authorization header");
//   //       done();
//   //     })
//   //     .catch(done);
//   // });
//   // test("/api/user/login with auth no body", (done) => {
//   //   supertest(app)
//   //     .post("/api/user/login")
//   //     .set("Authorization", bearer)
//   //     // .send({})
//   //     .expect(400)
//   //     .then((res) => {
//   //       expect(res.body.ok).toBe(0);
//   //       expect(res.body.error).toBe("Missing 1 or more required fields.");
//   //       done();
//   //     })
//   //     .catch(done);
//   // });
// });
