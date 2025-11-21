// import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Loader from "../Loader/Loader";
import { Container } from "../Container/Container";
import s from "./Layout.module.css";

const Layout: React.FC = () => {
  // const isLoading = useSelector(isLoading);
  const { pathname } = useLocation();

  const isHome = pathname === "/";

  return (
    <>
      {!isHome && <Header className={s.header} />}
      <main>
        <Container className={s.container}>
          {/* {isLoading && <Loader />} */}
          <Outlet />
        </Container>
      </main>
    </>
  );
};

export default Layout;
