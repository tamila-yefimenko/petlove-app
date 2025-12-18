import { useSelector } from "react-redux";
import AuthNav from "../AuthNav/AuthNav";
import Nav from "../Nav/Nav";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import s from "./Menu.module.css";
import { useEffect, useRef } from "react";
import clsx from "clsx";
import { useLocation } from "react-router-dom";
import LogoutController from "../LogoutController/LogoutController";

export interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
  isMobile?: boolean;
}

const Menu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const menuRef = useRef<HTMLDivElement>(null);

  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {isOpen && (
        <div
          ref={menuRef}
          className={clsx(s.menu, isOpen ? s.open : "", isHome && s.isHome)}>
          <button className={s.button} type="button" onClick={onClose}>
            <svg className={clsx(s.iconClose, isHome && s.homeBtn)}>
              <use href="/icons/sprite.svg#icon-x" />
            </svg>
          </button>
          <Nav vertical onClickItem={onClose} />
          {isLoggedIn ? (
            <LogoutController vertical isMenu onAfterLogout={onClose} />
          ) : (
            <AuthNav onClickItem={onClose} vertical isMenu isMobile />
          )}
        </div>
      )}
    </>
  );
};

export default Menu;
