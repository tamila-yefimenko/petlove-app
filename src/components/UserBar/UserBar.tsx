import { NavLink } from "react-router-dom";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";
import { useAppSelector } from "../../redux/hooks";
import s from "./UserBar.module.css";

interface UserBarProps {
  showName?: boolean;
  isHome: boolean;
}

const UserBar: React.FC<UserBarProps> = ({ showName = true, isHome }) => {
  const user = useAppSelector(selectUser);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return (
    <nav>
      {isLoggedIn && (
        <NavLink to={"/profile"} className={s.userNav}>
          <div className={s.userPreview}>
            <svg className={s.iconUser}>
              <use href="icons/sprite.svg#icon-user-02" />
            </svg>
          </div>
          {showName && (
            <p className={isHome ? s.homeName : s.userName}>{user.name}</p>
          )}
        </NavLink>
      )}
    </nav>
  );
};

export default UserBar;
