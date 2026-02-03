import { useState } from "react";
import EditUserBtn from "../EditUserBtn/EditUserBtn";
import PetsBlock from "../PetsBlock/PetsBlock";
import UserBlock from "../UserBlock/UserBlock";
import s from "./UserCard.module.css";
import ModalEditUser from "../ModalEditUser/ModalEditUser";
import LogOutBtn from "../LogOutBtn/LogOutBtn";
import { useAppSelector } from "../../redux/hooks";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { useOutletContext } from "react-router-dom";

type OutletContextType = {
  openLogoutModal: () => void;
};

const UserCard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { openLogoutModal } = useOutletContext<OutletContextType>();

  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <div className={s.userCard}>
      <EditUserBtn onClick={handleModalOpen} />
      <UserBlock onClick={handleModalOpen} />
      <PetsBlock />
      {isLoggedIn && (
        <LogOutBtn className={s.button} onClick={openLogoutModal} />
      )}

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
