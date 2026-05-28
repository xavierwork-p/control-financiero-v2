import { useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

function GraficoCategorias({ transacciones }) {
  const añoActual = new Date().getFullYear().toString();

  const [modoFiltro, setModoFiltro] = useState("total");
  const [añoSeleccionado, setAñoSeleccionado] = useState(añoActual);
  const [mesSeleccionado, setMesSeleccionado] = useState("01");

  const meses = [
    { valor: "01", nombre: "Enero" },
    { valor: "02", nombre: "Febrero" },
    { valor: "03", nombre: "Marzo" },
    { valor: "04", nombre: "Abril" },
    { valor: "05", nombre: "Mayo" },
    { valor: "06", nombre: "Junio" },
    { valor: "07", nombre: "Julio" },
    { valor: "08", nombre: "Agosto" },
    { valor: "09", nombre: "Septiembre" },
    { valor: "10", nombre: "Octubre" },
    { valor: "11", nombre: "Noviembre" },
    { valor: "12", nombre: "Diciembre" }
  ];

  const añosDisponibles = Array.from(
    new Set(
      transacciones
        .filter((item) => item.fecha)
        .map((item) => item.fecha.slice(0, 4))
    )
  ).sort((a, b) => b.localeCompare(a));

  if (!añosDisponibles.includes(añoActual)) {
    añosDisponibles.unshift(añoActual);
  }

  const transaccionesFiltradas = transacciones.filter((item) => {
    if (!item.fecha) return false;

    const año = item.fecha.slice(0, 4);
    const mes = item.fecha.slice(5, 7);

    if (modoFiltro === "total") return true;

    if (modoFiltro === "anio") {
      return año === añoSeleccionado;
    }

    if (modoFiltro === "mes") {
      return año === añoSeleccionado && mes === mesSeleccionado;
    }

    return true;
  });

  const gastos = transaccionesFiltradas.filter(
    (item) => Number(item.monto) < 0
  );

  const categorias = {};

  gastos.forEach((item) => {
    const categoria = item.categoria || "Sin categoría";
    const monto = Math.abs(Number(item.monto));

    categorias[categoria] = (categorias[categoria] || 0) + monto;
  });

  const data = Object.keys(categorias).map((categoria) => ({
    name: categoria,
    value: categorias[categoria]
  }));

  const totalGastos = data.reduce(
    (acc, item) => acc + item.value,
    0
  );

  const colores = [
    "#3b82f6",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#14b8a6"
  ];

  return (
    <div className="grafico-card">
      <div className="grafico-header">
        <h2>Gastos por Categoría</h2>

        <div className="filtros-grafico">
          <div className="selector-mes">
            <label>Vista del gráfico</label>

            <select
              value={modoFiltro}
              onChange={(e) => setModoFiltro(e.target.value)}
            >
              <option value="total">Total general</option>
              <option value="anio">Por año</option>
              <option value="mes">Por mes</option>
            </select>
          </div>

          {modoFiltro !== "total" && (
            <div className="selector-mes">
              <label>Año</label>

              <select
                value={añoSeleccionado}
                onChange={(e) => setAñoSeleccionado(e.target.value)}
              >
                {añosDisponibles.map((año) => (
                  <option key={año} value={año}>
                    {año}
                  </option>
                ))}
              </select>
            </div>
          )}

          {modoFiltro === "mes" && (
            <div className="selector-mes">
              <label>Mes a graficar</label>

              <select
                value={mesSeleccionado}
                onChange={(e) => setMesSeleccionado(e.target.value)}
              >
                {meses.map((mes) => (
                  <option key={mes.valor} value={mes.valor}>
                    {mes.nombre}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {data.length === 0 ? (
        <p>No hay gastos registrados para este filtro.</p>
      ) : (
        <div className="grafico-con-resumen">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
              >
                {data.map((item, index) => (
                  <Cell
                    key={item.name}
                    fill={colores[index % colores.length]}
                  />
                ))}
              </Pie>

              <Tooltip
                formatter={(value) =>
                  `RD$ ${value.toLocaleString()}`
                }
              />

              <Legend />
            </PieChart>
          </ResponsiveContainer>

          <div className="resumen-grafico">
            <h3>Detalle</h3>

            {data.map((item, index) => {
              const porcentaje =
                totalGastos > 0
                  ? ((item.value / totalGastos) * 100).toFixed(1)
                  : 0;

              return (
                <div className="resumen-item" key={item.name}>
                  <span
                    className="color-dot"
                    style={{
                      background: colores[index % colores.length]
                    }}
                  ></span>

                  <span>{item.name}</span>

                  <strong>
                    RD$ {item.value.toLocaleString()}
                  </strong>

                  <small>{porcentaje}%</small>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default GraficoCategorias;