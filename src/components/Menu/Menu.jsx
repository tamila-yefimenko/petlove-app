import AuthNav from "../AuthNav/AuthNav";
import Nav from "../Nav/Nav";
import UserNav from "../UserNav/UserNav";

const Menu = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <>
          <button type="button" onClick={onClose}>
            Close
          </button>
          <Nav />
          <AuthNav />
          <UserNav />
        </>
      )}
    </>
  );
};

export default Menu;
