import clsx from "clsx";
import catIcon from "../../assets/images/cat-icon.png";
import s from "./ModalApproveAction.module.css";
import Button from "../Button/Button";
import ClearBtn from "../ClearBtn/ClearBtn";

export interface ModalApproveActionProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalApproveAction: React.FC<ModalApproveActionProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <div className={s.backdrop} onClick={onClose}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <ClearBtn
          className={s.button}
          onClick={onClose}
          iconClassName={s.icon}
        />

        <div className={s.imgWrapper}>
          <img src={catIcon} alt="cat icon" width="44" height="44" />
        </div>

        <h3 className={s.title}>Attention</h3>

        <p className={s.text}>
          We would like to remind you that certain functionality is available
          only to authorized users. If you have an account, please log in with
          your credentials. If you do not already have an account, you must
          register to access these features.
        </p>

        <div className={s.actions}>
          <Button>Log in</Button>
          <Button>Registration</Button>
        </div>
      </div>
    </div>
  );
};

export default ModalApproveAction;
