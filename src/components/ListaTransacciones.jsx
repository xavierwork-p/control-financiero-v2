function ListaTransacciones({
  transacciones,
  eliminarTransaccion
}) {

  return (

    <div>

      {transacciones.map((item) => (

        <div
          key={item.id}
          className="transaccion-item"
        >

          <span>{item.texto}</span>

          <span>${item.monto}</span>

          <button
            onClick={() =>
              eliminarTransaccion(item.id)
            }
          >
            X
          </button>

        </div>

      ))}

    </div>

  );

}

export default ListaTransacciones;