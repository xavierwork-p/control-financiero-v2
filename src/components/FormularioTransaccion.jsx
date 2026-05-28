import { useState } from "react";

function FormularioTransaccion({
  agregarTransaccion
}) {

  const [formulario, setFormulario] =
    useState({

      texto: "",
      monto: "",
      tipo: "gasto",
      categoria: "Comida",
      cuenta: "Banco",
      fecha: new Date()
        .toISOString()
        .split("T")[0]

    });

  // Manejar cambios
  const manejarCambio = (e) => {

    setFormulario({

      ...formulario,

      [e.target.name]:
        e.target.value

    });

  };

  // Enviar formulario
  const manejarSubmit = (e) => {

    e.preventDefault();

    const nuevoMonto =
      formulario.tipo === "gasto"
        ? -Math.abs(formulario.monto)
        : Number(formulario.monto);

    agregarTransaccion({

      id: Date.now(),

      texto: formulario.texto,

      monto: nuevoMonto,

      categoria:
        formulario.categoria,

      cuenta:
        formulario.cuenta,

      fecha:
        formulario.fecha

    });

    // Reinicia formulario
    setFormulario({

      texto: "",
      monto: "",
      tipo: "gasto",
      categoria: "Comida",
      cuenta: "Banco",
      fecha: new Date()
    .toISOString()
    .split("T")[0]

    });

  };

  return (

    <form
      className="formulario"
      onSubmit={manejarSubmit}
    >

      <input
        type="text"
        name="texto"
        placeholder="Descripción"
        value={formulario.texto}
        onChange={manejarCambio}
        required
      />

      <input
        type="number"
        name="monto"
        placeholder="Monto"
        value={formulario.monto}
        onChange={manejarCambio}
        required
      />

      <select
        name="tipo"
        value={formulario.tipo}
        onChange={manejarCambio}
      >

        <option value="gasto">
          Gasto
        </option>

        <option value="ingreso">
          Ingreso
        </option>

      </select>

      <select
        name="categoria"
        value={formulario.categoria}
        onChange={manejarCambio}
      >

        <option>Comida</option>
        <option>Transporte</option>
        <option>Salario</option>
        <option>Ahorro</option>
        <option>Ocio</option>
        <option>Servicios</option>

      </select>

      <select
        name="cuenta"
        value={formulario.cuenta}
        onChange={manejarCambio}
      >

        <option>Banco</option>
        <option>Efectivo</option>

      </select>

      <input
        type="date"
        name="fecha"
        value={formulario.fecha}
        onChange={manejarCambio}
        required
      />

      <button type="submit">

        Agregar Movimiento

      </button>

    </form>

  );

}

export default FormularioTransaccion;