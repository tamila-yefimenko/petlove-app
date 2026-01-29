import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import {
  selectNoticesFavourite,
  selectNoticesViewed,
} from "../../redux/user/selectors";

const MyNotices = () => {
  type TabType = "favorites" | "viewed";

  const viewed = useAppSelector(selectNoticesViewed);
  const favourites = useAppSelector(selectNoticesFavourite);

  const [activeTab, setActiveTab] = useState<TabType>("favorites");

  const notices = activeTab === "favorites" ? favourites : viewed;

  return <p>MyNotices</p>;
};

export default MyNotices;
