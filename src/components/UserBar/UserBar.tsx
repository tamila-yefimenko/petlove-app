import { NavLink } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { useAppSelector } from "../../redux/hooks";

const UserBar: React.FC = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return <nav>{isLoggedIn && <NavLink to="/profile"></NavLink>}</nav>;
};

export default UserBar;
