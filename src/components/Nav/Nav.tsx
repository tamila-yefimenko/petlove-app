import { NavLink, useLocation } from "react-router-dom";
import s from "./Nav.module.css";
import clsx from "clsx";

interface NavProps {
  vertical?: boolean;
  onClickItem?: () => void;
}

const Nav: React.FC<NavProps> = ({ vertical, onClickItem }) => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const setActiveClass = ({ isActive }: { isActive: boolean }) => {
    return clsx(
      s.navItem,
      isActive && s.active,
      isHome && s.isHome,
      vertical && s.verticalItem
    );
  };

  return (
    <nav className={clsx(s.nav, vertical && s.vertical)}>
      <NavLink to="/news" className={setActiveClass} onClick={onClickItem}>
        News
      </NavLink>
      <NavLink to="/notices" className={setActiveClass} onClick={onClickItem}>
        Find pet
      </NavLink>
      <NavLink to="/friends" className={setActiveClass} onClick={onClickItem}>
        Our friends
      </NavLink>
    </nav>
  );
};

export default Nav;
