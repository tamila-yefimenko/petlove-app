import { selectIsListLoading } from "../../redux/global/selectors";
import { useAppSelector } from "../../redux/hooks";
import { Pet } from "../../utils/types";
import PetsItem from "../PetsItem/PetsItem";
import PetsItemSkeleton from "../PetsItemSkeleton/PetsItemSkeleton";
import s from "./PetsList.module.css";

interface PetsListProps {
  pets?: Pet[];
}

const PetsList: React.FC<PetsListProps> = ({ pets }) => {
  const isListLoading = useAppSelector(selectIsListLoading);

  return (
    <ul className={s.petsList}>
      {isListLoading
        ? Array.from({ length: 2 }).map((_, index) => (
            <li className={s.item} key={index}>
              <PetsItemSkeleton />
            </li>
          ))
        : pets?.map((pet) => (
            <li key={pet._id} className={s.item}>
              <PetsItem pet={pet} />
            </li>
          ))}
    </ul>
  );
};

export default PetsList;
