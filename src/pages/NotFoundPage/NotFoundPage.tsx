import s from "./NotFoundPage.module.css";
import mob1x from "../../assets/images/not-found-img-mob.webp";
import mob2x from "../../assets/images/not-found-img-mob-2x.webp";
import tab1x from "../../assets/images/not-found-img-tab.webp";
import tab2x from "../../assets/images/not-found-img-tab-2x.webp";
import { Container } from "../../components/Container/Container";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <Container className={s.notFoundContainer}>
      <div className={s.notFoundPage}>
        <h2 className={s.pageTitle}>
          4
          <picture className={s.img}>
            <source
              className={s.set}
              srcSet={`${mob1x} 1x, ${mob2x} 2x`}
              media="(min-width: 320px)"
            />
            <source
              srcSet={`${tab1x} 1x, ${tab2x} 2x`}
              media="(min-width: 768px)"
            />
            <img
              src="../../assets/images/not-found-img-mob.webp"
              alt="cat"
              className={s.innerImg}
            />
          </picture>
          4
        </h2>
        <p className={s.text}> Ooops! This page not found :(</p>
        <Link className={s.link} to={"/"}>
          To home page
        </Link>
      </div>
    </Container>
  );
};

export default NotFoundPage;
