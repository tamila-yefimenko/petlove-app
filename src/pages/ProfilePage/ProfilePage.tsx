import { useEffect } from "react";
import { Container } from "../../components/Container/Container";
import MyNotices from "../../components/MyNotices/MyNotices";
import UserCard from "../../components/UserCard/UserCard";
import s from "./ProfilePage.module.css";
import { useAppSelector } from "../../redux/hooks";
import { selectError } from "../../redux/user/selectors";
import { toast } from "react-toastify";
import { selectIsRefreshing } from "../../redux/auth/selectors";

const ProfilePage: React.FC = () => {
  const error = useAppSelector(selectError);
  const isRefreshing = useAppSelector(selectIsRefreshing);

  if (isRefreshing) return null;

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <>
      <Container className={s.profileContainer}>
        <div className={s.wrapper}>
          <UserCard />
          <MyNotices />
        </div>
      </Container>
    </>
  );
};

export default ProfilePage;
