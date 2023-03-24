import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/sellos_calidad.css";

const ProjectSelection = () => {
	const [projects, setProjects] = useState([]);
	const [agroups, setAgroups] = useState([]);
	const [sellos, setSellos] = useState([]);
	const [contratistas, setContratistas] = useState([]);
	const [unidadesSellos, setUnidadesSellos] = useState([]);

	const [selectedProject, setSelectedProject] = useState(null);
	const [selectedAgroup, setSelectedAgroup] = useState(null);
	const [selectedSellos, setSelectedSellos] = useState(null);
	const [selectedContratistas, setSelectedContratistas] = useState(null);
	const [confirmationMessage, setConfirmationMessage] = useState("");
	const [selectedUnidadesSellos, setSelectedUnidadesSellos] = useState({
		unidadesSellos: [],
	});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProjects = async () => {
			setLoading(true);
			try {
				const res = await axios.get("http://localhost:3001/proyectos");
				setProjects(res.data);
			} catch (err) {
				console.log(err);
			} finally {
				setLoading(false);
			}
		};
		fetchProjects();
	}, []);

	useEffect(() => {
		const fetchAgroups = async () => {
			setLoading(true);
			try {
				const res = await axios.get("http://localhost:3001/agrupaciones");
				setAgroups(res.data);
			} catch (err) {
				console.log(err);
			} finally {
				setLoading(false);
			}
		};
		fetchAgroups();
	}, []);

	useEffect(() => {
		const fetchSellos = async () => {
			setLoading(true);
			try {
				const res = await axios.get("http://localhost:3001/sellos-calidad");
				setSellos(res.data);
			} catch (err) {
				console.log(err);
			} finally {
				setLoading(false);
			}
		};
		fetchSellos();
	}, []);

	useEffect(() => {
		const fetchContratistas = async () => {
			setLoading(true);
			try {
				const res = await axios.get("http://localhost:3001/contratistas");
				setContratistas(res.data);
			} catch (err) {
				console.log(err);
			} finally {
				setLoading(false);
			}
		};
		fetchContratistas();
	}, []);

	useEffect(() => {
		const fetchUnidadesSellos = async () => {
			setLoading(true);
			try {
				const res = await axios.get(
					"http://localhost:3001/unidades-disponibles",
				);
				setUnidadesSellos(res.data);
			} catch (err) {
				console.log(err);
			} finally {
				setLoading(false);
			}
		};
		if (
			selectedProject &&
			selectedAgroup &&
			selectedSellos &&
			selectedContratistas
		) {
			fetchUnidadesSellos();
		}
	}, [selectedProject, selectedAgroup, selectedSellos, selectedContratistas]);

	const handleProjectSelection = (e) => {
		const projectId = e.target.value;
		setSelectedProject(projectId);
	};

	const handleAgroupSelection = (e) => {
		const agroupId = e.target.value;
		setSelectedAgroup(agroupId);
	};

	const handleSellosSelection = (e) => {
		const sellosId = e.target.value;
		setSelectedSellos(sellosId);
	};

	const handleContratistasSelection = (e) => {
		const contratistasId = e.target.value;
		setSelectedContratistas(contratistasId);
	};

	const handleUnidadesSellosSelection = (e) => {
		const unidadSelloId = e.target.value;
		const isChecked = e.target.checked;
		setSelectedUnidadesSellos((prevValues) => {
			let unidadesSellos = [...prevValues.unidadesSellos];
			if (isChecked) {
				unidadesSellos.push(unidadSelloId);
			} else {
				unidadesSellos = unidadesSellos.filter((id) => id !== unidadSelloId);
			}
			return { ...prevValues, unidadesSellos: unidadesSellos };
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (
			selectedProject &&
			selectedAgroup &&
			selectedSellos &&
			selectedContratistas &&
			selectedUnidadesSellos.unidadesSellos.length > 0
		) {
			try {
				await Promise.all(
					selectedUnidadesSellos.unidadesSellos.map((unidadSello) =>
						axios.post("http://localhost:3001/tomas-sello", {
							id_unidadesdisponibles: unidadSello,
							id_proyecto: selectedProject,
							id_etapa: selectedAgroup,
							id_sello: selectedSellos,
							id_contratista: selectedContratistas,
						}),
					),
				);
				selectedUnidadesSellos.unidadesSellos.map((unidadSello) =>
					axios.get(`http://localhost:3001/actualizar-unidad/${unidadSello}`),
				);
				setConfirmationMessage("¡Los datos han sido enviados correctamente!");
			} catch (err) {
				console.log(err);
			}
		} else {
			setConfirmationMessage("¡Todos los campos son requeridos!");
		}
	};

	return (
		<div className="principal">
			<div className="container">
				<div className="titulo">
					<h1>Toma de Sellos Calidad-Pisos</h1>
				</div>
				<form onSubmit={handleSubmit} className="select">
					{loading ? (
						<p>Cargando proyectos...</p>
					) : (
						<select
							onChange={handleProjectSelection}
							value={selectedProject || "default"}
							className="grid-2"
						>
							<option value="default">Proyecto</option>
							{projects.map((project) => (
								<option key={project.id_proyecto} value={project.id_proyecto}>
									{project.nombre_proyecto}
								</option>
							))}
						</select>
					)}
					{loading ? (
						<p>Cargando agrupaciones...</p>
					) : (
						<select
							onChange={handleAgroupSelection}
							value={selectedAgroup || "default"}
							disabled={!selectedProject}
						>
							<option value="default">Agrupación</option>
							{agroups.map((agroup) => (
								<option key={agroup.id_etapa} value={agroup.id_etapa}>
									{agroup.nombre_etapa}
								</option>
							))}
						</select>
					)}
					{loading ? (
						<p>Cargando sellos...</p>
					) : (
						<select
							onChange={handleSellosSelection}
							value={selectedSellos || "default"}
							disabled={!selectedProject}
						>
							<option value="default">Sello</option>
							{sellos.map((sello) => (
								<option key={sello.id_sello} value={sello.id_sello}>
									{sello.nombre_sello}
								</option>
							))}
						</select>
					)}
					{loading ? (
						<p>Cargando contratistas...</p>
					) : (
						<select
							onChange={handleContratistasSelection}
							value={selectedContratistas || "default"}
							disabled={!selectedProject}
							className="grid-2"
						>
							<option value="default">Contratista</option>
							{contratistas.map((contratista) => (
								<option
									key={contratista.id_contratista}
									value={contratista.id_contratista}
								>
									{contratista.descContratista}
								</option>
							))}
						</select>
					)}
					{loading ? (
						<p>Cargando unidades de sellos...</p>
					) : (
						<div className="grid-2">
							{unidadesSellos.map((unidadSello) => (
								<div
									key={unidadSello.id_unidadesdisponibles}
									className="checkbox"
								>
									<input
										type="checkbox"
										id={unidadSello.id_unidadesdisponibles}
										name={unidadSello.id_unidadesdisponibles}
										value={unidadSello.id_unidadesdisponibles}
										onChange={handleUnidadesSellosSelection}
									/>
									<label htmlFor={unidadSello.id_unidadesdisponibles}>
										{unidadSello.nombre_unidaddisponible}
									</label>
								</div>
							))}
						</div>
					)}
					<button className="button grid-2" type="submit">
						Guardar
					</button>
				</form>
				{confirmationMessage && <p>{confirmationMessage}</p>}
			</div>
		</div>
	);
};

export default ProjectSelection;
