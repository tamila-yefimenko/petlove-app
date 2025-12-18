import { useAppSelector } from "../../redux/hooks";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import UserBar from "../UserBar/UserBar";
import s from "./UserNav.module.css";
import LogoutController from "../LogoutController/LogoutController";

interface UserNavProps {
  isMobile?: boolean;
  isHome: boolean;
}

const UserNav: React.FC<UserNavProps> = ({ isMobile = false, isHome }) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return (
    <div className={s.userWrapper}>
      {isLoggedIn && !isMobile && !isHome && <LogoutController />}
      {isLoggedIn && <UserBar showName={!isMobile} isHome={isHome} />}
    </div>
  );
};

export default UserNav;
