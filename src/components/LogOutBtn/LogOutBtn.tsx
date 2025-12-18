import { useLocation } from "react-router-dom";
import Button from "../Button/Button";
import s from "./LogOutBtn.module.css";

export interface LogOutBtnProps {
  onClick?: () => void;
  isMenu?: boolean;
  vertical?: boolean;
}

const LogOutBtn: React.FC<LogOutBtnProps> = ({ onClick, isMenu, vertical }) => {
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

  return (
    <Button
      className={s.button}
      onClick={onClick}
      fullWidth={isMenu}
      size="small"
      variant={logOutVariant}>
      Log out
    </Button>
  );
};

export default LogOutBtn;
