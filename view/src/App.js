import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import CLogin from './componentPages/CLogin';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';

const theme = createTheme();

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/signup" element={<Signup/>} />

            <Route exact path="/c/login" element={<CLogin/>}/>

            <Route exact path="/404" element={<PageNotFound/>}/>
            <Route path="/*" element={<Navigate replace to='/404'/>}/>
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
