import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import s from "./Layout.module.css";

const Layout: React.FC = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <div className={s.layout}>
      {!isHome && <Header className={s.header} />}
      <main className={s.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
