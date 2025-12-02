import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import s from "./Layout.module.css";
import { useAppSelector } from "../../redux/hooks";
import { selectIsLoading } from "../../redux/global/selectors";

const Layout: React.FC = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const isLoading = useAppSelector(selectIsLoading);

  return (
    <div className={s.layout}>
      {!isHome && !isLoading && <Header className={s.header} />}
      <main className={s.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
