import { useState } from "react";
import { Trash2 } from "lucide-react";

function ObjetivosFinancieros({
  objetivos,
  agregarObjetivo,
  eliminarObjetivo,
  aportarObjetivo
}) {
  const [formulario, setFormulario] = useState({
    nombre: "",
    meta: "",
    ahorrado: ""
  });

  const [aporte, setAporte] = useState({});

  const manejarCambio = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  const manejarSubmit = (e) => {
    e.preventDefault();

    if (!formulario.nombre || !formulario.meta) return;

    agregarObjetivo({
      id: Date.now(),
      nombre: formulario.nombre,
      meta: Number(formulario.meta),
      ahorrado: Number(formulario.ahorrado) || 0
    });

    setFormulario({
      nombre: "",
      meta: "",
      ahorrado: ""
    });
  };

  const manejarAporte = (id) => {
    const monto = Number(aporte[id]);

    if (!monto || monto <= 0) return;

    aportarObjetivo(id, monto);

    setAporte({
      ...aporte,
      [id]: ""
    });
  };

  return (
    <section>
      <h1>Objetivos Financieros</h1>

      <form
        className="formulario"
        onSubmit={manejarSubmit}
      >
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del objetivo"
          value={formulario.nombre}
          onChange={manejarCambio}
          required
        />

        <input
          type="number"
          name="meta"
          placeholder="Monto objetivo"
          value={formulario.meta}
          onChange={manejarCambio}
          required
        />

        <input
          type="number"
          name="ahorrado"
          placeholder="Monto ahorrado"
          value={formulario.ahorrado}
          onChange={manejarCambio}
        />

        <button type="submit">
          Agregar Objetivo
        </button>
      </form>

      <div className="objetivos-grid">
        {objetivos.length === 0 ? (
          <div className="empty-section">
            <h2>No hay objetivos todavía</h2>
            <p>
              Agrega una meta financiera para comenzar a planificar tus ahorros.
            </p>
          </div>
        ) : (
          objetivos.map((objetivo) => {
            const porcentaje = Math.min(
              (objetivo.ahorrado / objetivo.meta) * 100,
              100
            );

            return (
              <div
                className="objetivo-card"
                key={objetivo.id}
              >
                <div className="objetivo-header">
                  <h3>{objetivo.nombre}</h3>

                  <button
                    className="btn-eliminar"
                    onClick={() =>
                      eliminarObjetivo(objetivo.id)
                    }
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <p>
                  Ahorrado: RD${" "}
                  {objetivo.ahorrado.toLocaleString()}
                </p>

                <p>
                  Meta: RD${" "}
                  {objetivo.meta.toLocaleString()}
                </p>

                <div className="barra-progreso">
                  <div
                    className="progreso"
                    style={{
                      width: `${porcentaje}%`
                    }}
                  ></div>
                </div>

                <strong>
                  {porcentaje.toFixed(1)}% completado
                </strong>

                <div className="aporte-box">
                  <input
                    type="number"
                    placeholder="Monto a aportar"
                    value={aporte[objetivo.id] || ""}
                    onChange={(e) =>
                      setAporte({
                        ...aporte,
                        [objetivo.id]: e.target.value
                      })
                    }
                  />

                  <button
                    type="button"
                    onClick={() =>
                      manejarAporte(objetivo.id)
                    }
                  >
                    + Aportar
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}

export default ObjetivosFinancieros;