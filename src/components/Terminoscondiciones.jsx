import React, { useState } from "react";
import "../styles/Terminoscondiciones.css";
import { Link } from "react-router-dom";

const Terminoscondiciones = () => {
  const [isChecked, setIsChecked] = useState(false);

  function handleCheckboxChange(event) {
    setIsChecked(event.target.checked);
    console.log(event.target.checked);
  }

  return (
    <>
      <div className="container">
        <h1 className="titulo-h1">
          <strong>Términos y condiciones</strong>
        </h1>
        <h3>Antes de continuar con tu pago, lee nuestras condiciones:</h3>
        <div className="contenedor-box-shadow container-terminoscondiciones">
          <ol>
            <li>
              Si desea realizar alguna cancelación, cambio de horario, vehiculo
              u otro, debe acercarse personalmente a las oficinas de Rent Car´s
              ubicada en Av. Cesar Vallejo cruce con Av. Jorge Chavez, cuadra
              50.
            </li>
            <li>
              Al momento de usted recibir el vehiculo solicitado, debe de firmar
              las hojas que le entregará nuestro personal de flota, en el cual
              está detallada como se le está dejando el vehiculo, tanto al
              interior, como al exterior, herramientas, accesorios,
              funcionalidades, etc.
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
              maxime dolore labore, earum nisi nesciunt corporis minima illo nam
              dolores, impedit molestias culpa eveniet, inventore quas
              repudiandae necessitatibus! Unde, ipsam. Lorem ipsum, dolor sit
              amet consectetur adipisicing elit. Explicabo possimus labore esse
              quas recusandae quaerat itaque a, repellendus inventore soluta
              cumque numquam id commodi, minima praesentium corporis debitis
              ipsam dolor. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Doloremque ducimus aliquam laudantium totam laborum ut
              saepe, asperiores, nesciunt quasi consectetur non repudiandae
              accusamus. Dolorem, omnis quisquam! Itaque asperiores nesciunt
              libero.
            </li>
            <li>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora
              ab hic error cupiditate sit in sequi at unde a dolorem aut,
              perferendis ut non molestiae nemo inventore asperiores.
              Voluptatum, sit! Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Non, quam pariatur possimus architecto hic
              tempora nam eaque veritatis, earum quas commodi dolores illum
              ratione exercitationem nesciunt unde quia ducimus iure! Lorem
              ipsum dolor sit amet consectetur, adipisicing elit. Molestiae
              soluta similique, iure temporibus excepturi dicta aliquam
              voluptatum explicabo voluptas provident adipisci ex quasi eaque
              inventore! Eius nemo beatae necessitatibus explicabo!
            </li>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta
              quisquam, fugit, architecto non quasi reprehenderit pariatur ab,
              ipsa sunt numquam cumque. Fuga in animi facilis officiis
              inventore. Explicabo, consectetur exercitationem. Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Commodi hic soluta
              itaque magni id, architecto quam blanditiis in labore excepturi,
              doloremque inventore laborum! Commodi, cumque animi? Dolorem,
              assumenda fugiat? Nobis! Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Blanditiis illum dolorum, aliquam quam possimus
              amet at qui odit a quia sapiente sunt maxime mollitia quos
              delectus sed, eligendi quod autem.
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
              fuga, inventore et blanditiis odit quasi magni cum exercitationem
              expedita commodi explicabo pariatur, repellendus reprehenderit
              repudiandae harum obcaecati totam, facilis eaque. Lorem ipsum,
              dolor sit amet consectetur adipisicing elit. Impedit consequuntur
              vel, est perferendis vitae, amet perspiciatis temporibus ipsam
              sint nisi quia. Aliquam sapiente delectus deserunt molestias
              nesciunt voluptatum vitae at! Lorem ipsum dolor, sit amet
              consectetur adipisicing elit. Illum saepe consequatur magnam,
              eligendi laboriosam nam modi velit nostrum non repudiandae atque
              molestias inventore fugiat officiis eos porro sunt labore ea!
            </li>
          </ol>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}   
          />
          <label className="form-check-label" id="mi-checkbox">
            Acepto los terminos y condiciones
          </label>
        </div>

        <div className="contenedor-button ">
          <button className="btn btn-dark ml-auto btn-sm p-2">
            <Link to="/Resumenalquiler">Siguiente</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Terminoscondiciones;
