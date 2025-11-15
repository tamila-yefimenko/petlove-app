// import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Loader from "../Loader/Loader";
import { Container } from "../Container/Container";
import s from "./Layout.module.css";

const Layout: React.FC = () => {
  // const isLoading = useSelector(isLoading);
  return (
    <>
      <Header />
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
