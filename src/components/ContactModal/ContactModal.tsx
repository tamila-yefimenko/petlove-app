import dogIcon from "../../assets/images/dog-icon.webp";
import s from "./ContactModal.module.css";
import Button from "../Button/Button";
import ClearBtn from "../ClearBtn/ClearBtn";
import { useEffect, useRef } from "react";

import { Pet } from "../../utils/types";

export interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  notice: Pet;
}

const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  notice,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const phone = notice.user?.phone;
  const email = notice.user?.email;

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
          <img
            className={s.noticeImg}
            src={notice.imgURL}
            alt="Items picture"
          />
        </div>

        <h3 className={s.title}>Contact owner</h3>

        <p className={s.text}>
          Choose a convenient way to contact the pet owner
        </p>

        <div className={s.actions}>
          {phone && (
            <a href={`tel:${phone}`} className={s.link}>
              <Button size="medium" className={s.button}>
                Call
              </Button>
            </a>
          )}

          {email && (
            <a href={`mailto:${email}`} className={s.link}>
              <Button size="medium" variant="light" className={s.button}>
                Write
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
