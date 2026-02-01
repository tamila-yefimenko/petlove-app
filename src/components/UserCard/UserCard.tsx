import { useState } from "react";
import EditUserBtn from "../EditUserBtn/EditUserBtn";
import PetsBlock from "../PetsBlock/PetsBlock";
import UserBlock from "../UserBlock/UserBlock";
import s from "./UserCard.module.css";
import ModalEditUser from "../ModalEditUser/ModalEditUser";
import LogOutBtn from "../LogOutBtn/LogOutBtn";

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
      <LogOutBtn className={s.button} onClick={() => {}} />

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
