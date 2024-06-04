import { Outlet } from "react-router-dom";
import Navbar from './components/Navbar';
import { Grid } from "@mui/material";

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Outlet />
      </Grid>
    </>
  );
};

export { App };
