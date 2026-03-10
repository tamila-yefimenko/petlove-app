import s from "./NoticesList.module.css";
import { Pet } from "../../utils/types";
import NoticesItem from "../NoticesItem/NoticesItem";
import clsx from "clsx";
import { useAppSelector } from "../../redux/hooks";
import { selectIsListLoading } from "../../redux/global/selectors";
import SmallLoader from "../SmallLoader/SmallLoader";

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
  const isListLoading = useAppSelector(selectIsListLoading);

  return (
    <div className={s.wrapper}>
      {isListLoading && (
        <div className={s.loaderOverlay}>
          <SmallLoader />
        </div>
      )}

      <ul className={clsx(s.noticesList, className)}>
        {notices.map((pet) => (
          <li className={s.noticesItem} key={pet._id}>
            <NoticesItem pet={pet} variant={variant} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoticesList;
