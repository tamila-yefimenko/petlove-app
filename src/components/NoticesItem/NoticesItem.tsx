import clsx from "clsx";
import { Pet } from "../../utils/types";
import Button from "../Button/Button";
import s from "./NoticesItem.module.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { useEffect, useState } from "react";
import ModalAttention from "../ModalAttention/ModalAttention";
import { fetchNoticeById } from "../../redux/notices/operations";
import { selectCurrentNotice } from "../../redux/notices/selectors";
import { useParams } from "react-router-dom";
import ModalNotice from "../ModalNotice/ModalNotice";

interface NoticesItemProps {
  pet: Pet;
}

const NoticesItem: React.FC<NoticesItemProps> = ({ pet }) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const currentNotice = useAppSelector(selectCurrentNotice);
  const dispatch = useAppDispatch();
  // const { id } = useParams();

  const [showAttentionModal, setShowAttentionModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const handleLearnMoreClick = () => {
    if (!isLoggedIn) {
      setShowAttentionModal(true);
      return;
    }

    dispatch(fetchNoticeById(pet._id)); // або pet.id
    setShowDetailsModal(true);
  };

  const handleFavourite = () => {
    if (!isLoggedIn) {
      setShowAttentionModal(true);
    } else {
    }
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
              !pet.popularity ? s.starEmpty : s.starActive
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
        <button className={s.heartBtn} onClick={handleFavourite}>
          <svg className={s.heart}>
            <use href="/icons/sprite.svg#icon-heart" />
          </svg>
        </button>

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
          />
        )}
      </div>
    </>
  );
};

export default NoticesItem;
