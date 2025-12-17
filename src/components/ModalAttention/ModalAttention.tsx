import dogIcon from "../../assets/images/dog-icon.webp";
import s from "./ModalAttention.module.css";
import Button from "../Button/Button";
import ClearBtn from "../ClearBtn/ClearBtn";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export interface ModalAttentionProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalAttention: React.FC<ModalAttentionProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <div className={s.backdrop} onClick={onClose}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <ClearBtn
          className={s.clearBtn}
          onClick={onClose}
          iconClassName={s.clearIcon}
        />

        <div className={s.imgWrapper}>
          <img src={dogIcon} alt="dog icon" width="44" height="44" />
        </div>

        <h3 className={s.title}>Attention</h3>

        <p className={s.text}>
          We would like to remind you that certain functionality is available
          only to authorized users. If you have an account, please log in with
          your credentials. If you do not already have an account, you must
          register to access these features.
        </p>

        <div className={s.actions}>
          <Button
            className={s.button}
            size="medium"
            onClick={() => navigate("/login")}>
            Log in
          </Button>
          <Button
            className={s.button}
            variant="light"
            size="medium"
            onClick={() => navigate("/register")}>
            Registration
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalAttention;
