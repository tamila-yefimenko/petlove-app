import clsx from "clsx";
import { TabType } from "../MyNotices/MyNotices";
import s from "./Tabs.module.css";

interface TabsProps {
  activeTab: TabType;
  onChange: (tab: TabType) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, onChange }) => {
  return (
    <div className={s.tabs}>
      <button
        className={clsx(s.tab, activeTab === "favorites" && s.active)}
        onClick={() => onChange("favorites")}>
        My favorite pets
      </button>

      <button
        className={clsx(s.tab, activeTab === "viewed" && s.active)}
        onClick={() => onChange("viewed")}>
        Viewed
      </button>
    </div>
  );
};

export default Tabs;
