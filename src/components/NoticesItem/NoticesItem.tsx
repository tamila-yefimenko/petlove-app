import clsx from "clsx";
import { Pet } from "../../utils/types";
import Button from "../Button/Button";
import s from "./NoticesItem.module.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { useState } from "react";
import ModalAttention from "../ModalAttention/ModalAttention";
import { fetchNoticeById } from "../../redux/notices/operations";
import { selectCurrentNotice } from "../../redux/notices/selectors";
import ModalNotice from "../ModalNotice/ModalNotice";
import ContactModal from "../ContactModal/ContactModal";
import { selectNoticesFavIds } from "../../redux/user/selectors";
import {
  addToFavorites,
  deleteFromFavorites,
} from "../../redux/user/operations";

interface NoticesItemProps {
  pet: Pet;
  variant: "notice" | "favorite" | "viewed";
}

const NoticesItem: React.FC<NoticesItemProps> = ({ pet, variant }) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const currentNotice = useAppSelector(selectCurrentNotice);
  const favorites = useAppSelector(selectNoticesFavIds);

  const isFavorite = favorites.includes(pet._id);

  const dispatch = useAppDispatch();

  const [showAttentionModal, setShowAttentionModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const handleLearnMoreClick = () => {
    if (!isLoggedIn) {
      setShowAttentionModal(true);
      return;
    }

    dispatch(fetchNoticeById(pet._id));
    setShowDetailsModal(true);
  };

  const handleFavourite = () => {
    if (!isLoggedIn) {
      setShowAttentionModal(true);
      return;
    }

    if (isFavorite) {
      dispatch(deleteFromFavorites(pet._id));
    } else {
      dispatch(addToFavorites(pet._id));
    }
  };

  const handleRemoveFavorite = () => {
    if (!isLoggedIn) {
      setShowAttentionModal(true);
      return;
    }
    if (isFavorite) {
      dispatch(deleteFromFavorites(pet._id));
    }
  };

  const handleOpenContact = () => {
    setShowDetailsModal(false);
    setShowContactModal(true);
  };

  return (
    <>
      <img className={s.noticesImg} src={pet.imgURL} alt="Items picture" />
      <div className={s.titleWrapper}>
        <h3 className={s.itemTitle}>{pet.title}</h3>
        <div className={s.pop}>
          <svg
            className={clsx(
              s.star,
              !pet.popularity ? s.starEmpty : s.starActive,
            )}>
            <use href="/icons/sprite.svg#icon-star" />
          </svg>
          {pet.popularity}
        </div>
      </div>

      <ul className={s.info}>
        <li className={s.item}>
          Name: <span className={s.span}>{pet.name}</span>
        </li>
        <li className={s.item}>
          Birthday:{" "}
          <span className={s.span}>
            {pet.birthday?.split("-").reverse().join(".")}
          </span>
        </li>
        <li className={s.item}>
          Sex: <span className={s.span}> {pet.sex}</span>
        </li>
        <li className={s.item}>
          Species: <span className={s.span}>{pet.species}</span>
        </li>
        <li className={s.item}>
          Category: <span className={s.span}>{pet.category}</span>
        </li>
      </ul>

      <p className={s.comment}>{pet.comment}</p>
      {pet.price ? (
        <p className={s.price}>$ {pet.price}</p>
      ) : (
        <p className={s.price}>$ Free</p>
      )}

      <div className={s.btnWrapper}>
        <Button className={s.button} onClick={handleLearnMoreClick}>
          Learn more
        </Button>
        {variant === "notice" && (
          <button className={s.heartBtn} onClick={handleFavourite}>
            <svg className={s.heart}>
              <use
                href={
                  isFavorite
                    ? "/icons/sprite.svg#icon-trash-2"
                    : "/icons/sprite.svg#icon-heart"
                }
              />
            </svg>
          </button>
        )}

        {variant === "favorite" && (
          <button className={s.heartBtn} onClick={handleRemoveFavorite}>
            <svg className={s.heart}>
              <use href={"/icons/sprite.svg#icon-trash-2"} />
            </svg>
          </button>
        )}

        {showAttentionModal && (
          <ModalAttention
            isOpen={showAttentionModal}
            onClose={() => setShowAttentionModal(false)}
          />
        )}

        {showDetailsModal && currentNotice && (
          <ModalNotice
            isOpen={showDetailsModal}
            notice={currentNotice}
            onClose={() => setShowDetailsModal(false)}
            isFavorite={isFavorite}
            onContact={handleOpenContact}
          />
        )}

        {showContactModal && currentNotice && (
          <ContactModal
            isOpen={showContactModal}
            notice={currentNotice}
            onClose={() => setShowContactModal(false)}
          />
        )}
      </div>
    </>
  );
};

export default NoticesItem;
