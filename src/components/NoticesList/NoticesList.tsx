import s from "./NoticesList.module.css";
import { Pet } from "../../utils/types";
import NoticesItem from "../NoticesItem/NoticesItem";
import clsx from "clsx";

interface NoticesListProps {
  notices: Pet[];
  variant: "notice" | "favorite" | "viewed";
  className?: string;
}

const NoticesList: React.FC<NoticesListProps> = ({
  notices,
  variant,
  className,
}) => {
  return (
    <ul className={clsx(s.noticesList, className)}>
      {notices.map((pet) => (
        <li className={s.noticesItem} key={pet._id}>
          <NoticesItem pet={pet} variant={variant} />
        </li>
      ))}
    </ul>
  );
};

export default NoticesList;
