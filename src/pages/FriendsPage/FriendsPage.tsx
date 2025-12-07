import { useEffect } from "react";
import FriendsList from "../../components/FriendsList/FriendsList";
import { selectError, selectItems } from "../../redux/friends/selectors";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchFriends } from "../../redux/friends/operations";
import { selectIsLoading } from "../../redux/global/selectors";
import { Container } from "../../components/Container/Container";
import s from "./FriendsPage.module.css";
import Title from "../../components/Title/Title";

const FriendsPage: React.FC = () => {
  const friends = useAppSelector(selectItems);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFriends());
  }, [dispatch]);

  const hasFriends = friends.length > 0;

  return (
    <div className={s.friendPage}>
      <Container className={s.friendsContainer}>
        {!isLoading && <Title className={s.friendsTitle}>Our friends</Title>}
        {hasFriends && <FriendsList friends={friends} />}
        {error && <p>error</p>}
      </Container>
    </div>
  );
};

export default FriendsPage;
