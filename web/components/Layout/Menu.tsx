import Link from "next/link";
import {IUser} from "../../types/IUser";
import Logo from "../Logo";
import MenuDropdown from "../Menu/MenuDropdown";

const Menu: React.FC<{width?: string; user: IUser}> = ({
  width = "max-w-7xl",
  user,
}) => {
  return (
    <div className="flex justify-center min-w-screen mt-8 z-20 px-8">
      <div className={`flex w-full items-center justify-between ${width}`}>
        <Link href="/dashboard" passHref>
          <a>
            <Logo />
          </a>
        </Link>
        <MenuDropdown user={user} />
      </div>
    </div>
  );
};

export default Menu;
