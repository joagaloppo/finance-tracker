import { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { type NextPage } from "next";
import { type Session } from "next-auth";
import Spinner from "./ui/spinner";

const Nav: NextPage = () => {
  const { data: sessionData } = useSession();
  return (
    <nav className="w-full border-b">
      <div className="mx-auto flex min-h-[60px] max-w-screen-md items-center justify-between px-4">
        <Logo />
        {sessionData === undefined ? <Spinner theme="dark" /> : <Auth sessionData={sessionData} />}
      </div>
    </nav>
  );
};

const Logo: React.FC = () => {
  return (
    <div className="group flex cursor-pointer items-center gap-1.5">
      <div className="h-6 w-6 rounded-full bg-gray-800 shadow-sm group-hover:bg-gray-600" />
      <h1 className="text-lg font-bold tracking-tighter text-gray-800 group-hover:text-gray-600">financy</h1>
    </div>
  );
};

const Auth: React.FC<{ sessionData: Session | null }> = ({ sessionData }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      {sessionData !== null &&
        (sessionData?.user?.image ? (
          <img src={sessionData?.user?.image} className="h-8 w-8 rounded-lg" alt="Profile" />
        ) : (
          <div className="h-8 w-8 rounded-lg bg-gray-200" />
        ))}

      <Button variant="outline" size="sm" onClick={sessionData ? () => void signOut() : () => void signIn()}>
        {sessionData ? "Sign out" : "Sign in"}
      </Button>
    </div>
  );
};

export default Nav;
