import { Trash2 } from "lucide-react";

function TransaccionesTabla({
  transacciones,
  eliminarTransaccion
}) {

  return (

    <div className="tabla-container">

      <table>

        <thead>

          <tr>

            <th>Descripción</th>
            <th>Categoría</th>
            <th>Cuenta</th>
            <th>Fecha</th>
            <th>Monto</th>
            <th>Acción</th>

          </tr>

        </thead>

        <tbody>

          {transacciones.map((item) => (

            <tr key={item.id}>

              <td>{item.texto}</td>

              <td>{item.categoria}</td>

              <td>{item.cuenta}</td>

              <td>{item.fecha}</td>

              <td
                className={
                  item.monto > 0
                    ? "ingreso"
                    : "gasto"
                }
              >

                ${item.monto}

              </td>

              <td>

                <button
                  className="btn-eliminar"
                  onClick={() =>
                    eliminarTransaccion(
                      item.id
                    )
                  }
                >

                  <Trash2 size={18} />

                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default TransaccionesTabla;