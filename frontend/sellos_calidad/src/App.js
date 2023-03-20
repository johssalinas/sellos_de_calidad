import React from "react";
import { Grid, Container } from "@mui/material";
import ProjectSelection from "./componentes/proyectos";

const App = () => {

  return <Grid container spacing={2} component="main">
    <Container>
        <ProjectSelection />
    </Container>
  </Grid>;
};

export default App;
