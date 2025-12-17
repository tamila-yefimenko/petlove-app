import catIcon from "../../assets/images/cat-icon.png";
import s from "./ModalNotice.module.css";
import Button from "../Button/Button";
import ClearBtn from "../ClearBtn/ClearBtn";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Pet } from "../../utils/types";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectFavorites } from "../../redux/favorites/selectors";
import {
  addToFavorites,
  deleteFromFavorites,
} from "../../redux/favorites/operations";

export interface ModalNoticeProps {
  isOpen: boolean;
  onClose: () => void;
  notice: Pet;
  isFavorite: boolean;
}

const ModalNotice: React.FC<ModalNoticeProps> = ({
  isOpen,
  onClose,
  notice,
  isFavorite,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  //   const favorites = useAppSelector(selectFavorites);

  //   const isFavorite = favorites.includes(pet._id);

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

  const getStarsFromPopularity = (popularity = 0) => {
    if (popularity >= 1000) return 5;
    if (popularity >= 500) return 4;
    if (popularity >= 100) return 3;
    if (popularity >= 20) return 2;
    return 1;
  };

  const stars = getStarsFromPopularity(notice.popularity);

  const handleFavourite = () => {
    if (isFavorite) {
      dispatch(deleteFromFavorites(notice._id));
    } else {
      dispatch(addToFavorites(notice._id));
    }
  };

  return (
    <div className={s.backdrop} onClick={onClose}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <ClearBtn
          className={s.clearBtn}
          onClick={onClose}
          iconClassName={s.clearIcon}
        />

        <div className={s.imgWrapper}>
          <p className={s.category}>{notice.category}</p>
          <img
            className={s.noticeImg}
            src={notice.imgURL}
            alt="Items picture"
          />
        </div>

        <h3 className={s.title}>{notice.title}</h3>

        <div className={s.pop}>
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className={clsx(
                s.star,
                star <= stars ? s.starActive : s.starEmpty
              )}>
              <use href="/icons/sprite.svg#icon-star" />
            </svg>
          ))}

          <span className={s.popularity}>{notice.popularity}</span>
        </div>

        <ul className={s.info}>
          <li className={s.item}>
            Name: <span className={s.span}>{notice.name}</span>
          </li>
          <li className={s.item}>
            Birthday:{" "}
            <span className={s.span}>
              {notice.birthday?.split("-").reverse().join(".")}
            </span>
          </li>
          <li className={s.item}>
            Sex: <span className={s.span}> {notice.sex}</span>
          </li>
          <li className={s.item}>
            Species: <span className={s.span}>{notice.species}</span>
          </li>
        </ul>

        <p className={s.comment}>{notice.comment}</p>
        {notice.price ? (
          <p className={s.price}>$ {notice.price}</p>
        ) : (
          <p className={s.price}>$ Free</p>
        )}

        <div className={s.actions}>
          <Button className={s.button} size="medium" onClick={handleFavourite}>
            {isFavorite ? "Remove" : "Add to"}

            <svg className={s.heart}>
              <use
                href={
                  isFavorite
                    ? "/icons/sprite.svg#icon-trash-2"
                    : "/icons/sprite.svg#icon-heart"
                }
              />
            </svg>
          </Button>
          <Button
            className={s.button}
            variant="light"
            size="medium"
            onClick={() => navigate("/register")}>
            Contact
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalNotice;
