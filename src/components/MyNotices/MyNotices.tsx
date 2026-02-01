import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import {
  selectNoticesFavorites,
  selectNoticesViewed,
} from "../../redux/user/selectors";
import Tabs from "../Tabs/Tabs";
import NoticesList from "../NoticesList/NoticesList";
import s from "./MyNotices.module.css";

export type TabType = "favorites" | "viewed";

const MyNotices = () => {
  const viewed = useAppSelector(selectNoticesViewed) ?? [];
  const favorites = useAppSelector(selectNoticesFavorites) ?? [];

  const [activeTab, setActiveTab] = useState<TabType>("favorites");

  const notices = activeTab === "favorites" ? favorites : viewed;
  const variant = activeTab === "favorites" ? "favorite" : "viewed";

  return (
    <div className={s.wrapper}>
      <Tabs activeTab={activeTab} onChange={setActiveTab} />
      {notices.length > 0 ? (
        <NoticesList className={s.list} notices={notices} variant={variant} />
      ) : (
        <p className={s.text}>
          Oops,
          <span className={s.span}>
            {" "}
            looks like there aren't any furries
          </span>{" "}
          on our adorable page yet. Do not worry! View your pets on the "find
          your favorite pet" page and add them to your favorites.
        </p>
      )}
    </div>
  );
};

export default MyNotices;
