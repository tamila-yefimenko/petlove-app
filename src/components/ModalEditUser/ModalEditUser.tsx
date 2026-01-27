import { useEffect, useRef } from "react";
import s from "./ModalEditUser.module.css";
import ClearBtn from "../ClearBtn/ClearBtn";

interface ModalEditUserProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalEditUser: React.FC<ModalEditUserProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

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
        <h2>Edit information</h2>
      </div>
    </div>
  );
};

export default ModalEditUser;
