import { useSelector } from "react-redux";
import AuthNav from "../AuthNav/AuthNav";
import Nav from "../Nav/Nav";
import UserNav from "../UserNav/UserNav";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

const Menu = ({ isOpen, onClose }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <>
      {isOpen && (
        <>
          <button type="button" onClick={onClose}>
            Close
          </button>
          <Nav />
          {!isLoggedIn && <AuthNav />}
        </>
      )}
    </>
  );
};

export default Menu;
