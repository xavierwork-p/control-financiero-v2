function Balance({ transacciones }) {

  // Total general
  const total = transacciones.reduce(
    (acc, item) => acc + item.monto,
    0
  );

  // Ingresos
  const ingresos = transacciones
    .filter(item => item.monto > 0)
    .reduce((acc, item) =>
      acc + item.monto, 0);

  // Gastos
  const gastos = transacciones
    .filter(item => item.monto < 0)
    .reduce((acc, item) =>
      acc + item.monto, 0);

  return (

    <div className="balance-card">

      <h2>Balance Total</h2>

      <h1>${total}</h1>

      <div className="resumen">

        <div>
          <h3>Ingresos</h3>
          <p className="ingreso">
            +${ingresos}
          </p>
        </div>

        <div>
          <h3>Gastos</h3>
          <p className="gasto">
            ${gastos}
          </p>
        </div>

      </div>

    </div>

  );

}

export default Balance;