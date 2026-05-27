import { useState } from "react";

function FormularioTransaccion({
  agregarTransaccion
}) {

  // Estados del formulario
  const [texto, setTexto] = useState("");
  const [monto, setMonto] = useState("");

  // Maneja el submit
  const manejarSubmit = (e) => {

    e.preventDefault();

    // Validación simple
    if (!texto || !monto) return;

    // Crea nueva transacción
    agregarTransaccion({
      id: Date.now(),
      texto,
      monto: Number(monto)
    });

    // Limpia formulario
    setTexto("");
    setMonto("");

  };

  return (

    <form onSubmit={manejarSubmit}>

      <input
        type="text"
        placeholder="Descripción"
        value={texto}
        onChange={(e) =>
          setTexto(e.target.value)
        }
      />

      <input
        type="number"
        placeholder="Monto"
        value={monto}
        onChange={(e) =>
          setMonto(e.target.value)
        }
      />

      <button type="submit">
        Agregar
      </button>

    </form>

  );

}

export default FormularioTransaccion;