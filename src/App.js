import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import MiReserva from './pages/MiReserva';
import Destinos from './pages/Destinos';
import Login from './pages/Login';
import Home from './pages/Home';
import Extras from './pages/Extras';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mi-reserva" element={<MiReserva />} />
          <Route path="/destinos" element={<Destinos />} />
          <Route path="/login" element={<Login />} />
          <Route path='/extras' element={<Extras />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
