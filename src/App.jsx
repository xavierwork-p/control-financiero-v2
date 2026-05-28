import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar";
import DashboardCards from "./components/DashboardCards";
import TransaccionesTabla from "./components/TransaccionesTabla";
import FormularioTransaccion from "./components/FormularioTransaccion";

import "./styles/dashboard.css";

function App() {

  // Estado principal
  const [transacciones, setTransacciones] =
    useState(() => {

      // Recupera datos guardados
      const guardadas =
        localStorage.getItem(
          "transacciones"
        );

      return guardadas
        ? JSON.parse(guardadas)
        : [];

    });

  // Guarda en LocalStorage
  useEffect(() => {

    localStorage.setItem(
      "transacciones",
      JSON.stringify(transacciones)
    );

  }, [transacciones]);

  const agregarTransaccion = (
  nuevaTransaccion
) => {

  setTransacciones([
    nuevaTransaccion,
    ...transacciones
  ]);

};
const eliminarTransaccion = (id) => {

  const nuevasTransacciones =
    transacciones.filter(
      item => item.id !== id
    );

  setTransacciones(
    nuevasTransacciones
  );

};


  


  // Balance total
  const balance = transacciones.reduce(
    (acc, item) =>
      acc + item.monto,
    0
  );

  // Ingresos
  const ingresos = transacciones
    .filter(item => item.monto > 0)
    .reduce(
      (acc, item) =>
        acc + item.monto,
      0
    );

  // Gastos
  const gastos = transacciones
    .filter(item => item.monto < 0)
    .reduce(
      (acc, item) =>
        acc + item.monto,
      0
    );

  return (

    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        <h1>
          Dashboard Financiero
        </h1>

        <DashboardCards
          balance={balance}
          ingresos={ingresos}
          gastos={gastos}
        />

        <FormularioTransaccion
          agregarTransaccion={
            agregarTransaccion
          }
        />

        <TransaccionesTabla
            transacciones={transacciones}
  eliminarTransaccion={
    eliminarTransaccion
  }
        />

      </main>

    </div>

  );

}

export default App;