import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar";
import DashboardCards from "./components/DashboardCards";
import TransaccionesTabla from "./components/TransaccionesTabla";
import FormularioTransaccion from "./components/FormularioTransaccion";
import GraficoCategorias from "./components/GraficoCategorias";
import GraficoMensual from "./components/GraficoMensual";

import "./styles/dashboard.css";

function App() {
  const [seccionActiva, setSeccionActiva] =
    useState("dashboard");

  const [transacciones, setTransacciones] =
    useState(() => {
      const guardadas =
        localStorage.getItem("transacciones");

      return guardadas
        ? JSON.parse(guardadas)
        : [];
    });

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
    setTransacciones(
      transacciones.filter(
        (item) => item.id !== id
      )
    );
  };

  const balance = transacciones.reduce(
    (acc, item) =>
      acc + Number(item.monto),
    0
  );

  const ingresos = transacciones
    .filter((item) => Number(item.monto) > 0)
    .reduce(
      (acc, item) =>
        acc + Number(item.monto),
      0
    );

  const gastos = transacciones
    .filter((item) => Number(item.monto) < 0)
    .reduce(
      (acc, item) =>
        acc + Number(item.monto),
      0
    );

  const banco = transacciones
    .filter((item) => item.cuenta === "Banco")
    .reduce(
      (acc, item) =>
        acc + Number(item.monto),
      0
    );

  const efectivo = transacciones
    .filter((item) => item.cuenta === "Efectivo")
    .reduce(
      (acc, item) =>
        acc + Number(item.monto),
      0
    );

  return (
    <div className="app-layout">
      <Sidebar
        seccionActiva={seccionActiva}
        cambiarSeccion={setSeccionActiva}
      />

      <main className="main-content">
        {seccionActiva === "dashboard" && (
          <>
            <h1>Dashboard Financiero</h1>

            <DashboardCards
              balance={balance}
              ingresos={ingresos}
              gastos={gastos}
              banco={banco}
              efectivo={efectivo}
            />

            <GraficoCategorias
              transacciones={transacciones}
            />

            <GraficoMensual
              transacciones={transacciones}
            />
          </>
        )}

        {seccionActiva === "transacciones" && (
          <>
            <h1>Transacciones</h1>

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
          </>
        )}

        {seccionActiva === "objetivos" && (
          <section className="empty-section">
            <h1>Objetivos Financieros</h1>
            <p>
              Aquí podrás agregar metas como comprar
              una lavadora, ahorrar para una laptop o
              crear un fondo de emergencia.
            </p>
          </section>
        )}

        {seccionActiva === "gastos-fijos" && (
          <section className="empty-section">
            <h1>Gastos Fijos</h1>
            <p>
              Aquí podrás registrar pagos recurrentes
              como internet, gimnasio, préstamos,
              servicios o alquiler.
            </p>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;