import { Container } from "../../components/Container/Container";
import Header from "../../components/Header/Header";
import s from "./HomePage.module.css";

const HomePage: React.FC = () => {
  return (
    <div className={s.home}>
      <Container className={s.container}>
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
      </Container>
    </div>
  );
};

export default HomePage;
