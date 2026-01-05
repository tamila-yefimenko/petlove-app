import AddPet from "../AddPet/AddPet";
import PetsList from "../PetsList/PetsList";

const PetsBlock = () => {
  return (
    <>
      <h3>My pets</h3>
      <AddPet />
      <PetsList />
    </>
  );
};

export default PetsBlock;
