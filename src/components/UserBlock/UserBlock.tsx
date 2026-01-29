import s from "./UserBlock.module.css";
import { useAppSelector } from "../../redux/hooks";
import {
  selectAvatar,
  selectEmail,
  selectName,
  selectPhone,
} from "../../redux/user/selectors";
import clsx from "clsx";

interface UserBlockProps {
  onClick: () => void;
}

const UserBlock: React.FC<UserBlockProps> = ({ onClick }) => {
  const name = useAppSelector(selectName);
  const email = useAppSelector(selectEmail);
  const phone = useAppSelector(selectPhone);
  const avatar = useAppSelector(selectAvatar);

  const renderItem = (value?: string, placeholder = "No info") => {
    const hasValue = Boolean(value?.trim());

    return (
      <li className={clsx(s.item, hasValue && s.itemValue)}>
        <p className={s.text}>{hasValue ? value : placeholder}</p>
      </li>
    );
  };

  return (
    <div className={s.userBlock}>
      <div className={s.iconWrapper}>
        <p className={s.user}>User</p>
        <svg className={s.icon}>
          <use href="/icons/sprite.svg#icon-user-02" />
        </svg>
      </div>
      <div className={s.avatarWrapper}>
        {avatar ? (
          <img src={avatar} alt={name} className={s.avatar} />
        ) : (
          <div className={s.bigIconWrapper}>
            <svg className={s.bigIcon}>
              <use href="/icons/sprite.svg#icon-user-02" />
            </svg>
          </div>
        )}
        {!avatar && (
          <button className={s.uploadButton} onClick={onClick}>
            Upload photo
          </button>
        )}
      </div>
      <h3 className={s.info}>My information</h3>
      <ul className={s.list}>
        {renderItem(name, "Name")}
        {renderItem(email, "name@gmail.com|")}
        {renderItem(phone, "+380")}
      </ul>
    </div>
  );
};

export default UserBlock;
