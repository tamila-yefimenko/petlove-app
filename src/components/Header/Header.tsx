import { useState } from "react";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Nav from "../Nav/Nav";
import AuthNav from "../AuthNav/AuthNav";
import UserNav from "../UserNav/UserNav";
import Menu from "../Menu/Menu";
import Logo from "../Logo/Logo";
import { useAppSelector, useWindowWidth } from "../../redux/hooks";
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

  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const width = useWindowWidth();

  const isMobile = width < 768;
  const isTablet = width < 1280 && width >= 768;
  const isDesktop = width >= 1280;

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
