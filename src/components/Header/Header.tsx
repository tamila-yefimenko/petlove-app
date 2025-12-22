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
  onLogoutClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ className, onLogoutClick }) => {
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
      <Container className={clsx(s.headerContainer, isHome && s.homeContainer)}>
        <Link to={"/"}>
          <Logo isHome={isHome} />
        </Link>
        {isMobile && (
          <>
            <div className={s.menuWrapper}>
              {
                <UserNav
                  isMobile
                  isHome={isHome}
                  onLogoutClick={() => {
                    setIsMenuOpen(false);
                    onLogoutClick?.();
                  }}
                />
              }
              <BurgerMenu isHome={isHome} onClick={() => setIsMenuOpen(true)} />
              <Menu
                isOpen={isMenuOpen}
                isMobile
                onClose={() => setIsMenuOpen(false)}
                onLogoutClick={() => {
                  setIsMenuOpen(false);
                  onLogoutClick?.();
                }}
              />
            </div>
          </>
        )}

        {isTablet && (
          <>
            <div className={s.menuWrapper}>
              {isLoggedIn ? (
                <UserNav
                  isHome={isHome}
                  onLogoutClick={() => {
                    setIsMenuOpen(false);
                    onLogoutClick?.();
                  }}
                />
              ) : (
                <AuthNav />
              )}
              <BurgerMenu isHome={isHome} onClick={() => setIsMenuOpen(true)} />
              <Menu
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                onLogoutClick={() => {
                  setIsMenuOpen(false);
                  onLogoutClick?.();
                }}
              />
            </div>
          </>
        )}

        {isDesktop && (
          <>
            <Nav />
            <div className={s.menuWrapper}>
              {isLoggedIn ? (
                <UserNav
                  isHome={isHome}
                  onLogoutClick={() => {
                    setIsMenuOpen(false);
                    onLogoutClick?.();
                  }}
                />
              ) : (
                <AuthNav />
              )}
            </div>
          </>
        )}
      </Container>
    </header>
  );
};

export default Header;
