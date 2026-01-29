import { Pet } from "../../utils/types";
import s from "./PetsItem.module.css";

interface PetsItemProps {
  pet: Pet;
}

const PetsItem: React.FC<PetsItemProps> = ({ pet }) => {
  return (
    <>
      <img src={pet.imgURL} alt={pet.name} />
      <h3>{pet.title}</h3>
      <button>delete</button>
      <ul>
        <li>
          <h4>Name</h4>
          <p>{pet.name}</p>
        </li>
        <li>
          <h4>Birthday</h4>
          <p>{pet.birthday}</p>
        </li>
        <li>
          <h4>Sex</h4>
          <p>{pet.sex}</p>
        </li>
        <li>
          <h4>Species</h4>
          <p>{pet.species}</p>
        </li>
      </ul>
    </>
  );
};

export default PetsItem;
