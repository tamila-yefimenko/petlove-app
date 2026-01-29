import Button from "../Button/Button";
import s from "./AddPet.module.css";

const AddPet = () => {
  return (
    <Button className={s.button}>
      Add Pet
      <svg className={s.icon}>
        <use href="/icons/sprite.svg#icon-plus" />
      </svg>
    </Button>
  );
};

export default AddPet;
