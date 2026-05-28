import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from "recharts";

function GraficoMensual({ transacciones }) {
  const meses = {};

  transacciones.forEach((item) => {
    if (!item.fecha) return;

    const fecha = new Date(item.fecha);
    const mes = fecha.toLocaleDateString("es-DO", {
      month: "short",
      year: "numeric"
    });

    if (!meses[mes]) {
      meses[mes] = {
        mes,
        ingresos: 0,
        gastos: 0
      };
    }

    if (Number(item.monto) > 0) {
      meses[mes].ingresos += Number(item.monto);
    } else {
      meses[mes].gastos += Math.abs(Number(item.monto));
    }
  });

  const data = Object.values(meses);

  if (data.length === 0) {
    return (
      <div className="grafico-card grafico-mensual">
        <h2>Ingresos vs Gastos por Mes</h2>
        <p>No hay datos suficientes todavía.</p>
      </div>
    );
  }

  return (
    <div className="grafico-card grafico-mensual">
      <h2>Ingresos vs Gastos por Mes</h2>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="mes" />

          <YAxis />

          <Tooltip
            formatter={(value) =>
              `RD$ ${value.toLocaleString()}`
            }
          />

          <Legend />

          <Bar
            dataKey="ingresos"
            name="Ingresos"
            fill="#22c55e"
          />

          <Bar
            dataKey="gastos"
            name="Gastos"
            fill="#ef4444"
          />
        </BarChart>
      </ResponsiveContainer>

      <div className="resumen-grafico resumen-mensual">
        <h3>Resumen mensual</h3>

        {data.map((item) => (
          <div
            className="resumen-item mensual"
            key={item.mes}
          >
            <span>{item.mes}</span>

            <strong className="ingreso">
              Ingresos: RD$ {item.ingresos.toLocaleString()}
            </strong>

            <strong className="gasto">
              Gastos: RD$ {item.gastos.toLocaleString()}
            </strong>

            <small>
              Balance: RD${" "}
              {(item.ingresos - item.gastos).toLocaleString()}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GraficoMensual;