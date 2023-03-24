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

app.get("/agrupaciones", (req, res) => {
	const query = "SELECT * FROM etapaproyecto";
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

app.get(
	"/unidades-disponibles",
	(req, res) => {
		const { id_proyecto, id_etapa, id_sello, id_contratista } = req.params;
		const query = `SELECT * FROM unidadessellodisponibles WHERE 
                          estado = 0`;
		connection.query(query, (err, results) => {
			if (err) {
				console.error("Error al obtener las unidades disponibles: ", err);
				res.status(500).send("Error al obtener las unidades disponibles");
				return;
			}
			res.json(results);
		});
	},
);

app.post("/tomas-sello", (req, res) => {
	const { id_unidadesdisponibles, id_proyecto, id_etapa, id_sello, id_contratista } =
		req.body;
	//insertar unidades seleccionadas
  const query = `INSERT INTO unidadestomasello (id_unidadesdisponibles , id_proyecto, id_etapa, id_sello, id_contratista) VALUES (${id_unidadesdisponibles}, ${id_proyecto}, ${id_etapa}, ${id_sello}, ${id_contratista})`;
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

// Ruta para actualizar un registro en la tabla "unidadessellodisponibles"
app.get('/actualizar-unidad/:id', (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE unidadessellodisponibles SET estado = 1 WHERE id_unidadesdisponibles = ${id}`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(`Registro con id ${id} actualizado correctamente en la tabla unidadessellodisponibles!`);
  });
});

app.listen(3001, () => {
	console.log("Servidor iniciado en el puerto 3001");
});
