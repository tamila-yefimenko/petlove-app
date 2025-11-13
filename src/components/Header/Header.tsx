import { useEffect, useState } from "react";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Nav from "../Nav/Nav";
import AuthNav from "../AuthNav/AuthNav";
import UserNav from "../UserNav/UserNav";
import Menu from "../Menu/Menu";
import Logo from "../Logo/Logo";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth < 1280 && windowWidth >= 768;
  const isDesktop = windowWidth >= 1280;

  return (
    <header>
      <Logo />
      {isMobile && (
        <>
          <BurgerMenu onClick={() => setIsMenuOpen(true)} />
          <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
      )}

      {isTablet && (
        <>
          <Nav />
          <BurgerMenu onClick={() => setIsMenuOpen(true)} />
          <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
      )}

      {isDesktop && (
        <>
          <Nav />
          <AuthNav />
          <UserNav />
        </>
      )}
    </header>
  );
};

export default Header;
