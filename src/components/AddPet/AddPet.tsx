import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import s from "./AddPet.module.css";

const AddPet = () => {
  const navigate = useNavigate();

  return (
    <Button
      className={s.button}
      onClick={() => {
        navigate("/add-pet");
      }}>
      Add Pet
      <svg className={s.icon}>
        <use href="/icons/sprite.svg#icon-plus" />
      </svg>
    </Button>
  );
};

export default AddPet;
