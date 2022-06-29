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
  test("id > -1, usaurio existente", async () => {
    const response = await request(app).post("/login").send(data);
    expect(response.body[0].iduser).toBeGreaterThan(-1);
  });
  test("id = -1, usuario no existe", async () => {
    const response = await request(app).post("/login").send(data2);
    expect(response.body[0].iduser).toBe(-1);
  });
});

describe("TEST: Registro usuario turista", () => {
  const data = {
    name: "Pruebas Unitarias Turista",
    fechanac: "2022-05-06",
    email: "pruebas@turista.com322",
    password: "fff",
    rol: 1,
  };
  test("id < -1, usaurio existente", async () => {
    const response = await request(app).post("/newuser").send(data);
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
    email: "pruebas@servicio.com3232",
    password: "fff",
    rol: 2,
  };
  const data2 = {
    name: "Pruebas Unitarias Servicio",
    fechanac: "2022-05-06",
    email: "pruebas@servicio.com",
    password: "fff",
    rol: 2,
  };
  test("id > -1, usaurio creado", async () => {
    const response = await request(app).post("/newuser").send(data);
    expect(response.body[0].iduser).toBeGreaterThan(-1);
  });
  test("id = -1, usaurio ya existente", async () => {
    const response = await request(app).post("/newuser").send(data2);
    expect(response.body[0].iduser).toBe(-1);
  });
  test("200 - Success", async () => {
    const response = await request(app).post("/newuser").send(data);
    expect(response.statusCode).toBe(200);
  });
});

describe("TEST: Crear calendario", () => {
  const data = {
    fecha_inicio : '2022-06-25', 
    fecha_fin : '2022-06-30', 
    id_user : 8, 
    id_habitacion : 6
  };
  const data2 = {
    fecha_inicio : '2022-06-25', 
    fecha_fin : '2022-06-30', 
    id_user : 8, 
    id_habitacion : 2000
  };
  test("id > 0, reserva creada", async () => {
    const response = await request(app).post("/addreservahotel").send(data);
    expect(response.body[0].idreservahotel).toBeGreaterThan(-1);
  });
  test("id = -1, no se pudo realizar la reserva", async () => {
    const response = await request(app).post("/addreservahotel").send(data2);
    expect(response.body[0].idreservahotel).toBe(-1);
  });
  test("200 - Success", async () => {
    const response = await request(app).post("/addreservahotel").send(data);
    expect(response.statusCode).toBe(200);
  });
});

describe("TEST: LIBRE", () => {
  const data = {
    id_usuario: 1,
  };
  const data2 = {
    id_usuario: 0,
  };
  test("id > 0, reseña obtenida", async () => {
    const response = await request(app).post("/getUsuario").send(data);
    expect(response.body[0].id_usuario).toBeGreaterThan(0);
  });
  test("id = -1, No existe la reseña", async () => {
    const response = await request(app).post("/getUsuario").send(data2);
    expect(response.body[0].id_usuario).toBe(-1);
  });
  test("200 - Success", async () => {
    const response = await request(app).post("/getUsuario").send(data);
    expect(response.statusCode).toBe(200);
  });
});

describe("TEST: Ingreso de automovil", () => {
  const data = {
    placa: "P123SAT2221",
    marca: 1,
    servicio: 2,
    modelo: "2022",
    precio: 100500,
    ciudad: 1,
  };
  test("id > -1, auto ingresado", async () => {
    const response = await request(app).post("/addAuto").send(data);
    expect(response.statusCode).toBe(200);
  });
  test("id = -1, auto ya existente", async () => {
    const response = await request(app).post("/addAuto").send(data);
    expect(response.body[0].idvehiculo).toBe(-1);
  });
  test("200 - Success", async () => {
    const response = await request(app).post("/addAuto").send(data);
    expect(response.statusCode).toBe(200);
  });
});

describe("TEST: Crear vuelo", () => {
  const data = {
    fecha: "2022-06-28",
    origen: "Guatemala",
    destino: "Mexico",
    catnida_asiento: 48,
    precio: 500,
    vuelta: 1,
    id_servicio: 10,
  };
  const data2 = {
    fecha: "2022-06-28",
    origen: "Guatemalas",
    destino: "Mexico",
    catnida_asiento: 48,
    precio: 500,
    vuelta: 1,
    id_servicio: 10,
  };
  test("id > -1, auto ingresado", async () => {
    const response = await request(app).post("/addVuelo").send(data);
    expect(response.body[0].id_vuelo).toBeGreaterThan(-1);
  });
  test("id = -1, auto ya existente", async () => {
    const response = await request(app).post("/addVuelo").send(data2);
    expect(response.body[0].id_vuelo).toBe(-1);
  });
  test("200 - Success", async () => {
    const response = await request(app).post("/addVuelo").send(data);
    expect(response.statusCode).toBe(200);
  });
});

describe("TEST: Registro Reseña", () => {
  const data = {
    comentario: "Agregada desde pruebas unitarias",
    user: 8,
    servicio: 10,
  };
  const data2 = {
    comentario: "Agregada desde pruebas unitarias",
    user: 8,
    servicio: 100,
  };
  test("id > 0, reseña creada", async () => {
    const response = await request(app).post("/addResena").send(data);
    expect(response.body[0].idresena).toBeGreaterThan(0);
  });
  test("id = -1, reseña ya existente", async () => {
    const response = await request(app).post("/addResena").send(data2);
    expect(response.body[0].idresena).toBe(-1);
  });
  test("200 - Success", async () => {
    const response = await request(app).post("/addResena").send(data);
    expect(response.statusCode).toBe(200);
  });
});

describe("TEST: Contratacion de Servicio Hotel", () => {
  const data = {
    fecha_inicio : '2022-06-25', 
    fecha_fin : '2022-06-30', 
    id_user : 8, 
    id_habitacion : 3
  };
  const data2 = {
    fecha_inicio : '2022-06-25', 
    fecha_fin : '2022-06-30', 
    id_user : 8, 
    id_habitacion : 2000
  };
  test("id > 0, reserva creada", async () => {
    const response = await request(app).post("/addreservahotel").send(data);
    expect(response.body[0].idreservahotel).toBeGreaterThan(-1);
  });
  test("id = -1, no se pudo realizar la reserva", async () => {
    const response = await request(app).post("/addreservahotel").send(data2);
    expect(response.body[0].idreservahotel).toBe(-1);
  });
  test("200 - Success", async () => {
    const response = await request(app).post("/addreservahotel").send(data);
    expect(response.statusCode).toBe(200);
  });
});

describe("TEST: Alquiler Auto", () => {
  const data = {
    fecha_inicio : '2022-06-25', 
    fecha_final : '2022-06-29', 
    id_user : 8, 
    placa : 'P123SAT1'
  };
  const data2 = {
    fecha_inicio : '2022-06-25', 
    fecha_final : '2022-06-29', 
    id_user : 8, 
    placa : 'P123SATS'
  };
  test("id > 0, alquiler creado", async () => {
    const response = await request(app).post("/addReservaAuto").send(data);
    expect(response.body[0].idrentaauto).toBeGreaterThan(0);
  });
  test("id = -1, no se pudo realizar el alquiler", async () => {
    const response = await request(app).post("/addReservaAuto").send(data2);
    expect(response.body[0].idrentaauto).toBe(-1);
  });
  test("200 - Success", async () => {
    const response = await request(app).post("/addReservaAuto").send(data);
    expect(response.statusCode).toBe(200);
  });
});

describe("TEST: Compra boleto avion", () => {
  const data = {
    cantida_asiento : 10, 
    id_user : 8, 
    id_servicio : 2
  };
  const data2 = {
    cantida_asiento : 10, 
    id_user : 8, 
    id_servicio : 100
  };
  test("id > 0, compra creada", async () => {
    const response = await request(app).post("/addReservaVuelo").send(data);
    expect(response.body[0].idreservavuelo).toBeGreaterThan(0);
  });
  test("id = -1, no se pudo realizar la compra", async () => {
    const response = await request(app).post("/addReservaVuelo").send(data2);
    expect(response.body[0].idreservavuelo).toBe(-1);
  });
  test("200 - Success", async () => {
    const response = await request(app).post("/addReservaVuelo").send(data);
    expect(response.statusCode).toBe(200);
  });
});

describe("TEST: Visualizar Reseña", () => {
  const data = {
    id_resena: 1,
  };
  const data2 = {
    id_resena: 0,
  };
  test("id > 0, reseña obtenida", async () => {
    const response = await request(app).post("/getResena").send(data);
    expect(response.body[0].id_resena).toBeGreaterThan(0);
  });
  test("id = -1, No existe la reseña", async () => {
    const response = await request(app).post("/getResena").send(data2);
    expect(response.body[0].id_resena).toBe(-1);
  });
  test("200 - Success", async () => {
    const response = await request(app).post("/getResena").send(data);
    expect(response.statusCode).toBe(200);
  });
});

describe("POST /listcomentarios", () => {
  const data = {
    user: 1,
  };
  test("200 - Success", async () => {
    const response = await request(app).post("/listcomentarios").send(data);
    expect(response.statusCode).toBe(200);
  });
});

describe("POST /addhabitacion", () => {
  const data = {
    No_habitacion : 0,
    Tipo : 'Simple',
    Precio : 100,
    Fecha : '2022-06-05',
    Capacidad : 50,
    Descip : 'Habitacion simpel',
    Id_Servicio : 2,
    Ciudad : 1
  }
  test("200 - Success", async () => {
    const response = await request(app).post("/addhabitacion").send(data);
    expect(response.statusCode).toBe(200);
  });
});

describe("POST /newhotel", () => {
  const data = {
    nombre : 'hotel los caminos de la vida',
    email : 'pruebabababa@gmail.com',
    ciudad : 1,
    tipo : 1
  }
  test("200 - Success", async () => {
    const response = await request(app).post("/newhotel").send(data);
    expect(response.statusCode).toBe(200);
  });
});

describe("POST /drophabitacion", () => {
  const data = {
    id_habitacion : 1
    
  }
  test("200 - Success", async () => {
    const response = await request(app).post("/drophabitacion").send(data);
    expect(response.statusCode).toBe(200);
  });
});

describe("POST /dropvuelo", () => {
  const data = {
    id_vuelo : 1
    
  }
  test("200 - Success", async () => {
    const response = await request(app).post("/dropvuelo").send(data);
    expect(response.statusCode).toBe(200);
  });
});

describe("POST /drophabitacion", () => {
  const data = {
    id_habitacion : 1
    
  }
  test("200 - Success", async () => {
    const response = await request(app).post("/drophabitacion").send(data);
    expect(response.statusCode).toBe(200);
  });
});

describe("POST /addreservahotel", () => {
  const data = {
    fecha_inicio :"20/05/2022" ,
    fecha_fin:"21/05/2022",
    id_user: 8,
    id_habitacion: 1
  }
  test("200 - Success", async () => {
    const response = await request(app).post("/addreservahotel").send(data);
    expect(response.statusCode).toBe(200);
  });
});

describe("POST /reseñausuario", () => {
  const data = {
    user :8 
    
  }
  test("200 - Success", async () => {
    const response = await request(app).post("/reseñausuario").send(data);
    expect(response.statusCode).toBe(200);
  });
});

describe("POST /listreserva", () => {
  const data = {
    id_habitacion : 1
    
  }
  test("200 - Success", async () => {
    const response = await request(app).post("/listreserva").send(data);
    expect(response.statusCode).toBe(200);
  });
});

describe("POST /busquedahabitaciones", () => {
  const data = {
    precio : 20
    
  }
  test("200 - Success", async () => {
    const response = await request(app).post("/busquedahabitaciones").send(data);
    expect(response.statusCode).toBe(200);
  });
});

describe("POST /busquedarservas", () => {
  const data = {
   
    
  }
  test("200 - Success", async () => {
    const response = await request(app).post("/busquedarservas").send(data);
    expect(response.statusCode).toBe(200);
  });
});

describe("POST /listvuelosusu", () => {
  const data = {
   id_vuelo : 8 
    
  }
  test("200 - Success", async () => {
    const response = await request(app).post("/listvuelosusu").send(data);
    expect(response.statusCode).toBe(200);
  });
});

describe("POST /listvehiculos", () => {
  const data = {
    id_usuario : 8 
    
  }
  test("200 - Success", async () => {
    const response = await request(app).post("/id_usuario").send(data);
    expect(response.statusCode).toBe(200);
  });
});

describe("POST /getReservaAutoId", () => {
  const data = {
    id_usuario : 8 
    
  }
  test("200 - Success", async () => {
    const response = await request(app).post("/getReservaAutoId").send(data);
    expect(response.statusCode).toBe(200);
  });
});

describe("POST /listareservasvuelosusuarios", () => {
  const data = {
    
    
  }
  test("200 - Success", async () => {
    const response = await request(app).post("/listareservasvuelosusuarios").send(data);
    expect(response.statusCode).toBe(200);
  });
});

describe("POST /listareservasvuelos", () => {
  const data = {
    
    
  }
  test("200 - Success", async () => {
    const response = await request(app).post("/listareservasvuelos").send(data);
    expect(response.statusCode).toBe(200);
  });
});



describe("POST /listvehiculosusuario", () => {
  const data = {
    
    
  }
  test("200 - Success", async () => {
    const response = await request(app).post("/listvehiculosusuario").send(data);
    expect(response.statusCode).toBe(200);
  });
});

describe("POST /resenausuario", () => {
  const data = {
    user:8
    
  }
  test("200 - Success", async () => {
    const response = await request(app).post("/resenausuario").send(data);
    expect(response.statusCode).toBe(200);
  });
});
