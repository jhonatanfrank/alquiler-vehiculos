import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Pasarelapago = () => {
  return (
    <>
      <h4>Hola</h4>
      <PayPalScriptProvider options={{"client-id":"AToluyf4XSESQiipKwlLMjBvHEkjr7v_N1ywOKursYBqTYvUF-pYbZspkxprO9vP4SOIhDUaKLhbu_K_"}}>
        <PayPalButtons 
                        createOrder={(data, actions) => {
                          return actions.order
                              .create({
                                  purchase_units: [
                                      {
                                          amount: {
                                              value: "5000.00",
                                          },
                                      },
                                  ],
                              })
                              .then((orderId) => {
                                  // Your code here after create the order
                                  return orderId;
                              });
                      }}/>
      </PayPalScriptProvider>
    </>
  );
};

export default Pasarelapago;
