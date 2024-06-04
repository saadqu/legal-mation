import { Grid } from '@mui/material';
import reactLogo from '../../assets/react.svg';
import viteLogo from '/vite.svg';

const NotFound: React.FC = () => {
  return (
    <>
      <Grid
        container
        my="2em"
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h2> Page you are looking for not found.</h2>
      </Grid>
    </>
  );
};

export { NotFound };
