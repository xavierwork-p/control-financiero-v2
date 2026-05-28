function DashboardCards({
  balance,
  ingresos,
  gastos,
  banco,
  efectivo
}) {
  return (
    <div className="cards-grid">
      <div className="card">
        <h3>Balance Total</h3>
        <h2>RD$ {balance.toLocaleString()}</h2>
      </div>

      <div className="card">
        <h3>Ingresos</h3>
        <h2 className="ingreso">
          RD$ {ingresos.toLocaleString()}
        </h2>
      </div>

      <div className="card">
        <h3>Gastos</h3>
        <h2 className="gasto">
          RD$ {Math.abs(gastos).toLocaleString()}
        </h2>
      </div>

      <div className="card">
        <h3>Banco</h3>
        <h2>RD$ {banco.toLocaleString()}</h2>
      </div>

      <div className="card">
        <h3>Efectivo</h3>
        <h2>RD$ {efectivo.toLocaleString()}</h2>
      </div>
    </div>
  );
}

export default DashboardCards;