
import NavBar from "@/components/NavBar";

// Create interface for component props
interface NavBarWrapperProps {
  // Define any props that might be passed
  [key: string]: any;
}

const NavBarWrapper = (props: NavBarWrapperProps) => {
  // This component renders NavBar and passes along any props it receives
  return <NavBar {...props} />;
};

export default NavBarWrapper;
