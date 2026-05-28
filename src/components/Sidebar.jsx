import {
  LayoutDashboard,
  ArrowLeftRight,
  Target,
  Wallet
} from "lucide-react";

function Sidebar({
  seccionActiva,
  cambiarSeccion
}) {
  return (
    <aside className="sidebar">
      <h2 className="logo">
        Control Financiero
      </h2>

      <nav>
        <ul>
          <li
            className={
              seccionActiva === "dashboard"
                ? "active"
                : ""
            }
            onClick={() =>
              cambiarSeccion("dashboard")
            }
          >
            <LayoutDashboard size={18} />
            Dashboard
          </li>

          <li
            className={
              seccionActiva === "transacciones"
                ? "active"
                : ""
            }
            onClick={() =>
              cambiarSeccion("transacciones")
            }
          >
            <ArrowLeftRight size={18} />
            Transacciones
          </li>

          <li
            className={
              seccionActiva === "objetivos"
                ? "active"
                : ""
            }
            onClick={() =>
              cambiarSeccion("objetivos")
            }
          >
            <Target size={18} />
            Objetivos
          </li>

          <li
            className={
              seccionActiva === "gastos-fijos"
                ? "active"
                : ""
            }
            onClick={() =>
              cambiarSeccion("gastos-fijos")
            }
          >
            <Wallet size={18} />
            Gastos Fijos
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;