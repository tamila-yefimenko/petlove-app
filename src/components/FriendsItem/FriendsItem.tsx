import { Link } from "react-router-dom";
import { Friend } from "../../utils/types";
import s from "./FriendsItem.module.css";

interface FriendsItemProps {
  friend: Friend;
}

const FriendsItem: React.FC<FriendsItemProps> = ({ friend }) => {
  const workDays = friend.workDays;
  const weekendDays = workDays?.filter((day) => day.isOpen);

  const workingHours =
    !weekendDays || weekendDays.length === 0
      ? "Day and night"
      : `${weekendDays[0].from} - ${weekendDays[0].to}`;

  const emailHref = friend.email ? `mailto:${friend.email}` : null;
  const phoneHref = friend.phone ? `tel:${friend.phone}` : null;
  const mapHref = friend.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        friend.address
      )}`
    : null;

  return (
    <>
      <p className={s.hours}>{workingHours}</p>
      <img className={s.image} src={friend.imageUrl} />
      <div className={s.content}>
        <h3 className={s.title}>{friend.title}</h3>

        <a
          className={s.link}
          href={emailHref || "#"}
          target="_blank"
          rel="noopener noreferrer">
          <span className={s.span}>Email: </span>
          {friend.email || "no email"}
        </a>

        <a
          className={s.link}
          href={mapHref || "#"}
          target="_blank"
          rel="noopener noreferrer">
          <span className={s.span}>Address: </span>
          {friend.address || "website only"}
        </a>

        <a
          className={s.link}
          href={phoneHref || "#"}
          target="_blank"
          rel="noopener noreferrer">
          <span className={s.span}>Phone: </span>
          {friend.phone || "email only"}
        </a>
      </div>
    </>
  );
};

export default FriendsItem;
