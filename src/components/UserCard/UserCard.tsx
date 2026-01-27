import { useState } from "react";
import Button from "../Button/Button";
import EditUserBtn from "../EditUserBtn/EditUserBtn";
import PetsBlock from "../PetsBlock/PetsBlock";
import UserBlock from "../UserBlock/UserBlock";
import s from "./UserCard.module.css";
import ModalEditUser from "../ModalEditUser/ModalEditUser";

const UserCard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <div className={s.userCard}>
      <EditUserBtn onClick={handleModalOpen} />
      <UserBlock onClick={handleModalOpen} />
      <PetsBlock />
      <Button variant="light" size="medium" type="button" className={s.button}>
        log out
      </Button>
      {isModalOpen && (
        <ModalEditUser
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default UserCard;
