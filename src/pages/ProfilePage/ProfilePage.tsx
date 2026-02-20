import { useEffect } from "react";
import { Container } from "../../components/Container/Container";
import MyNotices from "../../components/MyNotices/MyNotices";
import UserCard from "../../components/UserCard/UserCard";
import s from "./ProfilePage.module.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectIsLoading } from "../../redux/global/selectors";
import { selectError } from "../../redux/user/selectors";
import { fetchUser } from "../../redux/user/operations";
import Loader from "../../components/Loader/Loader";
import { toast } from "react-toastify";

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
        <div className={s.wrapper}>
          <UserCard />
          <MyNotices />
        </div>
        {isLoading && <Loader />}
        {error && toast.error(error)}
      </Container>
    </>
  );
};

export default ProfilePage;
