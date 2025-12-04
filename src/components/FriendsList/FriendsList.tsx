import { Friend } from "../../utils/types";
import FriendsItem from "../FriendsItem/FriendsItem";
import s from "./FriendsList.module.css";

interface FriendsListProps {
  friends: Friend[];
}

const FriendsList: React.FC<FriendsListProps> = ({ friends }) => {
  return (
    <ul className={s.list}>
      {friends.map((friend) => (
        <li className={s.item} key={friend._id}>
          <FriendsItem friend={friend} />
        </li>
      ))}
    </ul>
  );
};

export default FriendsList;
