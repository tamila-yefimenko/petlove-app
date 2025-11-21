import { useAppSelector } from "../../redux/hooks";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import UserBar from "../UserBar/UserBar";
import LogOutBtn from "../LogOutBtn/LogOutBtn";
import s from "./UserNav.module.css";

interface UserNavProps {
  isMobile?: boolean;
  isHome: boolean;
}

const UserNav: React.FC<UserNavProps> = ({ isMobile = false, isHome }) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return (
    <div className={s.userWrapper}>
      {isLoggedIn && !isMobile && !isHome && <LogOutBtn />}
      {isLoggedIn && <UserBar showName={!isMobile} isHome={isHome} />}
    </div>
  );
};

export default UserNav;
