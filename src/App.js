import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";
import Inicio from "./pages/Inicio";
import Vehiculos from "./pages/Vehiculos";
import Contactanos from "./pages/Contactanos";
import Footer from "./components/Footer";
import Whatsappflotante from "./components/Whatsappflotante";
import Vehiculo from "./pages/Vehiculo";
import Error from "./components/Error";

//export const userContext = React.createContext();

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Whatsappflotante />
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/vehiculos" element={<Vehiculos />} />
            <Route path="/vehiculos/:id" element={<Vehiculo />} />
            <Route path="/contactanos" element={<Contactanos />} />
            <Route path="*" element={<Error />} />
          </Routes>
          <>
            <Footer />
          </>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
