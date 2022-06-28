var express = require("express");
var mysql = require("mysql");
var cors = require('cors')
const app = express();
app.use(express.json());
const md5 = require('md5')
var connectionMYSQL = mysql.createConnection({
  host: "database-1.c5jhksftgxws.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "admin1234",
  database: "db1",
  port: 3306,
});

connectionMYSQL.connect(function (error) {
  if (error) {
    throw error;
  } else {
    console.log("Conn mysql");
  }
});

app.use(cors())
app.get("/", (req, res) => {
  connectionMYSQL.query("call getCiudad()", [], function (err, result) {
    if (err) {
      console.log("err:", err);
    } else {
      console.log("results:", result);
      
        
      
    }
  });
  res.send(true);
});

app.get("/u", (req, res) => {
  var {Nombre, Fecha,Email,User,Pass,Tipo} = req.body;    

  
    connectionMYSQL.query("call addUser(?,?,?,?,?,?)", 
    [Nombre, Fecha, Email,User, Pass, Tipo ], function (err, result) {
      if (err) {
        console.log("err:", err);
      } else {
        console.log("results:", result);
      }
    });
    res.send(true);
  });
///// seccion de ABC hotel
///// añadir servicio 
app.post("/newhotel", (req, res) => {
  var {nombre, email,ciudad} = req.body;   
  let tipo =1 ; 
  connectionMYSQL.query("call addServicio(?,?,?,?)", 
  
  [nombre, email,tipo, ciudad], function (err, result) {
    if (err) {
      console.log("err:", err);
    } else {
      console.log("results:", result);
      
     
    }
  });
  res.send(true);
});

////// añadir habitacion
  app.post("/addhabitacion", (req, res) => {
    var {No_habitacion, Tipo,Precio,Fecha,Capacidad,Descip,Id_Servicio} = req.body;    
    connectionMYSQL.query("call addHabitacion(?,?,?,?,?,?,?)", 
    [No_habitacion, Tipo, Precio,Fecha, Capacidad, Descip,Id_Servicio], function (err, result) {
      if (err) {
        console.log("err:", err);
      } else {
        console.log("results:", result);
        
       
      }
    });
    res.send(true);
  });
//// añadir reserva hotel 
  app.post("/addreservahotel", (req, res) => {
    
    var {fecha_inicio, fecha_fin,id_user,id_habitacion} = req.body;
    connectionMYSQL.query("call addReservaHotel(?,?,?,?)", 
    [fecha_inicio, fecha_fin,id_user,id_habitacion,  ], function (err, result) {
      if (err) {
        console.log("err:", err);
      } else {
        console.log("results:", result);
        
      }
    });
    res.send(true);
  });
//// añadir modificar hotel 



  app.post("/newuser", (req, res) => {
     var {name,fechanac,email,password,rol} = req.body
     password = md5(password);
    
    connectionMYSQL.query("call addUser(?,?,?,?,?)", 
    [name, fechanac, email, password, rol], function (err, result) {
      if (err) {
        console.log("err:", err);
      } else {
        console.log("results:", result);
        
      }
    });
    res.send(true);
  });
///////////////// usuarios turistas 
app.post("/newuserturista", (req, res) => {
  var {name,fechanac,email,password} = req.body
  password = md5(password);
 let rol = 1;
 connectionMYSQL.query("call addUser(?,?,?,?,?)", 
 [name, fechanac, email, password, rol], function (err, result) {
   if (err) {
     console.log("err:", err);
   } else {
     console.log("results:", result);
     
   }
 });
 res.send(true);
});
/////////// busqueda de hoteles
app.post("/busquedahabitaciones", (req, res) => {
 
  const {fecha, ciudad, precio} = req.body;  
  var list = [];
  var masm = false;
  var inicio = true;
  var squery = 'select * from Habitacion ';
  

  if(fecha != null && fecha.length > 0){
    if(inicio) squery += ' where ';
    inicio = false;
    if(masm)  squery += ' and ';
    squery += '  fecha = ? ';
    list.push(fecha); 
    masm = true;

  }

  if(ciudad != null && ciudad > 0){
    if(inicio) squery += ' where ';
    inicio = false;
    if(masm) squery += ' and ';
    squery += '  ciudad = ? ';
    list.push(ciudad); 
    masm = true;
  }  

  if(precio != null && precio > 0){
    if(inicio) squery += ' where ';
    inicio = false;
    if(masm) squery += ' and ';
    squery += '  precio > ? ';
    list.push(precio); 
    masm = true;
  }

    connectionMYSQL.query(squery, 
    list, function (err, result) {
      if (err) {
        res.send(err);
      } else {

        res.send(result);
      }
    });
  });  
//////////// busqueda de hoteles 

//////////// generales 
  app.post("/login", (req, res) => {
     var {user, pass} = req.body;
     pass = md5(pass);
    
    connectionMYSQL.query("call login(?,?)", [user, pass], function (err, result) {
      if (err) {
        console.log("err:", err);
      } else {
        console.log("results:", result);        
        res.send(result[0]);
        return
        
      }
    });
    
  });
//===== GET =====
/**obtener marcas */
app.get("/listmarcas",  (req, res) => {
  connectionMYSQL.query("call getMarca()", [], function (err, result) {
     if (err) {
       res.send(result);
     } else {
       res.send(result[0]);
     }
   });
 });
 
 /**obtener paises */
 app.get("/listpaises",  (req, res) => {
    connectionMYSQL.query("call getPais()", [], function (err, result) {
     if (err) {
       res.send(result);
     } else {
       res.send(result[0]);
     }
   });
 });
 
 /**obtener ciudad */
 app.get("/listciudad",  (req, res) => {
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
    const {placa, marca, servicio,modelo, precio,ciudad} = req.body;  
    const id_servicio = 3;
      connectionMYSQL.query("call addAuto(?,?,?,?,?,?)", 
      [placa, marca, servicio,modelo, precio,ciudad], function (err, result) {
        if (err) {
          console.log("err:", err);
          res.send(result);
        } else {
          console.log("results:", result);
          res.send(result);
        }
      });   
    });
 
     /**agregar vuelo */
     app.post("/addVuelo", (req, res) => {
       //fecha string, origen string, destino string, catnida_asiento int, precio float, vuelta int, id_servicio int
       const {fecha,origen, destino,catnida_asiento,preciovuelta,id_servicio} = req.body;  
       
         connectionMYSQL.query("call addVuelo(?,?,?,?,?,?)", 
         [fecha,origen, destino,catnida_asiento,preciovuelta,id_servicio], function (err, result) {
           if (err) {
             console.log("err:", err);
           } else {
             console.log("results:", result);
           }
         });
         res.send(true);
       });
 
       /**reservar vuelo */
       app.post("/addReservaVuelo", (req, res) => {
         //cantida_asiento int, id_user int, id_servicio int
         const {cantida_asiento,id_user, id_servicio} = req.body;  
         
           connectionMYSQL.query("call addReservaVuelo(?,?,?)", 
           [cantida_asiento,id_user, id_servicio], function (err, result) {
             if (err) {
               console.log("err:", err);
             } else {
               console.log("results:", result);
             }
           });
           res.send(true);
         });
 
   //--
   /**buscar vehiculos por filtro */
  app.post("/listvehiculos", (req, res) => {
    //placa int, marca string, id_servicio int, modelo string, precio float
    const {id_usuario,marca, placa, modelo, precio} = req.body;  
    var list = [];
    var masm = false;
    var inicio = true;
    var squery = 'select a.id_servicio,a.placa, m.marca, a.modelo,a.precio  from Auto a inner join Marca m on a.id_marca = m.id_marca ';
    

    squery += ' where id_servicio = ? ';
    list.push(id_usuario);
    inicio = false;
    masm = true;

    if(marca != null && marca.length > 0){
      if(inicio) squery += ' where ';
      inicio = false;
      if(masm) squery += ' and ';
      squery += '  marca = ? ';
      list.push(marca); 
      masm = true;
    }

    if(placa != null && placa.length > 0){
      if(inicio) squery += ' where ';
      inicio = false;
      if(masm) squery += ' and ';
      squery += '  placa = ? ';
      list.push(placa); 
      masm = true;
    }

    if(modelo != null && modelo.length > 0){
      if(inicio) squery += ' where ';
      inicio = false;
      if(masm) squery += ' and ';
      squery += '  modelo = ? ';
      list.push(modelo); 
      masm = true;
    }

    if(precio != null && precio > 0){
      if(inicio) squery += ' where ';
      inicio = false;
      if(masm) squery += ' and ';
      squery += '  precio >= ? ';
      list.push(precio); 
      masm = true;
    }

console.log(squery);
      connectionMYSQL.query(squery, 
      list, function (err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      });
    });   
app.listen(3000);
