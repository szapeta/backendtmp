import request from "supertest";

import app from "../index"
///// unitario 
var {user, pass} = req.body;
/// test de registro 
describe("POST /login", () => {
  const data={user:'t@gmail.com',pass:'fff'}
  test("responde a 200 consultas ", async () => {
    const response = await request(app).post("/login").send(data);
    expect(response.statusCode).toBe(200);
  });

  test("id mayor a 0", async () => {
    const response = await request(app).post("/login").send(data);
    expect(response.body.idusuario).toBeGreaterThan(-1);
  });
});


module.exports = percentageOf;