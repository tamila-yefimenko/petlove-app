import { useLocation } from "react-router-dom";
import { logoutThunk } from "../../redux/auth/operations";
import { useAppDispatch } from "../../redux/hooks";
import Button from "../Button/Button";
import s from "./LogOutBtn.module.css";

export interface LogOutBtnProps {
  onClick?: () => void;
  isMenu?: boolean;
  vertical?: boolean;
}

const LogOutBtn: React.FC<LogOutBtnProps> = ({ onClick, isMenu, vertical }) => {
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const isHome = pathname === "/";

  function getVariant(vertical: boolean, isHome: boolean) {
    if (vertical) {
      return isHome ? "orange" : "transparent";
    } else {
      return "orange";
    }
  }
  const logOutVariant = getVariant(Boolean(vertical), isHome);

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    if (onClick) {
      onClick();
    }
  };

  return (
    <Button
      className={s.button}
      onClick={handleLogout}
      fullWidth={isMenu}
      size="small"
      variant={logOutVariant}>
      Log out
    </Button>
  );
};

export default LogOutBtn;
