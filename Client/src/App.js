import { Box, Typography } from '@mui/material';
import './App.css';
import { Ticket } from './components/Ticket';
import { Train } from './components/Train';

function App() {
  return (
    <Box className="App">
      <Typography variant='h1' fontSize={'40px'} m={6} >My Ticket Book </Typography>
      <Ticket />
      {/* <Train /> */}
    </Box>
  );
}

export default App;
