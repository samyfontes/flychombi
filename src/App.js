// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import MiReserva from './pages/MiReserva';
import Destinos from './pages/Destinos';
import Login from './pages/Login';
import Home from './pages/Home';
import Extras from './pages/Extras';
import InformacionPasajeros from './pages/InfoPasajeros';
import Registro from './pages/Registro';
import Nosotros from './pages/Nosotros';
import AdminVuelos from './pages/AdminVuelos';
import AdminUsuarios from './pages/AdminUsuarios';
import SearchResults from './pages/SearchResults';
import MetodosDePago from './pages/MetodosDePago';
import ConfirmacionCompra from './pages/ConfirmacionCompra';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mi-reserva" element={<MiReserva />} />
          <Route path="/destinos" element={<Destinos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path='/extras' element={<Extras />} />
          <Route path='/nosotros' element={<Nosotros />} />
          <Route path='/informacion-pasajeros' element={<InformacionPasajeros />} />
          <Route path='/admin/vuelos' element={<AdminVuelos />} />
          <Route path='/admin/usuarios' element={<AdminUsuarios />} />
          <Route path='/metodos-de-pago' element={<MetodosDePago />}/>
          <Route path="/results" element={<SearchResults />} />
          <Route path="/confirmacion-compra" element={<ConfirmacionCompra />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
