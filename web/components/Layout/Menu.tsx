import Link from "next/link";
import Logo from "../Logo";
import MenuDropdown from "../Menu/MenuDropdown";

const Menu: React.FC<{}> = ({}) => {
  return (
    <div className="flex justify-center min-w-screen mt-8 z-20 px-8">
      <div className="flex w-full items-center justify-between max-w-7xl">
        <Link href="/dashboard" passHref>
          <a>
            <Logo fontSize="text-2xl" light />
          </a>
        </Link>
        <div>
          <MenuDropdown />
        </div>
      </div>
    </div>
  );
};

export default Menu;
