import { useState, useEffect } from 'react';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import NavBar from './components/NavBar.js';
import AppTheme from '../theme/AppTheme.js';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import { Select, MenuItem } from '@mui/material';

export default function NewRecipeConfirmation() {
    return (
        <AppTheme {...props}>
          <CssBaseline enableColorScheme />
          <NavBar />
          <Container
            maxWidth="lg"
            component="main"
            sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
          >
            <h1></h1>
          </Container>
        </AppTheme>
    );
}