const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Configurar la conexión a la base de datos
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_marval",
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos: ", err);
    return;
  }
  console.log("Conectado a la base de datos");
});

// Definir las rutas
app.get("/proyectos", (req, res) => {
  const query = "SELECT * FROM proyecto";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener los proyectos: ", err);
      res.status(500).send("Error al obtener los proyectos");
      return;
    }
    res.json(results);
  });
});

app.get("/proyectos/:id/agrupaciones", (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM etapaproyecto WHERE id_proyecto = ${id}`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener las agrupaciones: ", err);
      res.status(500).send("Error al obtener las agrupaciones");
      return;
    }
    res.json(results);
  });
});

app.get("/sellos-calidad", (req, res) => {
  const query = "SELECT * FROM sellocalidad";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener los sellos de calidad: ", err);
      res.status(500).send("Error al obtener los sellos de calidad");
      return;
    }
    res.json(results);
  });
});

app.get("/contratistas", (req, res) => {
  const query = "SELECT * FROM contratista";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener los contratistas: ", err);
      res.status(500).send("Error al obtener los contratistas");
      return;
    }
    res.json(results);
  });
});

app.get("/unidades-disponibles/:id_proyecto/:id_etapa/:id_sello/:id_contratista", (req, res) => {
  const { id_proyecto,  id_etapa, id_sello, id_contratista} = req.params;
  const query = `SELECT * FROM unidadestomasello WHERE 
                          id_proyecto = ${id_proyecto} AND 
                          id_etapa = ${id_etapa} AND 
                          id_sello = ${id_sello} AND 
                          id_contratista = ${id_contratista} AND 
                          seleccionada = 0`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener las unidades disponibles: ", err);
      res.status(500).send("Error al obtener las unidades disponibles");
      return;
    }
    res.json(results);
  });
});

app.post("/tomas-sello", (req, res) => {
  const { id_unidad, id_proyecto, id_etapa, id_sello, id_contratista } = req.body;
  //actuaizar unidades seleccionadas
  const query = `UPDATE unidadestomasello SET seleccionada = 1 WHERE 
                          id_unidad = ${id_unidad} AND 
                          id_proyecto = ${id_proyecto} AND
                          id_etapa = ${id_etapa} AND 
                          id_sello = ${id_sello} AND 
                          id_contratista = ${id_contratista}`;
  connection.query(query, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al registrar toma de sello");
    } else {
      console.log("Toma de sello registrada exitosamente");
      res.status(200).send("Toma de sello registrada exitosamente");
    }
  });
});

app.listen(3001, () => {
  console.log("Servidor iniciado en el puerto 3001");
});
