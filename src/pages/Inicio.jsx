import React, { useState } from "react";
import Carousel from "../components/Carousel";
import Calidadeficiencia from "../components/Calidadeficiencia";
import Quienessomos from "../components/Quienessomos";
import Testimonios from "../components/Testimonios";
const Inicio = () => {

  return (
    <div>
      <Carousel />
      <Quienessomos />
      <Calidadeficiencia />
      <Testimonios />

    </div>
  );
};

export default Inicio;
