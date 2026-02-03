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

  const openLogoutModal = () => setIsLogoutOpen(true);
  const closeLogoutModal = () => setIsLogoutOpen(false);

  return (
    <div className={s.layout}>
      {isLoading && <Loader />}
      <Header
        className={isHome ? s.homeHeader : s.header}
        onLogoutClick={openLogoutModal}
      />

      <main className={s.main}>
        {isHome ? (
          <div className={s.homeHero}>
            <Outlet />
          </div>
        ) : (
          <Outlet context={{ openLogoutModal }} />
        )}
      </main>

      <LogoutController isOpen={isLogoutOpen} onClose={closeLogoutModal} />
    </div>
  );
};

export default Layout;
