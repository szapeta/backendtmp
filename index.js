import express from "express";
import mysql from "mysql";
import cors from "cors";
import md5 from "md5";
const app = express();
app.use(express.json());
app.use(cors());
export default app;

var connectionMYSQL = mysql.createConnection({
  host: "database-1.c5jhksftgxws.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "admin1234",
  database: "db1",
  port: 3306,
});
//// comentarios
app.post("/listcomentarios", (req, res) => {
  const { user } = req.body;
  connectionMYSQL.query(
    "call getResenaServicio(?)",
    [user],
    function (err, result) {
      if (err) {
        console.log("err:", err);
      } else {
        return res.send(result[0]);
      }
    }
  );
});
//// add habitaciones
app.post("/addhabitacion", (req, res) => {
  var {
    No_habitacion,
    Tipo,
    Precio,
    Fecha,
    Capacidad,
    Descip,
    Id_Servicio,
    Ciudad,
  } = req.body;
  connectionMYSQL.query(
    "call addHabitacion(?,?,?,?,?,?,?,?)",
    [
      No_habitacion,
      Tipo,
      Precio,
      Fecha,
      Capacidad,
      Descip,
      Id_Servicio,
      Ciudad,
    ],
    function (err, result) {
      if (err) {
        console.log("err:", err);
      } else {
        res.send(result[0]);
      }
    }
  );
});
///// seccion de ABC hotel
///// añadir servicio
app.post("/newhotel", (req, res) => {
  var { nombre, email, ciudad } = req.body;
  let tipo = 1;
  connectionMYSQL.query(
    "call addServicio(?,?,?,?)",

    [nombre, email, tipo, ciudad],
    function (err, result) {
      if (err) {
        console.log("err:", err);
      } else {
        res.send(result[0]);
      }
    }
  );
});

////// añadir habitacion

app.post("/drophabitacion", (req, res) => {
  var { id_habitacion } = req.body;
  connectionMYSQL.query(
    "DELETE FROM Habitacion  h WHERE h.id_habitacion = " + id_habitacion + ";",
    [id_habitacion],
    function (err, result) {
      if (err) {
        console.log("err:", err);
      } else {
        res.send(result[0]);
      }
    }
  );
});
//// drop vuelo
app.post("/dropvuelo", (req, res) => {
  var { id_vuelo } = req.body;
  connectionMYSQL.query(
    "DELETE FROM Vuelo  h WHERE h.id_vuelo = " + id_vuelo + ";",
    [id_vuelo],
    function (err, result) {
      if (err) {
        console.log("err:", err);
      } else {
        res.send(result[0]);
      }
    }
  );
});
///

app.post("/drophabitacion", (req, res) => {
  var { id_habitacion } = req.body;
  connectionMYSQL.query(
    "DELETE FROM Habitacion  h WHERE h.id_habitacion = " + id_habitacion + ";",
    [id_habitacion],
    function (err, result) {
      if (err) {
        console.log("err:", err);
      } else {
        res.send(result[0]);
      }
    }
  );
});
//// añadir reserva hotel
app.post("/addreservahotel", (req, res) => {
  var { fecha_inicio, fecha_fin, id_user, id_habitacion } = req.body;
  connectionMYSQL.query(
    "call addReservaHotel(?,?,?,?)",
    [fecha_inicio, fecha_fin, id_user, id_habitacion],
    function (err, result) {
      if (err) {
        console.log("err:", err);
      } else {
        res.send(result[0]);
      }
    }
  );
});

//// añadir modificar hotel
app.post("/newuser", (req, res) => {
  var { name, fechanac, email, password, rol } = req.body;
  password = md5(password);

  connectionMYSQL.query(
    "call addUser(?,?,?,?,?)",
    [name, fechanac, email, password, rol],
    function (err, result) {
      if (err) {
        console.log("err:", err);
      } else {
        res.send(result[0]);
      }
    }
  );
});

/// get reseña usuario
app.post("/reseñausuario", (req, res) => {
  var { user } = req.body;

  connectionMYSQL.query(
    "call getResenaUsuario(?)",
    [user],
    function (err, result) {
      if (err) {
        console.log("err:", err);
      } else {
        res.send(result[0]);
        return;
      }
    }
  );
});
/// get datos reserva

app.post("/listreserva", (req, res) => {
  var { id_habitacion } = req.body;
  connectionMYSQL.query(
    "SELECT h.no_habitacion, h.tipo, h.precio, h.fecha, h.capacidad, h.descip, h.id_servicio, c.ciudad FROM Habitacion  h INNER JOIN Ciudad c ON h.id_ciudad=c.id_ciudad  WHERE h.id_habitacion = " +
      id_habitacion +
      " ;",
    [id_habitacion],
    function (err, result) {
      if (err) {
        console.log("err:", err);
      } else {
        res.send(result[0]);
      }
    }
  );
});

/// get vehiculos
/////////// busqueda de hoteles
app.post("/busquedahabitaciones", (req, res) => {
  const { fecha, ciudad, precio, cant_personas } = req.body;
  var list = [];
  var masm = false;
  var inicio = true;
  var squery =
    "SELECT h.no_habitacion, h.tipo, h.precio, h.fecha, h.capacidad, h.descip, h.id_servicio, c.ciudad FROM Habitacion  h INNER JOIN Ciudad c ON h.id_ciudad=c.id_ciudad ";

  if (ciudad != null && ciudad.length > 0) {
    if (inicio) squery += "WHERE";
    inicio = false;
    if (masm) squery += "AND";
    squery += "  c.ciudad = ? ";
    list.push(ciudad);
    masm = true;
  }
  if (cant_personas != null && cant_personas > 0) {
    if (inicio) squery += "WHERE";
    inicio = false;
    if (masm) squery += "AND";
    squery += "  h.capacidad >= ? ";
    list.push(cant_personas);
    masm = true;
  }

  if (precio != null && precio > 0) {
    if (inicio) squery += " where ";
    inicio = false;
    if (masm) squery += " and ";
    squery += "  precio >= ? ";
    list.push(precio);
    masm = true;
  }

  if (fecha != null && fecha.length > 0) {
    if (inicio) squery += " where ";
    inicio = false;
    if (masm) squery += " and ";
    squery += "  fecha_inicio = ? ";
    list.push(fecha);
    masm = true;
  }
  console.log(squery);
  connectionMYSQL.query(squery, list, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});
//////////// busqueda de hoteles
//// busqueda reservas
app.post("/busquedarservas", (req, res) => {
  const { fecha, fecha_fin } = req.body;
  var list = [];
  var masm = false;
  var inicio = true;
  var squery = "select * from ReservaHotel ";

  if (fecha != null && fecha.length > 0) {
    if (inicio) squery += " where ";
    inicio = false;
    if (masm) squery += " and ";
    squery += " fecha_inicio >='" + fecha + "'";
    list.push(fecha);
    masm = true;
  }
  if (fecha_fin != null && fecha_fin.length > 0) {
    if (inicio) squery += " where ";
    inicio = false;
    if (masm) squery += " and ";
    squery += "fecha_fintipo <='" + fecha_fin + "'";
    list.push(fecha_fin);
    masm = true;
  }
  squery += ";";
  connectionMYSQL.query(squery, list, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});
//////////// generales
app.post("/login", (req, res) => {
  var { user, pass } = req.body;
  pass = md5(pass);

  connectionMYSQL.query(
    "call login(?,?)",
    [user, pass],
    function (err, result) {
      if (err) {
        console.log("err:", err);
      } else {
        res.send(result[0]);
        return;
      }
    }
  );
});

////
app.post("/listvuelosusu", (req, res) => {
  var { id_vuelo } = req.body;

  connectionMYSQL.query("call getVuelo(?)", [id_vuelo], function (err, result) {
    if (err) {
      console.log("err:", err);
    } else {
      res.send(result[0]);
      return;
    }
  });
});
//===== GET =====
/**obtener marcas */
app.get("/listmarcas", (req, res) => {
  connectionMYSQL.query("call getMarca()", [], function (err, result) {
    if (err) {
      res.send(result);
    } else {
      res.send(result[0]);
    }
  });
});

/**obtener paises */
app.get("/listpaises", (req, res) => {
  connectionMYSQL.query("call getPais()", [], function (err, result) {
    if (err) {
      res.send(result);
    } else {
      res.send(result[0]);
    }
  });
});

/**obtener ciudad */
app.get("/listciudad", (req, res) => {
  connectionMYSQL.query("call getCiudad()", [], function (err, result) {
    if (err) {
      res.send(result);
    } else {
      res.send(result[0]);
    }
  });
});

//=== POST =====
//Agregar Auto
//PArametos:
//placa int , marca string, id_servicio int , modelo string, precio float
app.post("/addAuto", (req, res) => {
  const { placa, marca, servicio, modelo, precio, ciudad } = req.body;
  connectionMYSQL.query(
    "call addAuto(?,?,?,?,?,?)",
    [placa, marca, servicio, modelo, precio, ciudad],
    function (err, result) {
      if (err) {
        console.log("err:", err);
        res.send(result);
      } else {
        res.send(result[0]);
      }
    }
  );
});

/**agregar vuelo */
app.post("/addVuelo", (req, res) => {
  //fecha string, origen string, destino string, catnida_asiento int, precio float, vuelta int, id_servicio int
  const {
    fecha,
    origen,
    destino,
    catnida_asiento,
    precio,
    vuelta,
    id_servicio,
  } = req.body;

  connectionMYSQL.query(
    "call addVuelo(?,?,?,?,?,?,?)",
    [fecha, origen, destino, catnida_asiento, precio, vuelta, id_servicio],
    function (err, result) {
      if (err) {
        console.log("err:", err);
      } else {
        res.send(result[0]);
      }
    }
  );
});

/**reservar vuelo */
app.post("/addReservaVuelo", (req, res) => {
  //cantida_asiento int, id_user int, id_servicio int
  const { cantida_asiento, id_user, id_servicio } = req.body;

  connectionMYSQL.query(
    "call addReservaVuelo(?,?,?)",
    [cantida_asiento, id_user, id_servicio],
    function (err, result) {
      if (err) {
        console.log("err:", err);
      } else {
        res.send(result[0]);
      }
    }
  );
});

//--
/**buscar vehiculos por filtro */
app.post("/listvehiculos", (req, res) => {
  //placa int, marca string, id_servicio int, modelo string, precio float
  const { id_usuario, marca, placa, modelo, precio } = req.body;
  var list = [];
  var masm = false;
  var inicio = true;
  var squery =
    "select a.id_servicio,a.placa, m.marca, a.modelo,a.precio  from Auto a inner join Marca m on a.id_marca = m.id_marca ";

  squery += " where id_servicio = ? ";
  list.push(id_usuario);
  inicio = false;
  masm = true;

  if (marca != null && marca.length > 0) {
    if (inicio) squery += " where ";
    inicio = false;
    if (masm) squery += " and ";
    squery += "  marca = ? ";
    list.push(marca);
    masm = true;
  }

  if (placa != null && placa.length > 0) {
    if (inicio) squery += " where ";
    inicio = false;
    if (masm) squery += " and ";
    squery += "  placa = ? ";
    list.push(placa);
    masm = true;
  }

  if (modelo != null && modelo.length > 0) {
    if (inicio) squery += " where ";
    inicio = false;
    if (masm) squery += " and ";
    squery += "  modelo = ? ";
    list.push(modelo);
    masm = true;
  }

  if (precio != null && precio > 0) {
    if (inicio) squery += " where ";
    inicio = false;
    if (masm) squery += " and ";
    squery += "  precio >= ? ";
    list.push(precio);
    masm = true;
  }
  connectionMYSQL.query(squery, list, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

/**obtener auto reservado id segio*/
app.post("/getReservaAutoId", (req, res) => {
  //cantida_dias int, id_user int, id_servicio int
  const { id_usuario } = req.body;

  connectionMYSQL.query(
    "call getRentaTurista(?)",
    [id_usuario],
    function (err, result) {
      if (err) {
        console.log("err:", err);
        res.send(result);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/listareservasvuelosusuarios", (req, res) => {
  //placa int, marca string, id_servicio int, modelo string, precio float
  const { origen, destino, precio, fecha } = req.body;
  var list = [];
  var masm = false;
  var inicio = true;
  var squery =
    "SELECT v.id_vuelo,p.pais,p2.pais,v.precio,v.fecha FROM Vuelo v INNER JOIN Pais p ON v.origen = p.id_pais INNER JOIN Pais p2 ON v.destino = p2.id_pais  ";

  if (origen != null && origen.length > 0) {
    if (inicio) squery += " where ";
    inicio = false;
    if (masm) squery += " and ";
    squery += "  p.pais = ? ";
    list.push(origen);
    masm = true;
  }

  if (destino != null && destino.length > 0) {
    if (inicio) squery += " where ";
    inicio = false;
    if (masm) squery += " and ";
    squery += "  p2.pais = ? ";
    list.push(destino);
    masm = true;
  }

  if (fecha != null && fecha.length > 0) {
    if (inicio) squery += " where ";
    inicio = false;
    if (masm) squery += " and ";
    squery += "  fecha >= ? ";
    list.push(fecha);
    masm = true;
  }

  if (precio != null && precio > 0) {
    if (inicio) squery += " where ";
    inicio = false;
    squery += "  precio >= ? ";
    if (masm) squery += " and ";
    list.push(precio);
    masm = true;
  }
  connectionMYSQL.query(squery, list, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/listareservasvuelos", (req, res) => {
  //placa int, marca string, id_servicio int, modelo string, precio float
  const { id_vuelo, fecha, precio } = req.body;
  var list = [];
  var inicio = true;
  var masm = false;
  var squery =
    "select r.id_reserva_vuelo,v.fecha,v.precio from ReservaVuelo r INNER JOIN Vuelo v ON r.id_vuelo=v.id_vuelo ";

  list.push(id_vuelo);
  squery += " where v.id_servicio = ? ";
  inicio = false;
  masm = true;

  if (fecha != null && fecha.length > 0) {
    if (inicio) squery += " where ";
    inicio = false;
    if (masm) squery += " and ";
    squery += "  v.fecha = ? ";
    list.push(fecha);
  }
  masm = true;

  if (precio != null && precio > 0) {
    if (inicio) squery += " where ";
    inicio = false;
    if (masm) squery += " and ";
    squery += "  v.precio >= ? ";
    list.push(precio);
    masm = true;
  }
  connectionMYSQL.query(squery, list, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/addResena", (req, res) => {
  //cantida_dias int, id_user int, id_servicio int
  const { comentario, user, servicio } = req.body;
  connectionMYSQL.query(
    "call addResena(?,?,?)",
    [comentario, user, servicio],
    function (err, result) {
      if (err) {
        console.log("err:", err);
        res.send(result);
      } else {
        res.send(result[0]);
      }
    }
  );
});

app.post("/getResena", (req, res) => {
  //cantida_dias int, id_user int, id_servicio int
  const { id_resena } = req.body;
  connectionMYSQL.query(
    "call getResena(?)",
    [id_resena],
    function (err, result) {
      if (err) {
        console.log("err:", err);
        res.send(result);
      } else {
        res.send(result[0]);
      }
    }
  );
});

app.post("/getUsuario", (req, res) => {
  //cantida_dias int, id_user int, id_servicio int
  const { id_usuario } = req.body;
  connectionMYSQL.query(
    "call getUsuario(?)",
    [id_usuario],
    function (err, result) {
      if (err) {
        console.log("err:", err);
        res.send(result);
      } else {
        res.send(result[0]);
      }
    }
  );
});

app.post("/addReservaAuto", (req, res) => {
  //cantida_dias int, id_user int, id_servicio int
  const { fecha_inicio, fecha_final, id_user, placa } = req.body;
  connectionMYSQL.query(
    "call addRentaAuto(?,?,?,?)",
    [fecha_inicio, fecha_final, id_user, placa],
    function (err, result) {
      if (err) {
        console.log("err:", err);
        res.send(result);
      } else {
        res.send(result[0]);
      }
    }
  );
});

app.post("/getAuto", (req, res) => {
  const { placa } = req.body;
  console.log(placa);
  connectionMYSQL.query(
    "select a.placa, m.marca, a.modelo,a.precio from Auto a inner join Marca m on a.id_marca = m.id_marca where placa = ? ",
    [placa],
    function (err, result) {
      if (err) {
        res.send(result);
      } else {
        console.log(result);
        res.send(result[0]);
      }
    }
  );
});

app.post("/listvehiculosusuario", (req, res) => {
  //placa int, marca string, id_servicio int, modelo string, precio float
  const { marca, placa, modelo, precio } = req.body;
  var list = [];
  var masm = false;
  var inicio = true;
  var squery =
    "select a.id_servicio,a.placa, m.marca, a.modelo,a.precio  from Auto a inner join Marca m on a.id_marca = m.id_marca ";

  if (marca != null && marca.length > 0) {
    if (inicio) squery += " where ";
    inicio = false;
    if (masm) squery += " and ";
    squery += "  marca = ? ";
    list.push(marca);
    masm = true;
  }

  if (placa != null && placa.length > 0) {
    if (inicio) squery += " where ";
    inicio = false;
    if (masm) squery += " and ";
    squery += "  placa = ? ";
    list.push(placa);
    masm = true;
  }

  if (modelo != null && modelo.length > 0) {
    if (inicio) squery += " where ";
    inicio = false;
    if (masm) squery += " and ";
    squery += "  modelo = ? ";
    list.push(modelo);
    masm = true;
  }

  if (precio != null && precio > 0) {
    if (inicio) squery += " where ";
    inicio = false;
    if (masm) squery += " and ";
    squery += "  precio >= ? ";
    list.push(precio);
    masm = true;
  }

  console.log(squery);
  connectionMYSQL.query(squery, list, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

app.post("/resenausuario", (req, res) => {
  var { user } = req.body;

  connectionMYSQL.query(
    "call getResenaUsuario(?)",
    [user],
    function (err, result) {
      if (err) {
        console.log("err:", err);
      } else {
        res.send(result[0]);
        return;
      }
    }
  );
});
