import { useAppSelector } from "../../redux/hooks";
import { selectPets } from "../../redux/user/selectors";
import AddPet from "../AddPet/AddPet";
import PetsList from "../PetsList/PetsList";
import s from "./PetsBlock.module.css";

const PetsBlock = () => {
  const pets = useAppSelector(selectPets);

  return (
    <>
      <div className={s.wrapper}>
        <h3>My pets</h3>
        <AddPet />
      </div>

      <PetsList pets={pets} />
    </>
  );
};

export default PetsBlock;
