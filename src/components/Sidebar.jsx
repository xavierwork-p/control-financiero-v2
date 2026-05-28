import {
  LayoutDashboard,
  ArrowLeftRight,
  Target,
  Wallet
} from "lucide-react";

function Sidebar() {

  return (

    <aside className="sidebar">

      <h2 className="logo">
        Control Financiero
      </h2>

      <nav>

        <ul>

          <li>
            <LayoutDashboard size={18} />
            Dashboard
          </li>

          <li>
            <ArrowLeftRight size={18} />
            Transacciones
          </li>

          <li>
            <Target size={18} />
            Objetivos
          </li>

          <li>
            <Wallet size={18} />
            Gastos Fijos
          </li>

        </ul>

      </nav>

    </aside>

  );

}

export default Sidebar;