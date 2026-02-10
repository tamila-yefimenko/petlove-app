import { Pet } from "../../utils/types";
import s from "./PetsItem.module.css";

interface PetsItemProps {
  pet: Pet;
}

const PetsItem: React.FC<PetsItemProps> = ({ pet }) => {
  return (
    <>
      <img src={pet.imgURL} alt={pet.name} className={s.img} />

      <button className={s.trash}>
        <svg className={s.icon}>
          <use href={"/icons/sprite.svg#icon-trash-2"} />
        </svg>
      </button>
      <div className={s.wrapper}>
        <h3 className={s.petTitle}>{pet.title}</h3>
        <ul className={s.list}>
          <li className={s.item}>
            <h4 className={s.subtitle}>Name</h4>
            <p className={s.data}>{pet.name}</p>
          </li>
          <li className={s.item}>
            <h4 className={s.subtitle}>Birthday</h4>
            <p className={s.data}>
              {pet.birthday?.split("-").reverse().join(".")}
            </p>
          </li>
          <li className={s.item}>
            <h4 className={s.subtitle}>Sex</h4>
            <p className={s.data}>{pet.sex}</p>
          </li>
          <li className={s.item}>
            <h4 className={s.subtitle}>Species</h4>
            <p className={s.data}>{pet.species}</p>
          </li>
        </ul>
      </div>
    </>
  );
};

export default PetsItem;
