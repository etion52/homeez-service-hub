
import NavBar from "@/components/NavBar";

type NavBarWrapperProps = {
  isLoggedIn?: boolean; // This is now an optional prop that won't be passed to NavBar
};

const NavBarWrapper = ({ isLoggedIn }: NavBarWrapperProps) => {
  // This component simply renders NavBar without passing the isLoggedIn prop
  return <NavBar />;
};

export default NavBarWrapper;
