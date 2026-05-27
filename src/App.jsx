import { useEffect, useState } from "react";

import Balance from "./components/Balance";
import FormularioTransaccion from "./components/FormularioTransaccion";
import ListaTransacciones from "./components/ListaTransacciones";

import "./App.css";

function App() {

  // Estado principal
  const [transacciones, setTransacciones] =
    useState(() => {

      // Recupera datos guardados
      const guardadas =
        localStorage.getItem("transacciones");

      return guardadas
        ? JSON.parse(guardadas)
        : [];

    });

  // Guarda cambios en LocalStorage
  useEffect(() => {

    localStorage.setItem(
      "transacciones",
      JSON.stringify(transacciones)
    );

  }, [transacciones]);

  // Agregar transacción
  const agregarTransaccion = (
    transaccion
  ) => {

    setTransacciones([
      ...transacciones,
      transaccion
    ]);

  };

  // Eliminar transacción
  const eliminarTransaccion = (id) => {

    setTransacciones(
      transacciones.filter(
        item => item.id !== id
      )
    );

  };

  return (

    <div className="container">

      <h1>Control de Gastos</h1>

      <Balance
        transacciones={transacciones}
      />

      <FormularioTransaccion
        agregarTransaccion={
          agregarTransaccion
        }
      />

      <ListaTransacciones
        transacciones={transacciones}
        eliminarTransaccion={
          eliminarTransaccion
        }
      />

    </div>

  );

}

export default App;