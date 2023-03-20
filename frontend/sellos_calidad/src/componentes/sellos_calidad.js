import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/sellos_calidad.css";

const ProjectSelection = () => {
  const [projects, setProjects] = useState([]);
  const [agroups, setAgroups] = useState([]);
  const [sellos, setSellos] = useState([]);
  const [contratistas, setContratistas] = useState([]);
  const [unidadesSellos, setUnidadesSellos] = useState([]);
  const [selectedUnidadesSellos, setSelectedUnidadesSellos] = useState({
    unidadesSellos: [],
  });

  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedAgroup, setSelectedAgroup] = useState(null);
  const [selectedSellos, setSelectedSellos] = useState(null);
  const [selectedContratistas, setSelectedContratistas] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3001/proyectos")
      .then((res) => {
        setProjects(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/proyectos/${selectedProject}/agrupaciones`)
      .then((res) => {
        setAgroups(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/sellos-calidad")
      .then((res) => {
        setSellos(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/contratistas")
      .then((res) => {
        setContratistas(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/unidades-disponibles/${selectedProject}/${selectedAgroup}/${selectedSellos}/${selectedContratistas}`
      )
      .then((res) => {
        setUnidadesSellos(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  });

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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Código para enviar los datos aquí
    setConfirmationMessage("¡Los datos han sido enviados correctamente!");
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
            <select onChange={handleProjectSelection} defaultValue="default" className="grid-2">
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
              defaultValue="default"
              disabled={!selectedProject}>
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
              defaultValue="default"
              disabled={!selectedProject}>
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
              defaultValue="default"
              disabled={!selectedProject}
              className="grid-2">
              <option value="default">Contratista</option>
              {contratistas.map((contratista) => (
                <option
                  key={contratista.id_contratista}
                  value={contratista.id_contratista}>
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
                //checkbox
                <div key={unidadSello.id_unidad} className="checkbox">
                  <input
                    type="checkbox"
                    id={unidadSello.id_unidad}
                    name={unidadSello.id_unidad}
                    value={unidadSello.id_unidad}
                    onChange={handleUnidadesSellosSelection}
                  />
                  <label htmlFor={unidadSello.id_unidad}>
                    {unidadSello.nombre_unidad}
                  </label>
                </div>
              ))}
            </div>
          )}
          {
            //boton enviar
            <button
              className="button grid-2"
              type="submit"
              onClick={() => {
                selectedUnidadesSellos.unidadesSellos.map((unidadSello) =>
                  axios
                    .post("http://localhost:3001/tomas-sello", {
                      id_unidad: unidadSello,
                      id_proyecto: selectedProject,
                      id_etapa: selectedAgroup,
                      id_sello: selectedSellos,
                      id_contratista: selectedContratistas,
                    })
                    .then((res) => {
                      <p>{res}</p>;
                    })
                    .catch((err) => console.log(err))
                );
              }}>
              Guardar
            </button>
          }
      </form>
      {confirmationMessage && <p>{confirmationMessage}</p>}  
      </div>
    </div>
  );
};

export default ProjectSelection;
