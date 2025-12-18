import catIcon from "../../assets/images/cat-icon.png";
import s from "./ModalApproveAction.module.css";
import Button from "../Button/Button";
import ClearBtn from "../ClearBtn/ClearBtn";
import { useEffect, useRef } from "react";
import { useAppDispatch } from "../../redux/hooks";

import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal-root")!;

export interface ModalApproveActionProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ModalApproveAction: React.FC<ModalApproveActionProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

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

  if (!isOpen) return null;

  return createPortal(
    <div className={s.backdrop} onClick={onClose}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <ClearBtn
          className={s.clearBtn}
          onClick={onClose}
          iconClassName={s.clearIcon}
        />

        <div className={s.imgWrapper}>
          <img src={catIcon} alt="cat icon" width="44" height="44" />
        </div>

        <h3 className={s.title}>Already leaving?</h3>

        <div className={s.actions}>
          <Button className={s.button} size="medium" onClick={onConfirm}>
            Yes
          </Button>
          <Button
            className={s.button}
            variant="gray"
            size="medium"
            onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default ModalApproveAction;
