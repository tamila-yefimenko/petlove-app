import { NavLink } from "react-router-dom";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";
import { useAppSelector } from "../../redux/hooks";
import s from "./UserBar.module.css";
import { selectAvatar, selectIsLoaded } from "../../redux/user/selectors";
import clsx from "clsx";

interface UserBarProps {
  showName?: boolean;
  isHome: boolean;
}

const UserBar: React.FC<UserBarProps> = ({ showName = true, isHome }) => {
  const user = useAppSelector(selectUser);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const avatar = useAppSelector(selectAvatar);
  const isLoaded = useAppSelector(selectIsLoaded);

  if (!isLoggedIn) return null;

  return (
    <nav>
      <NavLink to={"/profile"} className={s.userNav}>
        <div className={s.userPreview}>
          {!isLoaded ? (
            <div
              className={clsx(
                s.avatarPlaceholder,
                isHome && s.homePlaceholder,
              )}></div>
          ) : avatar ? (
            <img className={s.avatar} src={avatar} alt="user avatar" />
          ) : (
            <svg className={s.iconUser}>
              <use href="icons/sprite.svg#icon-user-02" />
            </svg>
          )}
        </div>

        {showName && (
          <p className={isHome ? s.homeName : s.userName}>{user.name}</p>
        )}
      </NavLink>
    </nav>
  );
};

export default UserBar;
