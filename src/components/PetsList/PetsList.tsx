import { Pet } from "../../utils/types";
import PetsItem from "../PetsItem/PetsItem";
import s from "./PetsList.module.css";

interface PetsListProps {
  pets?: Pet[];
}

const PetsList: React.FC<PetsListProps> = ({ pets }) => {
  return (
    <ul>
      {pets?.map((pet) => (
        <li key={pet._id} className={s.item}>
          <PetsItem pet={pet} />
        </li>
      ))}
    </ul>
  );
};

export default PetsList;
