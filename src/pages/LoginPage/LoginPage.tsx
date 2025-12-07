import LoginForm from "../../components/LoginForm/LoginForm";
import dogIcon from "../../assets/images/dog-icon.webp";
import s from "./LoginPage.module.css";
import { useAppSelector } from "../../redux/hooks";
import { selectIsError } from "../../redux/auth/selectors";
import { Container } from "../../components/Container/Container";

const LoginPage: React.FC = () => {
  const error = useAppSelector(selectIsError);

  return (
    <Container className={s.loginContainer}>
      <div className={s.loginPage}>
        <div className={s.wrapper}>
          <div className={s.textWrapper}>
            <div className={s.imgWrapper}>
              <img src={dogIcon} alt="dog icon" width="32" height="32" />
            </div>
            <div className={s.info}>
              <div className={s.nameWrapper}>
                <h4 className={s.dogName}>Rich</h4>
                <p className={s.birthday}>
                  Birthday: <span>21.09.2020</span>
                </p>
              </div>
              <p className={s.dogText}>
                Rich would be the perfect addition to an active family that
                loves to play and go on walks. I bet he would love having a
                doggy playmate too!
              </p>
            </div>
          </div>
        </div>
        <LoginForm />
        {error && <p>error</p>}
      </div>
    </Container>
  );
};

export default LoginPage;
