import { useAppSelector } from "../../redux/hooks";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import UserBar from "../UserBar/UserBar";
import LogOutBtn from "../LogOutBtn/LogOutBtn";
import s from "./UserNav.module.css";

interface UserNavProps {
  isMobile?: boolean;
}

const UserNav: React.FC<UserNavProps> = ({ isMobile = false }) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return (
    <div className={s.userWrapper}>
      {isLoggedIn && !isMobile && <LogOutBtn />}
      {isLoggedIn && <UserBar showName={!isMobile} />}
    </div>
  );
};

export default UserNav;
