/* base code taken from react component library template 
   https://github.com/mui/material-ui
*/

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import NavBar from './components/NavBar';
import MainContent from './components/MainContent';
import AppTheme from '../theme/AppTheme';

export default function Home(props) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <NavBar />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
      >
        <MainContent />
      </Container>
    </AppTheme>
  );
}
