import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../redux/hooks";
import { logoutThunk } from "../../redux/auth/operations";
import LogOutBtn from "../LogOutBtn/LogOutBtn";
import ModalApproveAction from "../ModalApproveAction/ModalApproveAction";
import { handleLogout } from "../../redux/authInterceptor/authInterceptor";

interface LogoutControllerProps {
  isOpen: boolean;
  onClose: () => void;
}

const LogoutController: React.FC<LogoutControllerProps> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleConfirmLogout = async () => {
    try {
      await dispatch(logoutThunk()).unwrap();
      navigate("/");
    } catch {
      await handleLogout("Something went wrong. You were logged out.", "/");
    } finally {
      onClose();
    }
  };

  return (
    <ModalApproveAction
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirmLogout}
    />
  );
};

export default LogoutController;
