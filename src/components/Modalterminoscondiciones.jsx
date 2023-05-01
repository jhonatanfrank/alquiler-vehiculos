import React, { useState } from "react";

const Modalterminoscondiciones = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Modal size="xl" show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <strong>Terminos y Condiciones</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Antes de continuar con tu pago, lee nuestras condiciones:</h3>
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
          </ol>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Modalterminoscondiciones;
