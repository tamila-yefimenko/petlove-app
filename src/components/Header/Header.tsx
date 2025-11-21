import { useEffect, useState } from "react";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Nav from "../Nav/Nav";
import AuthNav from "../AuthNav/AuthNav";
import UserNav from "../UserNav/UserNav";
import Menu from "../Menu/Menu";
import Logo from "../Logo/Logo";
import { useAppSelector } from "../../redux/hooks";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import s from "./Header.module.css";
import { Container } from "../Container/Container";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

interface HeaderProps {
  className: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth < 1280 && windowWidth >= 768;
  const isDesktop = windowWidth >= 1280;
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return (
    <header className={clsx(s.header, isHome && s.whiteHeader, className)}>
      <Container className={s.headerContainer}>
        <Link to={"/"}>
          <Logo isHome={isHome} />
        </Link>
        {isMobile && (
          <>
            <div className={s.menuWrapper}>
              {<UserNav isMobile isHome={isHome} />}
              <BurgerMenu isHome={isHome} onClick={() => setIsMenuOpen(true)} />
              <Menu
                isOpen={isMenuOpen}
                isMobile
                onClose={() => setIsMenuOpen(false)}
              />
            </div>
          </>
        )}

        {isTablet && (
          <>
            <div className={s.menuWrapper}>
              {isLoggedIn ? <UserNav isHome={isHome} /> : <AuthNav />}
              <BurgerMenu isHome={isHome} onClick={() => setIsMenuOpen(true)} />
              <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
            </div>
          </>
        )}

        {isDesktop && (
          <>
            <Nav />
            <div className={s.menuWrapper}>
              {isLoggedIn ? <UserNav isHome={isHome} /> : <AuthNav />}
            </div>
          </>
        )}
      </Container>
    </header>
  );
};

export default Header;
