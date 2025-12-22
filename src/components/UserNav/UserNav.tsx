import { useAppSelector } from "../../redux/hooks";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import UserBar from "../UserBar/UserBar";
import s from "./UserNav.module.css";
import LogOutBtn from "../LogOutBtn/LogOutBtn";

interface UserNavProps {
  isMobile?: boolean;
  isHome: boolean;
  onLogoutClick: () => void;
}

const UserNav: React.FC<UserNavProps> = ({
  isMobile = false,
  isHome,
  onLogoutClick,
}) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return (
    <div className={s.userWrapper}>
      {isLoggedIn && !isMobile && !isHome && (
        <LogOutBtn onClick={onLogoutClick} />
      )}
      {isLoggedIn && <UserBar showName={!isMobile} isHome={isHome} />}
    </div>
  );
};

export default UserNav;
