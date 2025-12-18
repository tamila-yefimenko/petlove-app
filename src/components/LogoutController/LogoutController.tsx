import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../redux/hooks";
import { logoutThunk } from "../../redux/auth/operations";
import LogOutBtn from "../LogOutBtn/LogOutBtn";
import ModalApproveAction from "../ModalApproveAction/ModalApproveAction";
import { handleLogout } from "../../redux/authInterceptor/authInterceptor";

const LogoutController = ({ isMenu, vertical }: any) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirmLogout = async () => {
    try {
      await dispatch(logoutThunk()).unwrap();
      navigate("/");
    } catch (error) {
      await handleLogout("Something went wrong. You were logged out.", "/");
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <>
      <LogOutBtn
        onClick={() => setIsOpen(true)}
        isMenu={isMenu}
        vertical={vertical}
      />

      <ModalApproveAction
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
};

export default LogoutController;
