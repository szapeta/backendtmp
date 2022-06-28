import request from "supertest";
import app from "../index.js";

describe("TEST: Iniciar sesion", () => {
  const data = {
    user: "t@gmail.com",
    pass: "fff",
  };
  const data2 = {
    user: "malo",
    pass: "fff",
  };
  test("200 - Success", async () => {
    const response = await request(app).post("/login").send(data);
    expect(response.statusCode).toBe(200);
  });
  test("id < -1, usaurio existente", async () => {
    const response = await request(app).post("/login").send(data);
    expect(response.body[0].iduser).toBeGreaterThan(-1);
  });
  test("id = -1, usuario no existe", async () => {
    const response = await request(app).post("/login").send(data2);
    expect(response.body[0].iduser).toBeGreaterThan(-1);
  });
});

describe("TEST: Registro usuario turista", () => {
  const data = {
    name: "Pruebas Unitarias Turista",
    fechanac: "2022-05-06",
    email: "pruebas@turista.com",
    password: "fff",
    rol: 1,
  };
  test("id < -1, usaurio existente", async () => {
    const response = await request(app).post("/newuser").send(data);
    console.log(response.body[0]);
    expect(response.body[0].iduser).toBeGreaterThan(-1);
  });
  test("id = -1, usaurio ya existente", async () => {
    const response = await request(app).post("/newuser").send(data);
    expect(response.body[0].iduser).toBe(-1);
  });
  test("200 - Success", async () => {
    const response = await request(app).post("/newuser").send(data);
    expect(response.statusCode).toBe(200);
  });
});

describe("TEST: Registro usuario servicio", () => {
  const data = {
    name: "Pruebas Unitarias Servicio",
    fechanac: "2022-05-06",
    email: "pruebas@servicio.com",
    password: "fff",
    rol: 2,
  };
  test("id < -1, usaurio existente", async () => {
    const response = await request(app).post("/newuser").send(data);
    console.log(response.body[0]);
    expect(response.body[0].iduser).toBeGreaterThan(-1);
  });
  test("id = -1, usaurio ya existente", async () => {
    const response = await request(app).post("/newuser").send(data);
    expect(response.body[0].iduser).toBe(-1);
  });
  test("200 - Success", async () => {
    const response = await request(app).post("/newuser").send(data);
    expect(response.statusCode).toBe(200);
  });
});

describe("TEST: Buscador sericio hotel", () => {
  const data = {
    name: "Pruebas Unitarias Servicio",
    fechanac: "2022-05-06",
    email: "pruebas@servicio.com",
    password: "fff",
    rol: 2,
  };
  test("id < -1, usaurio existente", async () => {
    const response = await request(app).post("/newuser").send(data);
    console.log(response.body[0]);
    expect(response.body[0].iduser).toBeGreaterThan(-1);
  });
  test("id = -1, usaurio ya existente", async () => {
    const response = await request(app).post("/newuser").send(data);
    expect(response.body[0].iduser).toBe(-1);
  });
  test("200 - Success", async () => {
    const response = await request(app).post("/newuser").send(data);
    expect(response.statusCode).toBe(200);
  });
});