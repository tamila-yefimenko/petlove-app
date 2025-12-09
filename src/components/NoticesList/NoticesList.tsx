import s from "./NoticesList.module.css";
import { Pet } from "../../utils/types";
import NoticesItem from "../NoticesItem/NoticesItem";

interface NoticesListProps {
  notices: Pet[];
}

const NoticesList: React.FC<NoticesListProps> = ({ notices }) => {
  return (
    <ul className={s.noticesList}>
      {notices.map((pet) => (
        <li className={s.noticesItem} key={pet._id}>
          <NoticesItem pet={pet} />
        </li>
      ))}
    </ul>
  );
};

export default NoticesList;
