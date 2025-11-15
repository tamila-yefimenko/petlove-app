import Button from "../Button/Button";

export interface LogOutBtnProps {
  onClick?: () => void;
  isMenu?: boolean;
}

const LogOutBtn: React.FC<LogOutBtnProps> = ({ onClick, isMenu }) => {
  return (
    <Button onClick={onClick} fullWidth={isMenu} size="small" variant="orange">
      Log out
    </Button>
  );
};

export default LogOutBtn;
