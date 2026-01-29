import { useEffect } from "react";
import { Container } from "../../components/Container/Container";
import MyNotices from "../../components/MyNotices/MyNotices";
import UserCard from "../../components/UserCard/UserCard";
import s from "./ProfilePage.module.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectIsLoading } from "../../redux/global/selectors";
import {
  selectError,
  selectNoticesFavourite,
  selectNoticesViewed,
} from "../../redux/user/selectors";
import { fetchUser } from "../../redux/user/operations";
import Loader from "../../components/Loader/Loader";

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <>
      <Container className={s.profileContainer}>
        <UserCard />
        <MyNotices />
        {isLoading && <Loader />}
        {error && <p>error</p>}
      </Container>
    </>
  );
};

export default ProfilePage;
