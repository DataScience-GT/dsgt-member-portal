import app from "../app";
import supertest from "supertest";
import assert from "assert";
import express, { Request, Response, NextFunction } from "express";

describe("Test /api", () => {
  it("GET /api", (done) => {
    supertest(app)
      .get("/api")
      .expect(200)
      .then((res) => {
        expect(res.text).toEqual("welcome to the api!");
        done();
      })
      .catch(done);
  });
});
