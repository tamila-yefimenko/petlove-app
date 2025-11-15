import { useSelector } from "react-redux";
import AuthNav from "../AuthNav/AuthNav";
import Nav from "../Nav/Nav";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import LogOutBtn from "../LogOutBtn/LogOutBtn";
import s from "./Menu.module.css";
import { useEffect, useRef } from "react";

export interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const Menu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const menuRef = useRef<HTMLDivElement>(null);

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
        <div ref={menuRef} className={`${s.menu} ${isOpen ? s.open : ""}`}>
          <button className={s.button} type="button" onClick={onClose}>
            <svg className={s.iconClose}>
              <use href="/icons/sprite.svg#icon-x" />
            </svg>
          </button>
          <Nav vertical onClickItem={onClose} />
          {isLoggedIn ? (
            <LogOutBtn onClick={onClose} isMenu />
          ) : (
            <AuthNav onClickItem={onClose} isMenu vertical />
          )}
        </div>
      )}
    </>
  );
};

export default Menu;
