import clsx from "clsx";
import { Pet } from "../../utils/types";
import Button from "../Button/Button";
import s from "./NoticesItem.module.css";

interface NoticesItemProps {
  pet: Pet;
}

const NoticesItem: React.FC<NoticesItemProps> = ({ pet }) => {
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
        <p className={s.price}>Price negotiable</p>
      )}

      <div className={s.btnWrapper}>
        <Button className={s.button}>Learn more</Button>
        <button className={s.heartBtn}>
          <svg className={s.heart}>
            <use href="/icons/sprite.svg#icon-heart" />
          </svg>
        </button>
      </div>
    </>
  );
};

export default NoticesItem;
