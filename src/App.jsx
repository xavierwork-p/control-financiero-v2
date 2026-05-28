import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar";
import DashboardCards from "./components/DashboardCards";
import TransaccionesTabla from "./components/TransaccionesTabla";
import FormularioTransaccion from "./components/FormularioTransaccion";
import GraficoCategorias from "./components/GraficoCategorias";
import GraficoMensual from "./components/GraficoMensual";
import ObjetivosFinancieros from "./components/ObjetivosFinancieros";
import GastosFijos from "./components/GastosFijos";

import "./styles/dashboard.css";

function App() {

  const [seccionActiva, setSeccionActiva] =
    useState("dashboard");

  // =========================
  // TRANSACCIONES
  // =========================

  const [transacciones, setTransacciones] =
    useState(() => {

      const guardadas =
        localStorage.getItem(
          "transacciones"
        );

      return guardadas
        ? JSON.parse(guardadas)
        : [];

    });

  // =========================
  // OBJETIVOS
  // =========================

  const [objetivos, setObjetivos] =
    useState(() => {

      const guardados =
        localStorage.getItem(
          "objetivos"
        );

      return guardados
        ? JSON.parse(guardados)
        : [];

    });

  // =========================
  // GASTOS FIJOS
  // =========================

  const [gastosFijos, setGastosFijos] =
    useState(() => {

      const guardados =
        localStorage.getItem(
          "gastosFijos"
        );

      return guardados
        ? JSON.parse(guardados)
        : [];

    });

  // =========================
  // GASTOS PLANIFICADOS
  // =========================

  const [
    gastosPlanificados,
    setGastosPlanificados
  ] = useState(() => {

    const guardados =
      localStorage.getItem(
        "gastosPlanificados"
      );

    return guardados
      ? JSON.parse(guardados)
      : [];

  });

  // =========================
  // LOCAL STORAGE
  // =========================

  useEffect(() => {

    localStorage.setItem(
      "transacciones",
      JSON.stringify(transacciones)
    );

  }, [transacciones]);

  useEffect(() => {

    localStorage.setItem(
      "objetivos",
      JSON.stringify(objetivos)
    );

  }, [objetivos]);

  useEffect(() => {

    localStorage.setItem(
      "gastosFijos",
      JSON.stringify(gastosFijos)
    );

  }, [gastosFijos]);

  useEffect(() => {

    localStorage.setItem(
      "gastosPlanificados",
      JSON.stringify(
        gastosPlanificados
      )
    );

  }, [gastosPlanificados]);

  // =========================
  // TRANSACCIONES
  // =========================

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

  // =========================
  // OBJETIVOS
  // =========================

  const agregarObjetivo = (
    nuevoObjetivo
  ) => {

    setObjetivos([
      nuevoObjetivo,
      ...objetivos
    ]);

  };

  const eliminarObjetivo = (id) => {

    setObjetivos(

      objetivos.filter(
        (item) => item.id !== id
      )

    );

  };

  const aportarObjetivo = (
    id,
    monto
  ) => {

    setObjetivos(

      objetivos.map(
        (objetivo) =>

          objetivo.id === id

            ? {

                ...objetivo,

                ahorrado:
                  objetivo.ahorrado +
                  monto

              }

            : objetivo
      )

    );

  };

  // =========================
  // GASTOS FIJOS
  // =========================

  const agregarGastoFijo = (
    nuevoGasto
  ) => {

    setGastosFijos([
      nuevoGasto,
      ...gastosFijos
    ]);

  };

  const eliminarGastoFijo = (id) => {

    setGastosFijos(

      gastosFijos.filter(
        (item) => item.id !== id
      )

    );

  };

  const editarGastoFijo = (
    gastoActualizado
  ) => {

    setGastosFijos(

      gastosFijos.map((item) =>

        item.id ===
        gastoActualizado.id

          ? gastoActualizado

          : item

      )

    );

  };

  // =========================
  // GASTOS PLANIFICADOS
  // =========================

  const agregarGastoPlanificado =
    (nuevoGasto) => {

      setGastosPlanificados([

        nuevoGasto,

        ...gastosPlanificados

      ]);

    };

  const eliminarGastoPlanificado =
    (id) => {

      setGastosPlanificados(

        gastosPlanificados.filter(
          (item) =>
            item.id !== id
        )

      );

    };

  // =========================
  // DASHBOARD
  // =========================

  const balance = transacciones.reduce(

    (acc, item) =>
      acc + Number(item.monto),

    0

  );

  const ingresos = transacciones

    .filter(
      (item) =>
        Number(item.monto) > 0
    )

    .reduce(

      (acc, item) =>
        acc + Number(item.monto),

      0

    );

  const gastos = transacciones

    .filter(
      (item) =>
        Number(item.monto) < 0
    )

    .reduce(

      (acc, item) =>
        acc + Number(item.monto),

      0

    );

  const banco = transacciones

    .filter(
      (item) =>
        item.cuenta === "Banco"
    )

    .reduce(

      (acc, item) =>
        acc + Number(item.monto),

      0

    );

  const efectivo = transacciones

    .filter(
      (item) =>
        item.cuenta === "Efectivo"
    )

    .reduce(

      (acc, item) =>
        acc + Number(item.monto),

      0

    );

  return (

    <div className="app-layout">

      <Sidebar
        seccionActiva={seccionActiva}
        cambiarSeccion={
          setSeccionActiva
        }
      />

      <main className="main-content">

        {seccionActiva ===
          "dashboard" && (

          <>

            <h1>
              Dashboard Financiero
            </h1>

            <DashboardCards
              balance={balance}
              ingresos={ingresos}
              gastos={gastos}
              banco={banco}
              efectivo={efectivo}
            />

            <GraficoCategorias
              transacciones={
                transacciones
              }
            />

            <GraficoMensual
              transacciones={
                transacciones
              }
            />

          </>

        )}

        {seccionActiva ===
          "transacciones" && (

          <>

            <h1>
              Transacciones
            </h1>

            <FormularioTransaccion
              agregarTransaccion={
                agregarTransaccion
              }
            />

            <TransaccionesTabla
              transacciones={
                transacciones
              }
              eliminarTransaccion={
                eliminarTransaccion
              }
            />

          </>

        )}

        {seccionActiva ===
          "objetivos" && (

          <ObjetivosFinancieros
            objetivos={objetivos}
            agregarObjetivo={
              agregarObjetivo
            }
            eliminarObjetivo={
              eliminarObjetivo
            }
            aportarObjetivo={
              aportarObjetivo
            }
          />

        )}

        {seccionActiva ===
          "gastos-fijos" && (

          <GastosFijos

            gastosFijos={
              gastosFijos
            }

            agregarGastoFijo={
              agregarGastoFijo
            }

            eliminarGastoFijo={
              eliminarGastoFijo
            }

            editarGastoFijo={
              editarGastoFijo
            }

            gastosPlanificados={
              gastosPlanificados
            }

            agregarGastoPlanificado={
              agregarGastoPlanificado
            }

            eliminarGastoPlanificado={
              eliminarGastoPlanificado
            }

          />

        )}

      </main>

    </div>

  );

}

export default App;