import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import s from "./Layout.module.css";
import { useAppSelector } from "../../redux/hooks";
import { selectIsLoading } from "../../redux/global/selectors";
import Loader from "../Loader/Loader";
import { useState } from "react";
import LogoutController from "../LogoutController/LogoutController";

const Layout: React.FC = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const isLoading = useAppSelector(selectIsLoading);

  return (
    <div className={s.layout}>
      {isLoading && <Loader />}
      <Header
        className={isHome ? s.homeHeader : s.header}
        onLogoutClick={() => setIsLogoutOpen(true)}
      />

      <main className={s.main}>
        {isHome ? (
          <div className={s.homeHero}>
            <Outlet />
          </div>
        ) : (
          <Outlet />
        )}
      </main>

      <LogoutController
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
      />
    </div>
  );
};

export default Layout;
