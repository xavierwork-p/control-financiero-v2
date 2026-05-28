function DashboardCards({
  balance,
  ingresos,
  gastos
}) {

  return (

    <div className="cards-grid">

      <div className="card">

        <h3>Balance Total</h3>

        <h2>${balance}</h2>

      </div>

      <div className="card">

        <h3>Ingresos</h3>

        <h2 className="ingreso">
          +${ingresos}
        </h2>

      </div>

      <div className="card">

        <h3>Gastos</h3>

        <h2 className="gasto">
          ${gastos}
        </h2>

      </div>

    </div>

  );

}

export default DashboardCards;