import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import catIcon from "../../assets/images/cat-icon.png";
import s from "./RegistrationPage.module.css";
import { useAppSelector } from "../../redux/hooks";
import { selectIsLoading } from "../../redux/global/selectors";
import { selectIsError } from "../../redux/auth/selectors";
import Loader from "../../components/Loader/Loader";
import { Container } from "../../components/Container/Container";

const RegistrationPage: React.FC = () => {
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectIsError);

  return (
    <Container className={s.registerContainer}>
      <div className={s.registerPage}>
        <div className={s.wrapper}>
          <div className={s.textWrapper}>
            <div className={s.imgWrapper}>
              <img src={catIcon} alt="dog icon" width="32" height="32" />
            </div>
            <div className={s.info}>
              <div className={s.nameWrapper}>
                <h4 className={s.catName}>Jack</h4>
                <p className={s.birthday}>
                  Birthday: <span>18.10.2021</span>
                </p>
              </div>
              <p className={s.catText}>
                Jack is a gray Persian cat with green eyes. He loves to be
                pampered and groomed, and enjoys playing with toys.
              </p>
            </div>
          </div>
        </div>
        <RegistrationForm />
        {isLoading && <Loader />}
        {error && <p>error</p>}
      </div>
    </Container>
  );
};

export default RegistrationPage;
