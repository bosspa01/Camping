import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TextAlignStart } from "lucide-react";
import UserIcon from "./Usericon";
import { Button } from "@/components/ui/button";
import { publicLinks, privateLinks } from "@/utils/links";
import { Link } from "react-router";
import SignOutLink from "./SignOutLink";

import {
  Show,
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
} from "@clerk/react";

const DropdownListMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <TextAlignStart />
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-foreground text-md font-bold">My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {publicLinks.map((item, index) => {
            //   console.log(item.href);
            return (
              <DropdownMenuItem key={index}>
                <Link to={item.href}>{item.label}</Link>
              </DropdownMenuItem>
            );
          })}

          <DropdownMenuSeparator />

          {/* ยังไม่ได้ล็อคอิน */}
          <Show when="signed-out">
            <DropdownMenuItem>
              <SignInButton mode="modal">
                <button>Login</button>
              </SignInButton>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <SignUpButton mode="modal">
                <button>Register</button>
              </SignUpButton>
            </DropdownMenuItem>
          </Show>

          {/* ล็อคอินแล้ว */}
          <Show when="signed-in">
            {/* Links oter */}
            {privateLinks.map((item, index) => {
              //   console.log(item.href);
              return (
                <DropdownMenuItem key={index}>
                  <Link to={item.href}>{item.label}</Link>
                </DropdownMenuItem>
              );
            })}
            <DropdownMenuSeparator />
            <DropdownMenuItem>
            {/* <UserButton /> */}
            {/* <SignOutButton /> */}
              <SignOutLink />
            </DropdownMenuItem>
          </Show>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default DropdownListMenu;
