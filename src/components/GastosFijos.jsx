import { useState } from "react";

import {
  Trash2,
  Pencil
} from "lucide-react";

function GastosFijos({

  gastosFijos,
  agregarGastoFijo,
  eliminarGastoFijo,
  editarGastoFijo,

  gastosPlanificados,
  agregarGastoPlanificado,
  eliminarGastoPlanificado

}) {

  const [modoEdicion, setModoEdicion] =
    useState(null);

  const [formulario, setFormulario] =
    useState({

      nombre: "",
      monto: "",
      diaPago: "",
      categoria: "Servicios"

    });

  const [planificado, setPlanificado] =
    useState({

      nombre: "",
      monto: "",
      fecha: ""

    });

  const manejarCambio = (e) => {

    setFormulario({

      ...formulario,

      [e.target.name]:
        e.target.value

    });

  };

  const manejarPlanificado = (e) => {

    setPlanificado({

      ...planificado,

      [e.target.name]:
        e.target.value

    });

  };

  const manejarSubmit = (e) => {

    e.preventDefault();

    const nuevo = {

      id:
        modoEdicion || Date.now(),

      nombre:
        formulario.nombre,

      monto:
        Number(formulario.monto),

      diaPago:
        Number(formulario.diaPago),

      categoria:
        formulario.categoria

    };

    if (modoEdicion) {

      editarGastoFijo(nuevo);

      setModoEdicion(null);

    } else {

      agregarGastoFijo(nuevo);

    }

    setFormulario({

      nombre: "",
      monto: "",
      diaPago: "",
      categoria: "Servicios"

    });

  };

  const editarItem = (item) => {

    setModoEdicion(item.id);

    setFormulario({

      nombre: item.nombre,

      monto: item.monto,

      diaPago: item.diaPago,

      categoria: item.categoria

    });

  };

  const manejarPlanificadoSubmit = (e) => {

    e.preventDefault();

    agregarGastoPlanificado({

      id: Date.now(),

      nombre:
        planificado.nombre,

      monto:
        Number(planificado.monto),

      fecha:
        planificado.fecha

    });

    setPlanificado({

      nombre: "",
      monto: "",
      fecha: ""

    });

  };

  const totalMensual =
    gastosFijos.reduce(
      (acc, item) =>
        acc + item.monto,
      0
    );

  return (

    <section>

      <h1>
        Gastos Fijos
      </h1>

      <form
        className="formulario"
        onSubmit={manejarSubmit}
      >

        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formulario.nombre}
          onChange={manejarCambio}
          required
        />

        <input
          type="number"
          name="monto"
          placeholder="Monto mensual"
          value={formulario.monto}
          onChange={manejarCambio}
          required
        />

        <input
          type="number"
          name="diaPago"
          placeholder="Día de pago"
          value={formulario.diaPago}
          onChange={manejarCambio}
          required
        />

        <select
          name="categoria"
          value={formulario.categoria}
          onChange={manejarCambio}
        >

          <option>
            Servicios
          </option>

          <option>
            Suscripciones
          </option>

          <option>
            Préstamos
          </option>

          <option>
            Vivienda
          </option>

          <option>
            Transporte
          </option>

        </select>

        <button type="submit">

          {modoEdicion
            ? "Actualizar"
            : "Agregar Gasto"}

        </button>

      </form>

      <div className="gasto-fijo-total">

        <h2>
          Total mensual fijo
        </h2>

        <strong>
          RD$ {totalMensual.toLocaleString()}
        </strong>

      </div>

      <div className="objetivos-grid">

        {gastosFijos
          .sort(
            (a, b) =>
              a.diaPago - b.diaPago
          )
          .map((item) => (

            <div
              className="objetivo-card"
              key={item.id}
            >

              <div className="objetivo-header">

                <h3>
                  {item.nombre}
                </h3>

                <div className="acciones-card">

                  <button
                    className="btn-editar"
                    onClick={() =>
                      editarItem(item)
                    }
                  >

                    <Pencil size={18} />

                  </button>

                  <button
                    className="btn-eliminar"
                    onClick={() =>
                      eliminarGastoFijo(
                        item.id
                      )
                    }
                  >

                    <Trash2 size={18} />

                  </button>

                </div>

              </div>

              <p>
                Categoría:
                {" "}
                {item.categoria}
              </p>

              <p>
                Pago mensual:
                {" "}
                RD$
                {" "}
                {item.monto.toLocaleString()}
              </p>

              <p>
                Día de pago:
                {" "}
                {item.diaPago}
              </p>

            </div>

          ))}

      </div>

      <div className="separador-section">

        <h1>
          Gastos Planificados
        </h1>

      </div>

      <form
        className="formulario"
        onSubmit={
          manejarPlanificadoSubmit
        }
      >

        <input
          type="text"
          name="nombre"
          placeholder="Descripción"
          value={planificado.nombre}
          onChange={manejarPlanificado}
          required
        />

        <input
          type="number"
          name="monto"
          placeholder="Monto"
          value={planificado.monto}
          onChange={manejarPlanificado}
          required
        />

        <input
          type="date"
          name="fecha"
          value={planificado.fecha}
          onChange={manejarPlanificado}
          required
        />

        <button type="submit">

          Agregar Planificado

        </button>

      </form>

      <div className="objetivos-grid">

        {gastosPlanificados.map(
          (item) => (

            <div
              className="objetivo-card"
              key={item.id}
            >

              <div className="objetivo-header">

                <h3>
                  {item.nombre}
                </h3>

                <button
                  className="btn-eliminar"
                  onClick={() =>
                    eliminarGastoPlanificado(
                      item.id
                    )
                  }
                >

                  <Trash2 size={18} />

                </button>

              </div>

              <p>
                Monto:
                {" "}
                RD$
                {" "}
                {item.monto.toLocaleString()}
              </p>

              <p>
                Fecha:
                {" "}
                {item.fecha}
              </p>

            </div>

          )
        )}

      </div>

    </section>

  );

}

export default GastosFijos;