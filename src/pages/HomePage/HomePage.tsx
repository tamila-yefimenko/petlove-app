import { useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import s from "./HomePage.module.css";

// const { pathname } = useLocation();
// const isHome = pathname === "/";

const HomePage: React.FC = () => {
  return (
    <div className={s.home}>
      <div className={s.wrapper}>
        <Header className={s.homeHeader} />
        <div className={s.content}>
          <h1 className={s.title}>
            Take good <span className={s.span}>care</span> of your small pets
          </h1>
          <p className={s.text}>
            Choosing a pet for your home is a choice that is meant to enrich
            your life with immeasurable joy and tenderness.
          </p>
        </div>
      </div>
      <div className={s.imageWrapper}></div>
    </div>
  );
};

export default HomePage;
