import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectSelection = () => {
  const [projects, setProjects] = useState();
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3001/proyectos')
      .then(res => {
        setProjects(res.data);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, []);  

  const handleProjectSelection = (e) => { 
    const projectId = e.target.value;
    setSelectedProject(projectId);
  };

  return (
    <div>
      <h2>Seleccione el proyecto:</h2>
      {loading ? <p>Cargando proyectos...</p> :
        <select onChange={handleProjectSelection} defaultValue="default">
          <option value="default">Seleccione un proyecto</option>
          {projects.map(project => (
            <option key={project.id_proyecto } value={project.id_proyecto }>{project.nombre_proyecto}</option>
          ))}
        </select>
      }
    </div>
  );
};

export default ProjectSelection;
