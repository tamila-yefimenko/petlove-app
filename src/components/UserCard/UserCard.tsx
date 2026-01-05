import EditUserBtn from "../EditUserBtn/EditUserBtn";
import LogOutBtn from "../LogOutBtn/LogOutBtn";
import PetsBlock from "../PetsBlock/PetsBlock";
import UserBlock from "../UserBlock/UserBlock";

const UserCard = () => {
  return (
    <>
      <EditUserBtn />
      <UserBlock />
      <PetsBlock />
      <LogOutBtn />
    </>
  );
};

export default UserCard;
