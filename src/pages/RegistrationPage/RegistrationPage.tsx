import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import catIcon from "../../assets/images/cat-icon.png";
import s from "./RegistrationPage.module.css";

const RegistrationPage: React.FC = () => {
  return (
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
    </div>
  );
};

export default RegistrationPage;
