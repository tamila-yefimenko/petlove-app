import { logoutThunk } from "../../redux/auth/operations";
import { useAppDispatch } from "../../redux/hooks";
import Button from "../Button/Button";

export interface LogOutBtnProps {
  onClick?: () => void;
  isMenu?: boolean;
}

const LogOutBtn: React.FC<LogOutBtnProps> = ({ onClick, isMenu }) => {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    if (onClick) {
      onClick();
    }
  };

  return (
    <Button
      onClick={handleLogout}
      fullWidth={isMenu}
      size="small"
      variant="orange">
      Log out
    </Button>
  );
};

export default LogOutBtn;
